// import React from 'react'
// import DemoImageCat from "../assets/demo-image-cat.png";
// import Sunset from "../assets/sunset.png";
// import Coffee from "../assets/coffee.png";
// import CoffeeLaptop from "../assets/coffee-laptop.png";
// import NatureLover from "../assets/nature-lover.png";
// import Spring from "../assets/spring.png";
// import Succulent from "../assets/succulent.png";
// import SustainableStay from "../assets/sustainable-stay.png";

// function Tab({ index, active, onClick }) {
//   return (
//     <div
//       className={`tab ${active ? 'active' : ''}`}
//       onClick={() => onClick(index)}
//     >
//       {/* <img src={DemoImageCat}></img> */}
//       Tab {index + 1}
//     </div>
//   )
// }

// export default Tab


import React from 'react';

function Tab({ index, active, onClick, imagePaths }) {
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={() => onClick(index)}
    >
      {/* {!active && (
        <>
          <img src={imagePaths[0]} alt="Image 1" />
          <img src={imagePaths[1]} alt="Image 2" />
        </>
      )}
      {active && `Tab ${index + 1}`} */}
      <img src={imagePaths[0]} alt="Image 1" />
    </div>
  );
}

export default Tab;

