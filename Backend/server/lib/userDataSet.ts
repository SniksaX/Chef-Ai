//Backend/server/lib/userDataSet.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';
import { AiChef } from './chef-ai';
import { userInformation } from '../server';
import cookbook from '../../schemas/cookbook';

const router: Router = express.Router();


let userRecipeData = {
    Allergies: null,
    CuisineType: null, 
    Regime: null,
    Ingredients: null,
    Tools:null,
    Time: null,
    Level: null,
    NumberOfPlates: null,
    MealType: null,
    // Energy: EnergyType | null,
};


const extractSection = (text: any, startMarker: any, endMarker: any) => {
    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);
    return text.substring(startIndex, endIndex).trim();
  };

export default function userDataSet(sanity: SanityClient): Router {

    router.post('/userPrefInfo', async (req: Request, res: Response) => {
        try{
            userRecipeData = {
                Allergies: req.body.AllergiesData,
                CuisineType: req.body.CuisineTypeData,
                Regime: req.body.RegimeData,
                Ingredients: req.body.IngredientsData,
                Tools: req.body.ToolsData,
                Time: req.body.TimeData,
                Level: req.body.LevelData,
                NumberOfPlates: req.body.NumberOfPlatesData,
                MealType: req.body.MealTypeData,
            }

            const recipe = await AiChef(userRecipeData)

            const recipeName = extractSection(
                recipe,
                "**Recipe Name**:",
                "**Ingredients**:"
              );
            const ingredients = extractSection(
                recipe,
                "**Ingredients**:",
                "**Instructions**:"
              ).split("\n");
            const instructions = extractSection(
                recipe,
                "**Instructions**:",
                "**Total Calories**:"
              ).split("\n");
            const totalCalories = extractSection(
                recipe,
                "**Total Calories**:",
                "**End Recipe**"
              ).split("\n");

            res.status(200).json({message: 'recipe Generated successfuly', totalCalories, instructions, recipeName, ingredients})

              const userRecipeDataSanity = {
                _type: "userAiInfo",
                allergies: userRecipeData.Allergies,
                cuisineType: userRecipeData.CuisineType,
                ingredients: userRecipeData.Ingredients,
                tools: userRecipeData.Tools,
                level: userRecipeData.Level,
                mealType: userRecipeData.MealType,
                userData: { _ref: userInformation._id , _type: 'reference' },
            }

            sanity.create(userRecipeDataSanity).then(createdUserRecipeDataSanity => {
                const history = {
                    _type: "cookbook",
                    recipeName,
                    ingredients,
                    instructions,
                    macros: totalCalories,
                    userData: { _ref: userInformation._id , _type: 'reference' },
                }
                sanity.create(history)
            });

            // const recipe = "test"
            // setTimeout(() => res.status(200).json({message: 'recipe Generated successfuly', recipe}), 4000)

        }catch(err){
            console.error(err);
        }
    });

    router.get('/getHistory', async (req: Request, res: Response) => {
        const userId = userInformation._id;

        let response = await sanity.fetch('*[_type == "cookbook" && userData._ref == $userId]', { userId });
        const CookBook = response.map((trim : any) => {
          return {
            instructions: trim.instructions,
            ingredients: trim.ingredients,
            macros: trim.macros,
            recipeName: trim.recipeName,
            createdAt: trim._createdAt
          }
        })
        return res.status(200).json({message: 'test Passed', AllHistory: CookBook})
    })

    router.post('/pushShoppingList', async (req: Request, res: Response) => {
      const userId = userInformation._id;
      const shoppingList = req.body;

      const existingLists = await sanity.fetch(
        `*[_type == "shoppingList" && userData._ref == $userId]{_id}`,
        { userId }
      );

      let response: any;

      if (existingLists.length === 0){
        console.log(existingLists)
        response = await sanity.create({
          _type: 'shoppingList',
          userData: {
            _type: 'reference',
            _ref: userId,
          },
          items: shoppingList.items,
          status: 'pending',
        });
      } else {
        console.log(existingLists)
        const shoppingListId = existingLists[0]._id;
        response = await sanity.patch(shoppingListId)
        .set({
          items: shoppingList.items,
          status: shoppingList.status,
        })
        .commit();
    }
      return res.status(200).json({response})
    })

    router.get('/fetchShoppingList', async (req: Request, res: Response) => {
      const userId = userInformation._id;
      const response = await sanity.fetch(
        `*[_type == "shoppingList" && userData._ref == $userId]`,
        { userId }
      );
      return res.status(200).json({response})
    })
    

    return (router) ;
}