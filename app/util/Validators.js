Ext.define('App.util.Validators', {
    singleton: true,
    isNonNegativeFloat(v) { return typeof v === 'number' && v >= 0; },
    isNonNegativeInt(v) { return Number.isInteger(v) && v >= 0; }
});
