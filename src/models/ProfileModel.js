const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        userID : {type: mongoose.Schema.Types.ObjectId,required:true},
        name : {type: String,unique: true},
        address : {type: String,unique: true},
        phone : {type: String,unique: true},
        image : {type: String,unique: true},
        password : {type: String,unique: true},
    },
    {timestamps:true,versionKey:false}
)

const ProfileModel = mongoose.model('profiles',DataSchema)
module.exports = ProfileModel;