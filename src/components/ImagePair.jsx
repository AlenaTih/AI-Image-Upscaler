// import React, { useState, useRef } from 'react'
// import DemoImageCat from "../assets/demo-image-cat.png"
// import Sunset from "../assets/sunset.png"

// function ImagePair({ active }) {

    // const [dragX, setDragX] = useState(.5)
    // const [dragging, setDragging] = useState(false)
    // const container = useRef()

    // const startDragging = () => {
    //     setDragging(true)
    //   }
    
    //   const drag = (e) => {
    //     if (dragging) {
    //     const offsetWidth = container.current.offsetWidth
    //     // const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
    //     const x = e.clientX - container.current.getBoundingClientRect().left
    //     setDragX(x / offsetWidth)
    
    //     }
    //   }
    
    //   const stopDragging = () => {
    //     console.log('stop')
    //     setDragging(false)
    //   }

    //   const left = dragX * 100


//   return (
//     <div className={`image-pair ${active ? 'active' : ''}`}>
//         <div className="demo-images-container">
//             <img src={DemoImageCat} alt="Image 1" />
//             <img src={Sunset} alt="Image 2" />
//         </div>
//       {/* <div className="demo-image-dragger"> */}
    //   <div
    //     className="demo-image-container"
    //     ref={container}
    //     onMouseMove={drag}
    //     onMouseUp={stopDragging}
    //     >
    //     <div
    //         className="demo-image-dragger"
    //         onMouseDown={startDragging}
    //         style={{
    //             left: `calc(${left}%)`,
    //         }}
    //     />
    //     </div>
//       </div>
//   )
// }

// export default ImagePair



import React, { useState, useRef } from 'react'
import DemoImageCat from "../assets/demo-image-cat.png"
import Sunset from "../assets/sunset.png"

const ImagePair = ({ active }) => {
  const [dragPosition, setDragPosition] = useState(0);

//   const handleDragStart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     document.addEventListener('mousemove', handleDrag);
//     document.addEventListener('mouseup', handleDragEnd);
//   };

//   const handleDrag = (e) => {
//     const containerWidth = e.currentTarget.offsetWidth;
//     const newPosition = (e.clientX - e.currentTarget.getBoundingClientRect().left) / containerWidth;
//     setDragPosition(Math.min(1, Math.max(0, newPosition)));
//   };

//   const handleDragEnd = () => {
//     document.removeEventListener('mousemove', handleDrag);
//     document.removeEventListener('mouseup', handleDragEnd);
//   };




    const [dragX, setDragX] = useState(.5)
    const [dragging, setDragging] = useState(false)
    const container = useRef()

    const startDragging = () => {
        setDragging(true)
      }
    
      const drag = (e) => {
        if (dragging) {
        const offsetWidth = container.current.offsetWidth
        // const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
        const x = e.clientX - container.current.getBoundingClientRect().left
        setDragX(x / offsetWidth)
    
        }
      }
    
      const stopDragging = () => {
        console.log('stop')
        setDragging(false)
      }

      const left = dragX * 100

  return (
    <div className={`image-pair ${active ? 'active' : ''}`}>
      <div className="demo-image-container">
        <img
          src={DemoImageCat}
          alt="Image 1"
          className={dragX < 0.5 ? "active" : ""}
        />
        <img
          src={Sunset}
          alt="Image 2"
          className={dragX >= 0.5 ? "active" : ""}
        />
      </div>
      {/* <div
        className="demo-image-dragger"
        style={{ left: `calc(${dragPosition * 100}% - 1.5px)` }}
        onMouseDown={handleDragStart}
      ></div> */}
      <div
        className="demo-image-dragger-container"
        ref={container}
        onMouseMove={drag}
        onMouseUp={stopDragging}
        >
        <div
            className="demo-image-dragger"
            onMouseDown={startDragging}
            style={{
                left: `calc(${left}%)`,
            }}
        />
        </div>
    </div>
  );
};

export default ImagePair



