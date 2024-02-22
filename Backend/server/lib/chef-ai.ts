//backend/server/lib/chef-ai.ts

import express, { Router, Request, Response } from 'express';
import OpenAi from 'openai';
import dotenv from 'dotenv';
import { userData } from './userDataSet';


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


            // Get Reciepe Name
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

export const detectPhotoIngredients = async (fileName: any) => {
    try {

        // const imagePath = path.join(__dirname, `../../uploads/${fileName}`);

        // const imageBuffer = fs.readFileSync(imagePath);
        // const base64Image = imageBuffer.toString('base64');

        // const response = await openai.chat.completions.create({
        //     model: "gpt-4-vision-preview",
        //     messages: [
        //         {
        //             role: "system",
        //             content: `
        //             You are an expert at analyzing images with computer vision. In case of error, make a full report of the cause of: any issues in receiving or understanding images.
        //             Please provide list of all the food ingredients you see in this picture. List the items in the following format:

        //             1. Ingredient1
        //             2. Ingredient2
        //             3. Ingredient3
        //             4. Ingredient4
        //             ...

        //             Just list the items without any additional context or description.
        //             Ignore Brand Names.
        //             `,
        //         },
        //         {
        //             role: "user",
        //             content: [
        //                 {
        //                     type: "image_url",
        //                     image_url: {
        //                         "url": `data:image/jpeg;base64,${base64Image}` 
        //                     }
        //                 }
        //             ]
        //         }
        //     ],
        //     max_tokens: 1000
        // });

        // return response.choices[0].message;

        return `'1. Carrots\n' +
        '2. Zucchini\n' +
        '3. Eggs\n' +
        '4. Raw meat (possibly beef)\n' +
        '5. Sliced carrots\n' +
        '6. Sliced zucchini'`
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred during the image processing.");
    }
};