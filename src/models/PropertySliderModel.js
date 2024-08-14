const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        title : {type: String,required:true},
        des : {type: String,required:true},
        price : {type: String,required:true},
        img : {type: String,required:true},
        propertyID : {type: mongoose.Schema.Types.ObjectId,required:true},
    },
    {timestamps:true,versionKey:false}
)

const PropertySliderModel = mongoose.model('propertysliders',DataSchema)
module.exports = PropertySliderModel;