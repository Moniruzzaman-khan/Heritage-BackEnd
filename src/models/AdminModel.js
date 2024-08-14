const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        email : {type: String,unique: true,required:true,lowercase:true},
        name : {type: String,unique: true},
        otp : {type: String,unique: true},
    },
    {timestamps:true,versionKey:false}
)

const AdminModel = mongoose.model('admin',DataSchema)
module.exports = AdminModel;