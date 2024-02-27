export default {
    name: 'shoppingList',
    title: 'Shopping List',
    type: 'document',
    fields: [
        {
            name: 'userData',
            title: 'User Data',
            type: 'reference',
            to: [{ type: 'userData' }],
        },
        {
            name: 'items',
            title: 'Items List',
            type: 'array',
            of: [
                {
                type: 'string',
                title: 'items'
                }
            ],
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
        },
    ],
};