import React, { useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import './CreateTour.css'
const token = localStorage.getItem('token')
const ToureAllValue = {
    name:"",
    duration:0,
    maxGroupSize:0,
    difficulty:"",
    ratingsAverage:0,
    ratingsQuantity:0,
    price:0,
    priceDiscount:0,
    summary:"",
    description:"",
    imageCover:null,
    images:null,
    startDates:"",
}

const CreateToure = () => {
    const [TourData, setTourData] = useState(ToureAllValue)

    const ToureInputValue = (e)=>{
    setTourData({...TourData ,[e.target.name]:e.target.value})
    }

const uploadImage = (e)=>{
   const fieldName = e.target.name; 
    if (fieldName === 'imageCover') {
        setTourData({
            ...TourData,
            imageCover: e.target.files[0],
        });
    } else if (fieldName === 'images') {
        setTourData({
            ...TourData,
            images: e.target.files,
        });
    }
}
    const ToureSubmit = async(e)=>{
        e.preventDefault()
        try{
            const formData = new FormData();
            formData.append('name', TourData.name);
            formData.append('duration', TourData.duration);
            formData.append('maxGroupSize', TourData.maxGroupSize);
            formData.append('difficulty', TourData.difficulty);
            formData.append('ratingsAverage', TourData.ratingsAverage);
            formData.append('ratingsQuantity', TourData.ratingsQuantity);
            formData.append('price', TourData.price);
            formData.append('priceDiscount', TourData.priceDiscount);
            formData.append('summary', TourData.summary);
            formData.append('description', TourData.description);
            formData.append('startDates', TourData.startDates);
            formData.append('imageCover', TourData.imageCover);
            if (TourData.images) {
                Array.from(TourData.images).forEach((image) => {
                    formData.append('images', image);
                });
            }
            const res = await fetch('http://127.0.0.1:8080/api/tours',{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                body:formData
            })
            const data = await res.json()
            console.log(data)
            if(res.ok){
                console.log("data send seccuessfully!")
            }else{
                console.log("data not send check api")
            }
        }catch(error){
            console.log("Check Server Api", error)
        }
    }
    return (
    <>
<div className="CT-container">
  <form
    className="CT-form"
    method="post"
    onSubmit={ToureSubmit}
    enctype="multipart/form-data"
    action="/uploads"
  >
    <div className="CT-form-group">
      <label className="CT-label" htmlFor="name">Full Name</label>
      <input
        className="CT-input"
        onChange={(e) => ToureInputValue(e)}
        type="text"
        name="name"
        id="name"
        placeholder="Full Name"
      />
    </div>
    <div className="CT-form-group">
      <label className="CT-label" htmlFor="duration">Duration</label>
      <input
        className="CT-input"
        onChange={(e) => ToureInputValue(e)}
        type="number"
        name="duration"
        id="duration"
        placeholder="Duration Of the Toure"
      />
    </div>
    <div className="CT-form-group">
      <label className="CT-label" htmlFor="maxGroupSize">Max Group Size</label>
      <input
        className="CT-input"
        onChange={(e) => ToureInputValue(e)}
        type="number"
        name="maxGroupSize"
        id="maxGroupSize"
        placeholder="Max Group Size Of the Toure"
      />
    </div>
    <div className="CT-form-group">
      <label className="CT-label" htmlFor="difficulty">Difficulty</label>
      <select
        className="CT-select"
        onChange={(e) => ToureInputValue(e)}
        id="difficulty"
        name="difficulty"
      >
        <option className="CT-option">easy</option>
        <option className="CT-option">medium</option>
        <option className="CT-option">difficult</option>
      </select>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="ratingsAverage">Ratings Average</label>
        <input
          className="CT-input"
          onChange={(e) => ToureInputValue(e)}
          type="text"
          name="ratingsAverage"
          id="ratingsAverage"
        />
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="ratingsQuantity">Ratings Quantity</label>
        <input
          className="CT-input"
          onChange={(e) => ToureInputValue(e)}
          type="number"
          name="ratingsQuantity"
          id="ratingsQuantity"
        />
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="price">Price</label>
        <input
          className="CT-input"
          onChange={(e) => ToureInputValue(e)}
          type="number"
          name="price"
          id="price"
        />
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="priceDiscount">Price Discount</label>
        <input
          className="CT-input"
          onChange={(e) => ToureInputValue(e)}
          type="number"
          name="priceDiscount"
          id="priceDiscount"
        />
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="summary">Summary</label>
        <textarea
          className="CT-textarea"
          onChange={(e) => ToureInputValue(e)}
          name="summary"
          id="summary"
        ></textarea>
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="description">Description</label>
        <textarea
          className="CT-textarea"
          onChange={(e) => ToureInputValue(e)}
          name="description"
          id="description"
        ></textarea>
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="imageCover">Image Cover</label>
        <input
          className="CT-input-file"
          onChange={(e) => uploadImage(e)}
          type="file"
          name="imageCover"
          id="imageCover"
        />
      </div>
    </div>
    <div className="CT-form-group">
      <div className="CT-input-group">
        <label className="CT-label" htmlFor="images">Images</label>
        <input
          className="CT-input-file"
          onChange={(e) => uploadImage(e)}
          type="file"
          name="images"
          id="images"
          multiple
        />
      </div>
    </div>
    <div className="CT-form-group">
      <label className="CT-label" htmlFor="startDates">Start Dates</label>
      <input
        className="CT-input"
        onChange={(e) => ToureInputValue(e)}
        type="date"
        name="startDates"
        id="startDates"
        placeholder="Start Date of Tour"
      />
    </div>
    <div className="CT-form-group">
      <button className="CT-button" type="submit">Create Toure</button>
    </div>
  </form>
</div>


    </>
  )
}

export default CreateToure
