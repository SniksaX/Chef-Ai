export default {
    name: 'cookbook',
    title: 'Cook book',
    type: 'document',
    fields: [
        {
            name: 'userAiInfo',
            title: 'User AI Info',
            type: 'reference',
            to: [{ type: 'userAiInfo' }],
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
            name: 'stars',
            title: 'Stars',
            type: 'number',
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
        {
            name: 'recipeImage',
            title: 'Recipe Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                    options: {
                        isHighlighted: true
                    }
                },
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                    options: {
                        isHighlighted: true
                    }
                }
            ]
        },
    ],
};

