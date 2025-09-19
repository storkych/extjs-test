Ext.Loader.setConfig({
    enabled: true,
    paths: {
        App: 'app'
    }
});

Ext.application({
    name: 'App',
    requires: [
        'App.view.login.Login',
        'App.controller.LoginController',
        'App.view.main.Main',
        'App.controller.MainController'
    ],
    launch: function () {
        Ext.create('App.view.login.Login').show();
    }
});
