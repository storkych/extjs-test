Ext.define('App.view.product.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'product-list',
    controller: 'product',
    requires: [
        'App.controller.ProductController',
        'App.store.Products',
        'App.view.product.Edit',
        'App.util.Validators'
    ],
    layout: { type: 'vbox', align: 'stretch' },
    bodyPadding: 8,

    items: [
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: { labelAlign: 'top', margin: '0 8 8 0' },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID (точное)',
                    reference: 'filterId',
                    width: 160,
                    emptyText: 'например, 3',
                    enableKeyEvents: true,
                    listeners: { specialkey: 'onFilterEnter' }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Описание (вхождение)',
                    reference: 'filterDesc',
                    flex: 1,
                    emptyText: 'например, “арабики”',
                    enableKeyEvents: true,
                    listeners: { specialkey: 'onFilterEnter' }
                }
            ]
        },
        {
            xtype: 'grid',
            reference: 'grid',
            flex: 1,
            store: { type: 'products' },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 80 },
                {
                    text: 'Имя',
                    dataIndex: 'name',
                    flex: 1,
                    renderer: function (v) {
                        return '<span style="text-decoration:underline;cursor:pointer">' +
                            Ext.String.htmlEncode(v) + '</span>';
                    }
                },
                { text: 'Описание', dataIndex: 'description', flex: 2 },
                { text: 'Цена', dataIndex: 'price', width: 100, formatter: 'number("0.00")' },
                {
                    text: 'Кол-во',
                    dataIndex: 'quantity',
                    width: 100,
                }
            ],
            listeners: { cellclick: 'onCellClick' }
        }
    ]
});
