export default {
    name: 'cookbook',
    title: 'Cook book',
    type: 'document',
    fields: [
        {
            name: 'userData',
            title: 'userData',
            type: 'reference',
            to: [{ type: 'userData' }],
        },
        {
            name: 'recipeName',
            title:'Recipe Name',
            type:'string',
        },
        {
            name: 'ingredients',
            title:'Ingredients',
            type:'array',
            of: [
                {
                type: 'string',
                title: 'ingredients'
                }
            ],
        },
        {
            name: 'instructions',
            title:'Instructions',
            type:'array',
            of: [
                {
                type: 'string',
                title: 'instructions'
                }
            ],
        },
        {
            name: 'macros',
            title:'Macros',
            type: 'array',
            of: [
                {
                type: 'string',
                title: 'macros'
                }
            ],
        },
    ],
};