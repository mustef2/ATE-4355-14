import React,{useState} from 'react'
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
const Imageslider = ({ images }) => {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(images.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === images.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

    
  return (
    <>

<div className="overflow-hidden h-96 relative">
      <div
        className={`flex  after:transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((s,index) => {
          return <img  src={`http://127.0.0.1:8080/${s}`} alt={index} />;
          
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {images.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i === current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>  
    </>
  )
}
export default Imageslider
