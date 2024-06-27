const mongoose = require('mongoose')
const Tour = require('./toureModel')
const ReviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true,'Review Can not be  empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default: Date.now()
    },
    tour:{
        type: mongoose.Schema.ObjectId,
        ref:'Toure',
        required:[true, 'Review Must belong to tour']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: [true, 'Review Must belong to a User']
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

ReviewSchema.index({tour:1, user:1},{unique:true})

ReviewSchema.pre(/^find/, function(next){
    //this.populate({
      //  path:'tour',
       // select:'name'
    //})
    this.populate({
        path:'user',
        select:'name photo'
    })
    next()
})

ReviewSchema.statics.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
      {
        $match: { tour: tourId }
      },
      {
        $group: {
          _id:'$tour',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
    //console.log(stats);
    if (stats.length > 0) {
      await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
      });
    } else {
      await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
      });
  }
  };

ReviewSchema.post('save', function(next){
    this.constructor.calcAverageRatings(this.tour);
})

// findByIdAndUpdate
// findByIdAndDelete
ReviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(this.r);
    next();
  });
  
ReviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review;
//POST