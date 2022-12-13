module.exports = {
    MultiResponseToObject: function (mg) {
        return mg.map(mg => mg.toObject());
    },
    SingleResponseToObject: function (mg) {
        return mg ? mg.toObject() : mg ;
    },

}