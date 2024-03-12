//Backend/server/lib/userDataSet.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';
import { AiChef, Dale } from './chef-ai';
import { userInformation } from '../server';
import axios from 'axios';
import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';
import path from 'path';
import fs from 'fs';


const router: Router = express.Router();

const extractSection = (text: any, startMarker: any, endMarker: any) => {
    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);
    return text.substring(startIndex, endIndex).trim();
  };

  function removeQuantities(ingredients: string[]) {
    console.log(ingredients)
    const quantityRegex =
      /\b\d+\s*\/\s*\d+\s*(g|kg|tbsp|tsp|cup|cups|handful|ml|l)?\b|\b\d+(\.\d+)?\s*(g|kg|tbsp|tsp|cup|cups|handful|ml|l)?\b/gi;
    const parenthesesRegex = /\s*\([^)]*\)/g;
    const hyphenRegex = /-\s*$/g;
    const leadingDashRegex = /^-\s*/;
  
    return ingredients.map(ingredient =>
      ingredient
        .replace(quantityRegex, "")
        .replace(parenthesesRegex, "")
        .replace(hyphenRegex, "")
        .replace(leadingDashRegex, "")
        .trim()
    );
}

let recipeNameUsed : [] | null;

export default function userDataSet(sanity: SanityClient): Router {

  router.post('/userPrefInfo', async (req: Request, res: Response) => {
      const userId = userInformation._id;
      try {
          const userRecipeData = {
              Allergies: req.body.AllergiesData,
              CuisineType: req.body.CuisineTypeData,
              Regime: req.body.RegimeData,
              Ingredients: req.body.IngredientsData,
              Tools: req.body.ToolsData,
              Time: req.body.TimeData,
              Level: req.body.LevelData,
              NumberOfPlates: req.body.NumberOfPlatesData,
              MealType: req.body.MealTypeData,
              recipeNameUsed,
          };

          console.log(userRecipeData);

          const recipe = await AiChef(userRecipeData);

          const recipeName = extractSection(recipe, "**Recipe Name**:", "**Ingredients**:");
          const ingredients = extractSection(recipe, "**Ingredients**:", "**Instructions**:").split("\n").map((ingredient:any) => ingredient.trim());
          const instructions = extractSection(recipe, "**Instructions**:", "**Total Calories**:").split("\n").map((instructions:any) => instructions.trim());
          const totalCalories = extractSection(recipe, "**Total Calories**:", "**End Recipe**").split("\n").map((totalCalories:any) => totalCalories.trim());
          const imageGen = await Dale(recipeName);
        //   const imageGen = "https://cdn.sanity.io/images/y3enpfvz/production/043090c865c1ad53bf05ab5e99b1740a17f81da4-1024x1024.png"
          
          res.status(200).json({ message: 'Recipe Generated Successfully', recipeName, ingredients, instructions, totalCalories, image: imageGen.imageUrl });
          if (imageGen.imageUrl) {
              const imageUrl = imageGen.imageUrl;
              const response = await axios({
                  url: imageUrl,
                  method: 'GET',
                  responseType: 'stream',
              });

              const tempPath = path.join(__dirname, 'tempImage.jpg');
              const writer = createWriteStream(tempPath);
              response.data.pipe(writer);

              await new Promise((resolve, reject) => {
                  writer.on('finish', resolve);
                  writer.on('error', reject);
              });

              const imageAsset = await sanity.assets.upload('image', createReadStream(tempPath), {
                  filename: path.basename(tempPath),
              });

              await fs.promises.unlink(tempPath);

              const userAiInfoDoc = await sanity.create({
                  _type: "userAiInfo",
                  allergies: userRecipeData.Allergies,
                  cuisineType: userRecipeData.CuisineType,
                  ingredients: userRecipeData.Ingredients,
                  tools: userRecipeData.Tools,
                  level: userRecipeData.Level,
                  mealType: userRecipeData.MealType,
                  userData: { _ref: userId, _type: 'reference' },
                  time: userRecipeData.Time,
                  persons: userRecipeData.NumberOfPlates
              });

              await sanity.create({
                  _type: "cookbook",
                  recipeName,
                  ingredients,
                  instructions,
                  stars: 0,
                  macros: totalCalories,
                  userAiInfo: { _ref: userAiInfoDoc._id, _type: 'reference' },
                  recipeImage: {
                      _type: 'image',
                      asset: {
                          _type: "reference",
                          _ref: imageAsset._id,
                      },
                  },
              });

          } else {
              console.error('Image generation failed:', imageGen.error || 'No error info');
          }
      } catch (error) {
          console.error('Error in userPrefInfo route:', error);
          res.status(500).send({ error: 'An error occurred processing your request.' });
      }
  });

  router.get('/getHistory', async (req: Request, res: Response) => {
      const userId = userInformation._id;      
  
      const query = `
          *[_type == "userAiInfo" && userData._ref == $userId]{
              ...,
              "cookbooks": *[_type == "cookbook" && references(^._id)]{
                  recipeName,
                  ingredients,
                  instructions,
                  stars,
                  macros,
                  "imageUrl": recipeImage.asset->url
              }
          }
        `;
  
      const response = await sanity.fetch(query, { userId });
  
      const result = response.map((item: any) => ({
        promptData: {
              allergies: item.allergies,
              cuisineType: item.cuisineType,
              ingredients: item.ingredients,
              tools: item.tools,
              level: item.level,
              mealType: item.mealType,
              time: item.time,
              persons: item.persons
          },
          AiAnswers: item.cookbooks.map((cookbook: any) => ({
              recipeName: cookbook.recipeName,
              ingredients: cookbook.ingredients,
              instructions: cookbook.instructions,
              stars: cookbook.stars,
              macros: cookbook.macros,
              imageUrl: cookbook.imageUrl 
          }))
      }));
      recipeNameUsed = result.flatMap((item: any) => item.AiAnswers.map((cookbook: any) => cookbook.recipeName));
  
      return res.status(200).json({ message: 'Data fetched successfully', result });
  });

  router.post('/createOrAppendShoppingList', async (req: Request, res: Response) => {
    const userId: string|null = userInformation._id;
    const p = req.body
    const itemsToAdd = removeQuantities(p);

    const existingLists = await sanity.fetch(
        `*[_type == "shoppingList" && userData._ref == $userId]{_id, items}`,
        { userId }
    );

    let response: any;

    if (existingLists.length > 0) {
        const shoppingListId = existingLists[0]._id;
        const updatedItems = [...existingLists[0].items, ...itemsToAdd];

        response = await sanity.patch(shoppingListId)
            .set({ items: updatedItems })
            .commit();
    } else {
        response = await sanity.create({
            _type: 'shoppingList',
            userData: {
                _type: 'reference',
                _ref: userId,
            },
            items: itemsToAdd,
            status: 'pending',
        });
    }

    return res.status(200).json(response);
  });

  router.post('/updateShoppingList', async (req: Request, res: Response) => {
      const userId = userInformation._id;
      const newItems = req.body;

      const existingLists = await sanity.fetch(
          `*[_type == "shoppingList" && userData._ref == $userId]{_id}`,
          { userId }
      );

      let response: any;

      if (existingLists.length > 0) {
          const shoppingListId = existingLists[0]._id;

          response = await sanity.patch(shoppingListId)
              .set({ items: newItems })
              .commit();
      } else {
          console.error('No existing shopping list to update.');
          return res.status(404).json({ error: 'No existing shopping list to update.' });
      }

      return res.status(200).json(response);
  });

    

  router.get('/fetchShoppingList', async (req: Request, res: Response) => {
      const userId = userInformation._id;
      const response = await sanity.fetch(
        `*[_type == "shoppingList" && userData._ref == $userId]`,
        { userId }
      );
      const result = response.map((shoppingListItem: any) => shoppingListItem.items);
      return res.status(200).json({result})
  })
    

  return (router) ;
}


