const Toure = require('../DBModel/toureModel')
const AppError = require('../utils/appError')

exports.createToure = async(req,res)=>{
    try{
        const imagePath = req.files['imageCover'] ? req.files['imageCover'][0].path : null;
        const imagesPaths = req.files['images'] ? req.files['images'].map(file => file.path) : [];
        const newTour = await Toure.create({
            ...req.body,
            imageCover:imagePath,
            images:imagesPaths
        })
        res.status(200).json({
            status:'sccuess',
            data:{
                tour:newTour
            }
            
    }) 
    }catch(eror){
        res.status(404).json({
            status:'failed',
            message:console.log("404 server eror", eror)
    }) 
    }
} 
exports.getAllToure = async(req, res)=>{
    try{
        // //Build The Query 
        // const queryObj = { ...req.query }
        // const excludedFields = ['page', 'sort','limit','fields']
        // excludedFields.forEach(el=> delete queryObj[el])
        // //console.log(queryObj)

        // // Advanced Filtring 
        // const queryStr = JSON.stringify(queryObj)
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt|)\b/g,  match => `$${match}`)
        // console.log(JSON.parse(queryStr))
        
        /*const query = await Toure.find()
        console.log(query)*/
       
        //Run the Query 
        const tours = await Toure.find();
        res.status(200).json({
            status:'sccuess',
            results: tours.length,
            data:{
                tours
            }
        })
    }catch(error){
        res.status(404).json({
            status:'Erorr something is wrong',
            message:error
    }) 
    }
}   
exports.getToure = async(req,res)=>{
    try{
        const toure = await Toure.findById(req.params.id).populate('reviews')
        if(!toure){
            return next(new AppError(' No toure Found On this ID', 404))
        }
        res.status(200).json({
            status:'sccuess',
            results: toure.length,
            data:{
                toure
            }
        })
    }catch(error){
        res.status(404).json({
            status:'failed',
            message:error
    }) 
    }
    
}
exports.updateToure = async(req,res)=>{
    try{
        const tour = await Toure.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators:true
        })
        res.status(200).json({
            status:'sccuess',
            data:{
                tour
            }
        })
    }catch(error){
        res.status(404).json({
            status:'failed',
            message:error
    }) 
    }
}
exports.deleteToure = async(req,res)=>{  
    try{
        await Toure.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'sccuess',
            data:null
        })   
    }catch(error){
        res.status(404).json({
            status:'failed',
            message:error
    }) 
    }   
}