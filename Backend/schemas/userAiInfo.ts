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
            type:'array',
            of : [{ type: 'string'}]
        },
        {
            name: 'cuisineType',
            title:'cuisine type',
            type:'array',
            of : [{ type: 'string'}]
        },
        {
            name: 'ingredients',
            title:'Ingredients',
            type:'array',
            of : [{ type: 'string'}]
        },
        {
            name: 'tools',
            title:'Tools',
            type:'array',
            of : [{ type: 'string'}]
        },
        {
            name: 'time',
            title:'Time',
            type:'array',
            of : [{ type: 'number'}]
        },
        {
            name: 'persons',
            title:'Persons',
            type:'array',
            of : [{ type: 'number'}]
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