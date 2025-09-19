Ext.define('App.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    controller: 'login',
    title: 'Вход',
    width: 380,
    closable: false,
    modal: true,
    defaultFocus: 'textfield[name=login]',
    bodyPadding: 15,
    items: [{
        xtype: 'form',
        reference: 'form',
        items: [
            { xtype: 'textfield', name: 'login', fieldLabel: 'Логин', allowBlank: false },
            { xtype: 'textfield', name: 'password', fieldLabel: 'Пароль', inputType: 'password', allowBlank: false }
        ],
        buttons: [
            { text: 'Вход', formBind: true, handler: 'onLogin' }
        ],
        listeners: {
            afterrender: function (form) {
                form.getEl().on('keypress', function (e) {
                    if (e.getKey() === e.ENTER) {
                        form.up('window').getController().onLogin();
                    }
                });
            }
        }
    }]
});
