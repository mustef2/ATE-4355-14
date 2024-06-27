const Review = require('../DBModel/reviewModel')

exports.createReview = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'user') {
            return res.status(403).json({
                status: "Failed",
                message: "You do not have permission to perform this action"
            });
        }

        if (!req.body.tour) req.body.tour = req.params.tourId;
        if (!req.body.user) req.body.user = req.user.id;

        const createReview = await Review.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                review: createReview,
                results: 1
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: "Failed",
            message: `Error creating review: ${err.message}`
        });
    }
};

exports.getAllReview = async(req,res)=>{
    try{
        let filter = {}
        if(req.params.tourId) filter = {tour:req.params.tourId}
        console.log(filter)
        const getallreview = await Review.find(filter)
        //console.log(getallreview)
        res.status(200).json({
            status:'success',
            data:{
               review:getallreview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
    
}
exports.getReview = async(req,res)=>{
    try{
        const getreview = await Review.findById(req.params.id)
        if(!getreview){
            return res.status(204).json(
                {status:'success',
                 message:"user does not exist"
                })
        }else{
            return res.status(200).json({
                status:'success',
                data:{
                   review:getreview
                }
            })
        }
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
    
}
exports.updateReview = async(req,res)=>{
    try{
        const updatereview = await Review.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
        })
        res.status(200).json({
            status:'success',
            data:{
                updatereview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
}
exports.deleteReview = async(req,res)=>{
    try{
       await  Review.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })   
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })

    }
    
}