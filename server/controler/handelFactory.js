//Create API
exports.createOne = Model => async(req,res,next)=>{
  try{
    const imagePath = req.files['imageCover'] ? req.files['imageCover'][0].path : null;
    const imagesPaths = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    const doc = await Model.create({
            ...req.body,
            imageCover:imagePath,
            images:imagesPaths
    })
    return res.status(202).json({
      status:"Seccuess",
      data:{
        data:doc
      }
    })
  }catch(eror){
    res.status(404).json({
      status:"failed",
      message:eror.message
    })
  }
};

//GET ONE RECORD API
exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try{
    let query =  Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return res.status(404).json({
            status: 'failed',
            message:"No document found with that ID"
          });
    }
   return res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  }catch(eror){
    res.status(404).json({
      status:"failed",
      message:eror.message
    })

  }
};
//GET ALL DOCMENTS API
exports.getAll = Model => async(req,res)=>{
  //console.log(Model)
  const doc = await Model.find();
 // console.log(doc)
  try{
    const doc = await Model.find();
    res.status(202).json({
      status:"seccuess",
      results: doc.length,
      data:{
        data:doc
      }

    })
  }catch(eror){
      res.status(404).json({
      status:"failed",
      message:"Erorr"
    })
  }

};

//UPDATE DOCMENTS API
exports.updateOne  = Model => async(req,res,next)=>{
  try{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    });

    if (!doc) {
      res.status(404).json({
        status:"failed",
        message:"No document found with that ID"
      })
    }else{
      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      });
    }
  }catch(eror){
    res.status(404).json({
      status:"failed",
      message:eror.message
    })

  }
};
//DELETE DOCUMETS API
exports.deleteOne  = Model => async(req,res,next)=>{
  try{
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404).json({
        status:"failed",
        message:"No document found with that ID"
      })
    }else{
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  }catch(eror){
    res.status(404).json({
      status:"failed",
      message:eror.message
    })
  }
};
