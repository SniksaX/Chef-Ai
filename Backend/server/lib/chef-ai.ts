//backend/server/lib/chef-ai.ts

import express, { Router, Request, Response } from 'express';
import OpenAi from 'openai';
import dotenv from 'dotenv';
import { userData } from './userDataSet';
import { FileName } from './getImage';

dotenv.config();

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || '';

const openai = new OpenAi({apiKey: OPENAI_API_KEY});
const router: Router = express.Router();

function extractIngredients(output: any) {
    const ingredientsMatch = output.match(/Ingredients:\n([\s\S]*?)\n\n/);
    if (!ingredientsMatch) return [];

    const ingredientsLines = ingredientsMatch[1].split('\n');
    const ingredients = ingredientsLines.map((line: string) => {
        const [quantity, name] = line.split(' ', 2);
        return { name, quantity };
    });

    return ingredients;
}

function extractInstructions(output: any) {
    const instructionsMatch = output.match(/Instructions:\n([\s\S]*?)\n\n/);
    if (!instructionsMatch) return [];

    const instructions = instructionsMatch[1].split('\n');
    return instructions;
}

function extractNutrition(output: any) {
    const nutritionMatch = output.match(/Total Calories: (\S+)\nCarbs: (\S+) g\nProteins: (\S+) g\nFats: (\S+) g/);
    if (!nutritionMatch) return {};

    const nutrition = {
        totalCalories: nutritionMatch[1],
        carbs: nutritionMatch[2],
        proteins: nutritionMatch[3],
        fats: nutritionMatch[4]
    };

    return nutrition;
}

export default function AiStuff(): Router {

    router.post('/photoGerenration', async (req: Request, res: Response)  => {
        console.log(FileName)
        return res.status(200).json({message: FileName});
    })

    router.post('/photoDetection', async (req: Request, res: Response) => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [
                  {
                    role: "user",
                    content: [
                      { type: "text", text: "What cooking ingredients are in the image?" },
                      {
                        type: "image_url",
                        image_url: {
                          "url": `../../uploads/${FileName}`,
                        },
                      },
                    ],
                  },
                ],
              });
              console.log(response);
        } catch (error) {
            console.error(error);
        }
    })

    router.post('/chefApi', async (req: Request, res: Response) => {

        try {
            const prompt = `The user provides the following information:
            - Kitchen tools: ${userData?.Tools}
            - Available ingredients: ${userData?.Ingredients}
            - Time available for cooking: ${userData?.Time} minutes
            
            Additional user details: 
            - Allergies: ${userData?.Allergies} (if empty, ignore)
            - Preferred cuisine type: ${userData?.CuisineType} (if empty, ignore)
            - Dietary regime: ${userData?.Regime} (if empty, ignore)
            - Cooking skill level: ${userData?.Level}
            - Number of servings needed: ${userData?.NumberOfPlates}
            
            Based on this information, suggest a suitable recipe. Your response should include:
            
            - **Ingredients**: List the ingredients and their quantities in the following format:

                Ingredients:
                1/2 tsp Ingredient1
                100g Ingredient2
                1/2 tsp Ingredient3
                4 Ingredient4
                ...

            - **Instructions**: Provide step-by-step cooking instructions in the following format:

                Instructions:
                1. Preheat the oven to 375°F.
                2. Sprinkle baking soda and baking powder over the cod and let it sit for 1 minute.
                3. In a bowl, mix almond flour and allspice, then coat the cod with the mixture.
                ...

            - **Total Calories**: The estimated total caloric content of the recipe, along with the breakdown of macronutrients. It should look like this:

                Total Calories: 670kcal
                Carbs: X g
                Proteins: Y g
                Fats: Z g
            `

            const chatCompletion = await openai.chat.completions.create({
                messages: [
                {role: "system", content: prompt},
            ],
                model: 'gpt-4-0125-preview',
            });

            const output = chatCompletion.choices[0].message.content;

            console.log(output)

            const ingredients = extractIngredients(output);
            const instructions = extractInstructions(output);
            const nutrition = extractNutrition(output);

            const response = {
                ingredients: ingredients,
                instructions: instructions,
                nutrition: nutrition
            };


            return res.status(200).json({message: 'dataRecieved'})

        } catch (err) {
            console.error(err);
        }

    })

    return router;
}








// try{
//     const chatCompletion = await openai.chat.completions.create({
//         messages: [{role: "system", content: 
//         `You are an expert chef, and the user has provided you with images containing ingredients at their disposal. Your task is to guide the user through the cooking process based on the ingredients available and their preferences.
//         First, identify the ingredients visible in the images and ask the user to confirm them. For example, "I see tomatoes, onions, and garlic in the images. Can you confirm if these are the ingredients you have?"
//         Next, inquire about any allergies the user may have to ensure the safety of the dish. Ask questions such as, "Do you have any allergies or dietary restrictions I should be aware of?"
//         Then, ask the user about the type of cuisine they would like to prepare, such as Chinese, Mexican, French, etc. This helps tailor the dish recommendations to their preferences.
//         Based on the identified ingredients and the user's preferred cuisine, suggest suitable dishes they can prepare. For example, "With the ingredients available, we can make a delicious pasta primavera or a hearty vegetable stir-fry. Which option would you prefer?"
//         Finally, inquire about the user's dietary regime, such as gluten-free, low-sodium, vegan, etc. This ensures that the dish aligns with their dietary preferences and restrictions.
//         Once you have gathered all the necessary information, proceed to generate step-by-step cooking procedures for the chosen dish, considering the user's preferences and any dietary restrictions they may have.`},
//         {role: "user", content: message},],
//         model: 'gpt-3.5-turbo',
//     });
//     return res.status(200).json(chatCompletion)

// } catch (err) {
//     console.error(err);
// }



// Generate a prompt for an assistant ai 
// in it you explain the following steps :
// the assistant is an expert chef, images are provided to him, in them ingredients at the user disposal.
// The assistant first mention ingredients that he can identify and asks the user to confirm what he sees.
// Second the assistant asks the user the following questions :
// -if he has any allergies.
// -What kind of food he wants to eat (for example Chinese, Mexican, French...etc)
// -propose some dishes based on what the user has.
// -what regime does the user has (for ex: wi thout gluten, without salt, vegan ...etc)

// then the assistant proceeds to generate the procedures to cook that dish based on all the other questions. 