//Backend/server/lib/userDataSet.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';

const router: Router = express.Router();

type mealType = {
    MealType: string | null, //breakfast, lunch, dinner, brunch...
    EventMeal: string | null, //(see StValentain, Noel, Anniv, thanksgiving, Ramadan, Aid, Pentecote)
    Meal: string | null, //Entre, plat, dessert...
}

type EnergyType = {
    Carbs: number | null, 
    Protein: number | null,
    Fats: number | null,
    Salt: number | null,
}

type userDataForm = {
    Allergies: string[] | null,
    CuisineType: string | null, 
    Regime: string | null,
    Ingredients: string | null,
    Tools: string | null,
    Time: string | null,
    Level: string | null
    NumberOfPlates: number | null,
    MealType: mealType | null,
    Energy: EnergyType | null,
}

export let userData: userDataForm | null = null;

export default function userDataSet(sanity: SanityClient): Router {

    //shoot vers DATABASE
    router.post('/userPrefInfo', async (req: Request, res: Response) => {
        try{
            const { 
                Ingredients, // >> reponse Vision 
                Allergies, 
                CuisineType, 
                Regime, 
                Tools, 
                Time, 
                Level, 
                NumberOfPlates, 
                MealType, 
                Energy
            } = req.body;
            userData = { 
                Allergies, 
                CuisineType, 
                Regime, 
                Ingredients, 
                Tools, 
                Time, 
                Level, 
                NumberOfPlates, 
                MealType, 
                Energy 
            };
            console.log(userData)
            return res.status(200).json({message: 'dataRecieved'})
        }catch(err){
            console.error(err);
        }
    });

    return (router) ;
}
















// router.post('/putRdv', async (req: Request, res: Response) => {
//     const { name, email, phone, date, time, guests, adresse } = req.body;
//     const dateExists = await sanity.fetch('*[_type == "rdv" && date == $date]', { date });
//     if (dateExists.length > 0) {
//         return res.status(400).json({ message: 'Date already Taken' });
//     }

//     try {
//         const newRdv = {
//             _type: 'rdv',
//             name: name,
//             email: email,
//             phone: phone,
//             date: date,
//             time: time,
//             numberGuests: guests,
//             adresse: adresse,
//         };
//         await sanity.create(newRdv);
//         res.status(200).json({ message: 'RDV SET', newRdv });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });