Ext.define('App.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    controller: 'main',
    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'toolbar',
            items: [
                { text: 'Товары', handler: 'onOpenProducts' },
                '->',
                { text: 'Выход', handler: 'onLogout' }
            ]
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            reference: 'tabs',
            items: []
        }
    ]
});
