Ext.define('App.controller.ProductController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.product',

    onFilterEnter: function (field, e) {
        if (e.getKey() === e.ENTER) this.applyFilters();
    },

    applyFilters: function () {
        const idVal = (this.lookupReference('filterId').getValue() || '').trim();
        const descVal = (this.lookupReference('filterDesc').getValue() || '').trim();

        const store = this.lookupReference('grid').getStore();
        store.clearFilter();

        if (idVal !== '') {
            const idNum = parseInt(idVal, 10);
            if (!Number.isNaN(idNum)) {
                store.addFilter({ property: 'id', value: idNum, exactMatch: true });
            }
        }
        if (descVal !== '') {
            store.addFilter({ property: 'description', value: descVal, anyMatch: true, caseSensitive: false });
        }
    },

    onCellClick: function (grid, td, cellIndex, record) {
        const column = grid.getHeaderContainer().getHeaderAtIndex(cellIndex);
        if (column && column.dataIndex === 'name') {
            Ext.create('App.view.product.Edit', { record: record }).show();
        }
    }
});
