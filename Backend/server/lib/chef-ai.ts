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



export const Dale = (recipeName: string): Promise<{ imageUrl?: string, error?: string }> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!recipeName) {
                return reject({ error: 'Prompt is required' });
            }

            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: recipeName,
                n: 1,
                size: "1024x1024",
            });

            if (response.data && response.data.length > 0) {
                const imageUrl = response.data[0].url;
                resolve({ imageUrl });
            } else {
                reject({ error: 'No image generated' });
            }
        } catch (error) {
            // Handle any errors
            console.error('Error generating image:', error);
            reject({ error: 'Error generating image' });
        }
    });
};

export const AiChef = async (userData: any) => {

        try {
            const prompt = `The user provides the following information:
            - Kitchen tools: ${userData?.Tools}, (if empty, ignore)
            - Available ingredients: ${userData?.Ingredients} , (if empty, ignore)
            - Time available for cooking: ${userData?.Time} minutes , (if empty, ignore)
            
            Additional user details: 
            - Allergies: ${userData?.Allergies} (if empty, ignore)
            - Preferred cuisine type: ${userData?.CuisineType} (if empty, ignore)
            - Dietary regime: ${userData?.Regime} (if empty, ignore)
            - Cooking skill level: ${userData?.Level}, (if empty, ignore)
            - Number of servings needed: ${userData?.NumberOfPlates}, (if empty, ignore)
            - The meal Type the user wants to eat: ${userData?.MealType}, (if empty, ignore)
            - Note you already generated this recipes for the user, do not generate the same as those : ${userData?.recipeNameUsed} (if empty, ignore)
            
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

            // const output = `
            // **Recipe Name**: North-African Inspired Beef and Veggie Traybake

            // **Ingredients**:
            
            // - 500g Raw beef chunks
            // - 1 Red bell pepper
            // - 1 Yellow bell pepper
            // - 200g Brussel sprouts
            // - 1 Sweet potato
            // - 100g Kale
            // - 2 tbsp Olive oil
            // - 1 tsp Salt (as per dietary requirement, adjust if needed)
            // - 1 tsp Ground cumin
            // - 1 tsp Paprika
            // - 1/2 tsp Ground cinnamon
            // - 1/2 tsp Ground ginger
            // - 1 handful Parsley (for garnish)
            
            // **Instructions**:
            
            // 1. Preheat your oven to 180°C (350°F).
            // 2. Wash all the vegetables. Cut the red and yellow bell peppers into strips, halve the Brussel sprouts, dice the sweet potato into small cubes, and roughly chop the kale.
            // 3. In a large mixing bowl, combine the beef chunks, all the prepared vegetables except the kale, 2 tablespoons of olive oil, salt, ground cumin, paprika, cinnamon, and ginger. Toss everything together until the meat and vegetables are well-coated with the oil and spices.
            // 4. Spread the mixture evenly across a large baking tray. Ensure the ingredients are not overcrowded to allow even cooking.
            // 5. Place in the preheated oven and bake for about 40 minutes or until the beef is thoroughly cooked and the vegetables are tender, stirring halfway through the cooking time.
            // 6. In the last 10 minutes of cooking, scatter the kale over the traybake, returning it to the oven to allow the kale to crisp up.
            // 7. Once cooked, remove from the oven. Check for seasoning and adjust if necessary.
            // 8. Garnish with fresh parsley before serving.
            
            // **Total Calories**: Approximately 1800kcal for the entire dish, estimated breakdown per serving (serves 5):
            
            // - Carbs: 30g
            // - Proteins: 40g
            // - Fats: 20g
            
            // **End Recipe**`;

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
                    (please note that the answer will be transformed into a json answer, if the format changes all the json file sent will display differently
                    so i cannot stress enaugh how important it is that your answer should look like the bellow example)

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