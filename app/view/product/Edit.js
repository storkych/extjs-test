Ext.define('App.view.product.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'product-edit',
    title: 'Карточка товара',
    modal: true,
    width: 420,
    bodyPadding: 10,
    layout: 'fit',
    defaultListenerScope: true,
    referenceHolder: true,


    config: { record: null },

    items: [{
        xtype: 'form',
        reference: 'form',
        trackResetOnLoad: true,
        defaults: { anchor: '100%' },
        items: [
            { xtype: 'displayfield', name: 'id', fieldLabel: 'ID' },
            { xtype: 'displayfield', name: 'name', fieldLabel: 'Имя' },
            { xtype: 'displayfield', name: 'description', fieldLabel: 'Описание' },
            {
                xtype: 'numberfield',
                name: 'price',
                fieldLabel: 'Цена',
                minValue: 0,
                allowDecimals: true,
                decimalPrecision: 2,
                allowBlank: false
            },
            {
                xtype: 'numberfield',
                name: 'quantity',
                fieldLabel: 'Кол-во',
                minValue: 0,
                allowDecimals: false,
                allowBlank: false
            }
        ],
        buttons: [
            { text: 'Отмена', handler: function (btn) { btn.up('window').close(); } },
            { text: 'Сохранить', formBind: true, handler: 'onSave' }
        ]
    }],

    listeners: {
        beforerender: function () {
            const rec = this.getRecord();
            if (rec) this.down('form').getForm().setValues(rec.getData());
        }

    },

    onSave: function () {
        var form = this.lookupReference('form').getForm();
        if (!form.isValid()) return;

        var rec = this.getRecord();
        var values = form.getValues();

        values.price = parseFloat(values.price);
        values.quantity = parseInt(values.quantity, 10);

        if (!App.util.Validators.isNonNegativeFloat(values.price)) {
            Ext.Msg.alert('Ошибка', 'Цена должна быть неотрицательным числом.');
            return;
        }
        if (!App.util.Validators.isNonNegativeInt(values.quantity)) {
            Ext.Msg.alert('Ошибка', 'Кол-во должно быть неотрицательным целым.');
            return;
        }

        if (values.price !== rec.get('price') || values.quantity !== rec.get('quantity')) {
            Ext.Msg.alert('Изменения', 'Обнаружены изменённые данные. Сохраняю…');
        }

        rec.set(values);
        this.close();
    }

});
