const {PropertyListService,CategoryListService,SliderListService,ListByCategoryService,ListBySimilarService,ListByKeywordService,DetailsService,ListByRemarkService,ReviewListService,CreateReviewService,ListByFilterService} = require('../services/PropertyServices');


exports.PropertyList = async (req,res) => {
    let result = await PropertyListService();
    return res.status(200).json(result)
}

exports.PropertyCategoryList = async (req,res) => {
    let result = await CategoryListService();
    return res.status(200).json(result)
}

exports.PropertySliderList = async (req,res) => {
    let result = await SliderListService();
    return res.status(200).json(result)
}


exports.PropertyListByCategory = async (req,res) => {
    let result = await ListByCategoryService(req);
    return res.status(200).json(result)
}

exports.PropertyListBySimilar = async (req,res) => {
    let result = await ListBySimilarService(req);
    return res.status(200).json(result)
}

exports.PropertyListByKeyword = async (req,res) => {
    let result = await ListByKeywordService(req);
    return res.status(200).json(result)
}

exports.PropertyDetails = async (req,res) => {
    let result = await DetailsService(req);
    return res.status(200).json(result)
}

exports.PropertyListByRemark = async (req,res) => {
    let result = await ListByRemarkService(req);
    return res.status(200).json(result)
}

exports.PropertyReviewList = async (req,res) => {
    let result = await ReviewListService(req);
    return res.status(200).json(result)
}

exports.CreateReview = async (req,res) => {
    let result = await CreateReviewService(req);
    return res.status(200).json(result)
}

exports.PropertyListByFilter = async (req,res) => {
    let result = await ListByFilterService(req);
    return res.status(200).json(result)
}