Ext.define('App.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'quantity', type: 'int' }
    ],
    idProperty: 'id'
});
