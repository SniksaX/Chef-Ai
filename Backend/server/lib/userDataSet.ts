//Backend/server/lib/userDataSet.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';
import { AiChef } from './chef-ai';

const router: Router = express.Router();


let userData = {
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

export default function userDataSet(sanity: SanityClient): Router {

    router.post('/userPrefInfo', async (req: Request, res: Response) => {
        try{
            userData = {
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
            const recipe = await AiChef(userData)
            return res.status(200).json({message: 'recipe Generated successfuly', recipe})
            // const recipe = "test"
            // setTimeout(() => res.status(200).json({message: 'recipe Generated successfuly', recipe}), 4000)

        }catch(err){
            console.error(err);
        }
    });

    router.post('/test', async (req: Request, res: Response) => {
        return res.status(200).json({message: 'test Passed'})
    })

    return (router) ;
}

