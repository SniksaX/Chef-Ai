//Backend/server/lib/userDataSet.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';

const router: Router = express.Router();


export let userData = {
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

    //shoot vers DATABASE
    router.post('/userPrefInfo', async (req: Request, res: Response) => {
        try{
            userData = req.body
            console.log(userData)
            return res.status(200).json({message: 'dataRecieved', success: true})
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