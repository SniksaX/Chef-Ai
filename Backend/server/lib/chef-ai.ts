//backend/server/lib/chef-ai.ts

import express, { Router, Request, Response } from 'express';
import OpenAi from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';


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
        const responseText = `Given your preferences, a suitable recipe for you could be a simple French-inspired "Ratatouille with Red Meat Cubes." This dish aligns well with your gluten-free requirement, the available kitchen tools, ingredients, and your beginner cooking skill level. It's a classic dish that can elegantly serve three for dinner. 

            ### Ingredients:
            - 200g red meat cubes
            - 1 large zucchini, sliced
            - 2 medium carrots, sliced 
            - 3 eggs
            - 2 tbsp olive oil
            - 1/2 tsp salt
            - 1/2 tsp black pepper
            - 1/2 tsp rosemary, dried
            - 1/2 tsp thyme, dried

            ### Instructions:
            1. Preheat your oven to 375°F (190°C).
            2. In a large bowl, toss the sliced zucchini and carrots with 1 tablespoon of olive oil, salt, and pepper until they are evenly coated.
            3. Spread the vegetables evenly on a baking tray and roast in the preheated oven for about 25 to 30 minutes, or until they are tender and slightly caramelized. Stir them halfway through the cooking time for even roasting.
            4. While the vegetables are roasting, heat the remaining tablespoon of olive oil in a skillet over medium-high heat.
            5. Add the red meat cubes to the skillet, season with salt, pepper, rosemary, and thyme. Cook the meat, stirring occasionally until it is browned and cooked to your preference, approximately 6 to 8 minutes.
            6. In the last 10 minutes of the vegetable roasting time, crack the eggs on top of the vegetables in the oven tray to bake them until the whites are set but the yolks are still runny, or longer if you prefer your eggs well done.
            7. Once the vegetables and eggs are done, remove them from the oven, and arrange the roasted vegetables and meat cubes on plates.
            8. Carefully place an egg on top of each serving.
            9. Optional: Garnish with a sprinkle of rosemary and thyme before serving.

            ### Total Calories:
            - Red meat cubes (200g): ~500 kcal
            - 1 large zucchini: ~55 kcal
            - 2 medium carrots: ~50 kcal
            - 3 eggs: ~210 kcal
            - 2 tbsp olive oil: ~240 kcal
            - Total Calories: ~1055 kcal for the whole recipe, or approximately 352 kcal per serving.

            ### Macronutrients (per serving approximations):
            - Carbs: 10g
            - Proteins: 28g
            - Fats: 24g

            This dish not only adheres to your gluten-free dietary regime but also incorporates a touch of French cuisine, making for a flavorful and healthful dinner option for three. Enjoy your culinary adventure!`;

            const extractSection = (text: any, startMarker: any, endMarker: any) => {
                const startIndex = text.indexOf(startMarker) + startMarker.length;
                const endIndex = text.indexOf(endMarker, startIndex);
                return text.substring(startIndex, endIndex).trim();
            };

            const ingredients = extractSection(responseText, "### Ingredients:", "### Instructions:");
            const instructions = extractSection(responseText, "### Instructions:", "### Total Calories:");
            const totalCalories = extractSection(responseText, "### Total Calories:", "### Macronutrients");

            console.log("Ingredients:\n", ingredients);
            console.log("Instructions:\n", instructions);
            console.log("Total Calories:\n", totalCalories);
    })



    return router;
}


export const AiChef = async (userData: any) => {

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
            - The meal Type the user wants to eat: ${userData?.MealType}
            
            Based on this information, suggest a suitable recipe. Your response should look like below
            (please note that the answer will be transformed into a json answer, if the format changes all the json file sent will display differently
            so i cannot stress enaugh how important it is that your answer should look like the bellow example)

            
            **Recipe name** : The name of the recipe you Made in here

            **Ingredients**: List the ingredients and their quantities in the following format:

                Ingredients:
                1/2 tsp Ingredient1
                100g Ingredient2
                1/2 tsp Ingredient3
                4 Ingredient4
                ...

            **Instructions**: Provide step-by-step cooking instructions in the following format:

                Instructions:
                1. Preheat the oven to 375°F.
                2. Sprinkle baking soda and baking powder over the cod and let it sit for 1 minute.
                3. In a bowl, mix almond flour and allspice, then coat the cod with the mixture.
                ...

            **Total Calories**: The estimated total caloric content of the recipe, along with the breakdown of macronutrients. It should look like this:

                Total Calories: 670kcal
                Carbs: X g
                Proteins: Y g
                Fats: Z g

            **End Recipe**
                End recipe should be the last thing in the list just after Total Calories.
            `

            const chatCompletion = await openai.chat.completions.create({
                messages: [
                {role: "system", content: prompt},
            ],
                model: 'gpt-4-0125-preview',
            });
            const output = chatCompletion.choices[0].message.content;
            console.log(output)

            return (output)

        } catch (err) {
            console.error(err);
        }
}

export const detectPhotoIngredients = async (fileName: any) => {

    try {

        const imagePath = path.join(__dirname, `../../uploads/${fileName}`);

        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: `
                    You are an expert at analyzing images with computer vision. In case of error, make a full report of the cause of: any issues in receiving or understanding images.
                    Please provide list of all the food ingredients you see in this picture. List the items in the following format:

                    1. Ingredient1
                    2. Ingredient2
                    3. Ingredient3
                    4. Ingredient4
                    ...

                    Just list the items without any additional context or description.
                    Ignore Brand Names.
                    `,
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                "url": `data:image/jpeg;base64,${base64Image}` 
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1000
        });

        return response.choices[0].message;

    } catch (error) {
        console.error(error);
        throw new Error("An error occurred during the image processing.");
    }
};