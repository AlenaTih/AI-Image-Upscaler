// import React, { useState, useRef } from 'react'
// import DemoImageCat from "../assets/demo-image-cat.png"
// import Sunset from "../assets/sunset.png"

// function ImagePair({ active }) {

//   const [dragX, setDragX] = useState(.5)
//   const [dragging, setDragging] = useState(false)
//   const container = useRef()

//   const startDragging = () => {
//         setDragging(true)
//       }
    
//   const drag = (e) => {
//         if (dragging) {
//         const offsetWidth = container.current.offsetWidth
//         // const x = e.clientX - (window.innerWidth - offsetWidth) / 2 - 10
//         const x = e.clientX - container.current.getBoundingClientRect().left
//         setDragX(x / offsetWidth)
    
//         }
//       }
    
//   const stopDragging = () => {
//         console.log('stop')
//         setDragging(false)
//       }

//   const left = dragX * 100

//   return (
//         <div className={`image-pair ${active ? 'active' : ''}`}
//           ref={container}
//           onMouseMove={drag}
//           onMouseUp={stopDragging}
//         >
        
//         <div
//             className="demo-image-dragger"
//             onMouseDown={startDragging}
//             style={{
//                 left: `calc(${left}%)`,
//             }}
//         />
        
//         <div className="demo-image-container">
//             <img
//             src={DemoImageCat}
//             alt="Image 1"
//             className={`demo-image-one ${dragX < 0.5 ? "active" : ""}`}
//             />
//             <img
//             src={Sunset}
//             alt="Image 2"
//             className={`demo-image-two ${dragX >= 0.5 ? "active" : ""}`}
//             />
//       </div>
//     </div>
//   )
  
// }

// export default ImagePair



// import React, { useState, useRef } from 'react';

// function ImagePair({ active, imagePath }) {
//   const [dragX, setDragX] = useState(.5);
//   const [dragging, setDragging] = useState(false);
//   const container = useRef();

//   const startDragging = () => {
//     setDragging(true);
//   }

//   const drag = (e) => {
//     if (dragging) {
//       const offsetWidth = container.current.offsetWidth;
//       const x = e.clientX - container.current.getBoundingClientRect().left;
//       setDragX(x / offsetWidth);
//     }
//   }

//   const stopDragging = () => {
//     setDragging(false);
//   }

//   const left = dragX * 100;

//   return (
//     <div className={`image-pair ${active ? 'active' : ''}`}
//       ref={container}
//       onMouseMove={drag}
//       onMouseUp={stopDragging}
//     >
//       <div
//         className="demo-image-dragger"
//         onMouseDown={startDragging}
//         style={{
//           left: `calc(${left}%)`,
//         }}
//       />
//       <div className="demo-image-container">
//         <img
//           src={imagePath}
//           alt={`Image ${active ? '1' : '2'}`}
//           className={`demo-image-one ${dragX < 0.5 ? "active" : ""}`}
//         />
//         <img
//           src={imagePath}
//           alt={`Image ${active ? '1' : '2'}`}
//           className={`demo-image-two ${dragX >= 0.5 ? "active" : ""}`}
//         />
//       </div>
//     </div>
//   );
// }

// export default ImagePair;


// import React, { useRef } from 'react';

// function ImagePair({ active, imagePath, dragX, setDragX }) {
//   const dragging = useRef(false);
//   const container = useRef();

//   const startDragging = () => {
//     dragging.current = true;
//   }

//   const drag = (e) => {
//     if (dragging.current) {
//       const offsetWidth = container.current.offsetWidth;
//       const x = e.clientX - container.current.getBoundingClientRect().left;
//       const newDragX = Math.min(1, Math.max(0, x / offsetWidth)); // Ensure dragX is between 0 and 1
//       setDragX(newDragX);
//     }
//   }

//   const stopDragging = () => {
//     dragging.current = false;
//   }

//   const left = dragX * 100;

//   return (
//     <div className={`image-pair ${active ? 'active' : ''}`}
//       ref={container}
//       onMouseMove={drag}
//       onMouseUp={stopDragging}
//     >
//       <div
//         className="demo-image-dragger"
//         onMouseDown={startDragging}
//         style={{
//           left: `calc(${left}%)`,
//         }}
//       />
//       <div className="demo-image-container">
//         <img
//           src={imagePath}
//           alt={`Image ${active ? '1' : '2'}`}
//           className={`demo-image-one ${dragX < 0.5 ? "active" : ""}`}
//         />
//         <img
//           src={imagePath}
//           alt={`Image ${active ? '1' : '2'}`}
//           className={`demo-image-two ${dragX >= 0.5 ? "active" : ""}`}
//         />
//       </div>
//     </div>
//   );
// }

// export default ImagePair;


import React, { useState, useRef } from 'react';

function ImagePair({ active, imagePaths }) {
  const [dragX, setDragX] = useState(0.5); // Initial drag position
  const container = useRef();

  const startDragging = () => {
    container.current.addEventListener('mousemove', drag);
    container.current.addEventListener('mouseup', stopDragging);
  }

  const drag = (e) => {
    const offsetWidth = container.current.offsetWidth;
    const x = e.clientX - container.current.getBoundingClientRect().left;
    const newDragX = Math.min(1, Math.max(0, x / offsetWidth)); // Ensure dragX is between 0 and 1
    setDragX(newDragX);
  }

  const stopDragging = () => {
    container.current.removeEventListener('mousemove', drag);
    container.current.removeEventListener('mouseup', stopDragging);
  }

  const left = dragX * 100;

  return (
    <div className={`image-pair ${active ? 'active' : ''}`} ref={container}>
      <div
        className="demo-image-dragger"
        onMouseDown={startDragging}
        style={{ left: `calc(${left}%)` }}
      />
      <div className="demo-image-container">
        <img
          src={imagePaths[0]}
          alt="Image 1"
          className={`demo-image-one ${dragX < 0.5 ? "active" : ""}`}
        />
        <img
          src={imagePaths[1]}
          alt="Image 2"
          className={`demo-image-two ${dragX >= 0.5 ? "active" : ""}`}
        />
      </div>
    </div>
  );
}

export default ImagePair;



