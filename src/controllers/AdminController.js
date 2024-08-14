const {AdminOTPService,VerifyAdminOTPService, UpdateUserProfileService, ReadUserProfileService} = require("../services/AdminServices");

exports.AdminOTP = async (req,res) => {
    let result = await AdminOTPService(req);
    return res.status(200).json(result)
}

exports.VerifyAdminLogin = async (req,res) => {
    let result = await VerifyAdminOTPService(req);
    if(result['status'] === "success"){
        let cookieOption = {expires:new Date(Date.now()+24*6060*1000),httpOnly:false}
        res.cookie('token',result['token'],cookieOption)
        return res.status(200).json(result)
    }else {
        return res.status(200).json(result)
    }
}

exports.AdminLogout = async (req,res) => {
    let cookieOption = {expires:new Date(Date.now()-24*6060*1000),httpOnly:false}
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status:"success"})
}


exports.UpdateUserProfile = async (req,res) => {
    let result = await UpdateUserProfileService(req)
    return res.status(200).json(result)
}

exports.ReadUserProfile = async (req,res) => {
    let result = await ReadUserProfileService(req)
    return res.status(200).json(result)
}