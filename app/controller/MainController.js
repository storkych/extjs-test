Ext.define('App.controller.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onOpenProducts: function () {
        const tabs = this.lookupReference('tabs');
        const tab = tabs.add({
            xtype: 'product-list',
            title: 'Товары ' + (tabs.items.length + 1),
            closable: true
        });
        tabs.setActiveTab(tab);
    },

    onLogout: function () {
        this.getView().destroy();
        Ext.create('App.view.login.Login').show();
    }
});
