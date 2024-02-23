export default {
    name: 'userAiInfo',
    title: 'info about user preferences in food',
    type: 'document',
    fields: [
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
            name: 'numberOfPlates',
            title:'number of plates',
            type:'string',
        },
        {
            name: 'mealType',
            title:'Meal Type',
            type:'string',
        },
    ],
};