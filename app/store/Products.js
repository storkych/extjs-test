Ext.define('App.store.Products', {
    extend: 'Ext.data.Store',
    alias: 'store.products',
    model: 'App.model.Product',
    data: [
        { id: 1, name: 'Кофе', description: 'Зёрна арабики', price: 8.5, quantity: 12 },
        { id: 2, name: 'Чай', description: 'Чёрный цейлонский', price: 4.2, quantity: 0 },
        { id: 3, name: 'Сахар', description: 'Тростниковый', price: 2.1, quantity: 44 },
        { id: 4, name: 'Молоко', description: '1.5% ультрапастер.', price: 1.3, quantity: 5 },
        { id: 5, name: 'Какао', description: 'Натуральный порошок', price: 3.9, quantity: 0 }
    ],

    proxy: { type: 'memory' },
    autoLoad: true
});
