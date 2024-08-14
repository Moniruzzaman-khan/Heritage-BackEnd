const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        name : {type: String,unique: true},
        address : {type: String,unique: true},
        image : {type: String,unique: true},
        description : {type: String,unique: true},
        price : {type: String,unique: true},
        remark : {type: String,required:true},
        categoryID : {type: mongoose.Schema.Types.ObjectId,required:true},
    },
    {timestamps:true,versionKey:false}
)

const PropertyModel = mongoose.model('property',DataSchema)
module.exports = PropertyModel;