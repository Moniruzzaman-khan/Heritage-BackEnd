const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        category_name : {type: String,unique: true},
        category_image : {type: String,unique: true},
    },
    {timestamps:true,versionKey:false}
)

const CategoryModel = mongoose.model('category',DataSchema)
module.exports = CategoryModel;