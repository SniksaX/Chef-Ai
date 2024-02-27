export default {
    name: 'userAiInfo',
    title: 'User Ai info',
    type: 'document',
    fields: [
        {
            name: 'userData',
            title: 'userData',
            type: 'reference',
            to: [{ type: 'userData' }],
        },
        {
            name: 'allergies',
            title:'Allergies',
            type:'string',
        },
        {
            name: 'cuisineType',
            title:'cuisine type',
            type:'string',
        },
        {
            name: 'ingredients',
            title:'Ingredients',
            type:'string',
        },
        {
            name: 'tools',
            title:'Tools',
            type:'string',
        },
        {
            name: 'level',
            title:'Level',
            type:'string',
        },
        {
            name: 'mealType',
            title:'Meal Type',
            type:'string',
        },
    ],
};