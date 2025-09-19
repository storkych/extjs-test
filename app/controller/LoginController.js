Ext.define('App.controller.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLogin: function () {
        const form = this.lookupReference('form').getForm();
        if (!form.isValid()) return;

        const { login, password } = form.getValues();
        const ok = login === 'admin' && password === 'padmin';

        if (!ok) {
            Ext.Msg.alert('Ошибка', 'Неверная пара логин/пароль');
            return;
        }

        this.getView().close();
        Ext.create('App.view.main.Main');
    }
});
