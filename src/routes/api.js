const express = require('express');
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const AdminController = require("../controllers/AdminController");
const PropertyController = require("../controllers/PropertyController");

const router = express.Router();


//Admin
router.get('/AdminOTP/:email',AdminController.AdminOTP)
router.get('/VerifyAdminLogin/:email/:otp',AdminController.VerifyAdminLogin)
router.get('/AdminLogout',AuthVerification,AdminController.AdminLogout)
router.post('/UpdateUserProfile',AuthVerification,AdminController.UpdateUserProfile)
router.get('/ReadUserProfile',AuthVerification,AdminController.ReadUserProfile)

// User
router.get('/UserOTP/:email',UserController.UserOTP)
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin)
router.get('/UserLogout',AuthVerification,UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile)
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile)
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile)

// Property
router.get('/PropertyList',PropertyController.PropertyList)
router.get('/PropertyCategoryList',PropertyController.PropertyCategoryList)
router.get('/PropertySliderList',PropertyController.PropertySliderList)
router.get('/PropertyListByCategory/:CategoryID',PropertyController.PropertyListByCategory)
router.get('/PropertyListBySimilar/:CategoryID',PropertyController.PropertyListBySimilar)
router.get('/PropertyListByKeyword/:Keyword',PropertyController.PropertyListByKeyword)
router.get('/PropertyListByRemark/:Remark',PropertyController.PropertyListByRemark)
router.get('/PropertyDetails/:ProductID',PropertyController.PropertyDetails)
router.get('/CreateReview/:ProductID',PropertyController.CreateReview)
router.get('/PropertyReviewList/:ProductID',PropertyController.PropertyReviewList)
router.post('/PropertyListByFilter',PropertyController.PropertyListByFilter)



module.exports = router;