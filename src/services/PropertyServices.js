const CategoryModel = require('../models/CategoryModel');
const ReviewModel = require('../models/ReviewModel');
const mongoose = require("mongoose");
const PropertyModel = require("../models/PropertyModel");
const PropertySliderModel = require("../models/PropertySliderModel");
const ObjectId = mongoose.Types.ObjectId;



const PropertyListService = async () => {
    try{
        let data = await PropertyModel.find();
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const CategoryListService = async () => {
    try{
        let data = await CategoryModel.find();
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const SliderListService = async () => {
    try{
        let data = await PropertySliderModel.find();
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}


const ListByCategoryService = async (req) => {
    try{
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStage = {$match:{categoryID:CategoryID}};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'category._id':0}}

        let data = await PropertyModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const ListBySimilarService = async () => {
    try{
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStage = {$match:{categoryID:CategoryID}};
        let limitStage = {$limit:20}
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'category._id':0}}

        let data = await PropertyModel.aggregate([
            MatchStage,limitStage,
            JoinWithCategoryStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const ListByKeywordService = async (req) => {
    try{
        let SearchRegex = {"$regex":req.params.Keyword, "$options":"i"}
        let SearchParams = [{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery = {$or:SearchParams}

        let MatchStage = {$match:SearchQuery};
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'category._id':0}}


        let data = await PropertyModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const DetailsService = async (req) => {
    try{
        let PropertyID = new ObjectId(req.params.PropertyID);
        let MatchStage = {$match:{_id:PropertyID}}

        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithDetailsStage = {$lookup:{from:"propertydetails",localField:"_id",foreignField:"propertyID",as:"details"}};
        let UnwindCategoryStage = {$unwind:"$category"}
        let UnwindDetailsStage = {$unwind:"$details"}

        let ProjectionStage = {$project:{'category._id':0}}

        let data = await PropertyModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const ListByRemarkService = async (req) => {
    try{
        let Remark = req.params.Remark;
        let MatchStage = {$match:{remark:Remark}};
        let JoinCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindCategorytStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'category._id':0}}


        let data = await PropertyModel.aggregate([
            MatchStage,
            JoinCategoryStage,unwindCategorytStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const ReviewListService = async (req) => {
    try{
        let PropertyID = new ObjectId(req.params.PropertyID);
        let MatchStage = {$match:{propertyID:PropertyID}}
        let JoinWithProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage = {$unwind:"$profile"}
        let ProjectionStage = {$project:{'des': 1,'rating': 1,'profile.name': 1}}

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const CreateReviewService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        let data = ReviewModel.create({
            propertyID:reqBody['propertyID'],
            userID:user_id,
            des: reqBody['des'],
            rating: reqBody['rating']
        })
        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

const ListByFilterService = async (req) => {
    try{
        let matchConditions = {};

        if(req.body['categoryID']){
            matchConditions.categoryID = new ObjectId(req.body['categoryID'])
        }

        let MatchStage = {$match:matchConditions};
        let AddFieldsStage = {
            $addFields: {numericPrice: {$toInt:"$price"}}
        }

        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMstchConditions = {}

        if(!isNaN(priceMin)){
            PriceMstchConditions['numericPrice'] = {$gte: priceMin};
        }

        if(!isNaN(priceMax)){
            PriceMstchConditions['numericPrice'] ={...(PriceMstchConditions['numericPrice'] || {}), $lte: priceMax} ;
        }

        let PriceMatchStage = {$match:PriceMstchConditions}

        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'category._id':0,"categoryID":0}}

        let data = await PropertyModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {status:"success",data:data}
    }catch (e) {
        return {status: "fail",data:e}.toString()
    }
}

module.exports = {
    PropertyListService,
    CategoryListService,
    SliderListService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeywordService,
    DetailsService,
    ListByRemarkService,
    ReviewListService,
    CreateReviewService,
    ListByFilterService
}