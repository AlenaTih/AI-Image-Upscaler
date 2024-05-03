// import React, { useState } from 'react'
// import ImagePair from './ImagePair.jsx'
// import Tab from './Tab.jsx'
// import "./DemoContainer.css"

// function DemoContainer() {
//   const [activeTab, setActiveTab] = useState(0)

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex)
//   }

//   return (
//     <div className="demo-container">
//       <div className="image-pairs">
//         {[...Array(4)].map((_, index) => (
//           <ImagePair key={index} active={activeTab === index} />
//         ))}
//       </div>
//       <div className="tabs">
//         {[...Array(4)].map((_, index) => (
//           <Tab
//             key={index}
//             index={index}
//             active={activeTab === index}
//             onClick={handleTabClick}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DemoContainer


// import React, { useState } from 'react';
// import ImagePair from './ImagePair.jsx';
// import Tab from './Tab.jsx';
// import "./DemoContainer.css";
// import DemoImageCat from "../assets/demo-image-cat.png";
// import Sunset from "../assets/sunset.png";
// import Coffee from "../assets/coffee.png";
// import CoffeeLaptop from "../assets/coffee-laptop.png";
// import NatureLover from "../assets/nature-lover.png";
// import Spring from "../assets/spring.png";
// import Succulent from "../assets/succulent.png";
// import SustainableStay from "../assets/sustainable-stay.png";


// function DemoContainer() {
//   const [activeTab, setActiveTab] = useState(0);
  
//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   }

//   // Array of image paths for each tab
//   const imagePaths = [DemoImageCat, Sunset, Coffee, CoffeeLaptop, NatureLover, Spring, Succulent, SustainableStay];

//   return (
//     <div className="demo-container">
//       <div className="image-pairs">
//         {[...Array(8)].map((_, index) => (
//           <ImagePair key={index} active={activeTab === index} imagePath={imagePaths[index]} />
//         ))}
//       </div>
//       <div className="tabs">
//         {[...Array(8)].map((_, index) => (
//           <Tab
//             key={index}
//             index={index}
//             active={activeTab === index}
//             onClick={handleTabClick}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DemoContainer;

// import React, { useState } from 'react';
// import ImagePair from './ImagePair.jsx';
// import Tab from './Tab.jsx';
// import "./DemoContainer.css";
// import DemoImageCat from "../assets/demo-image-cat.png";
// import Sunset from "../assets/sunset.png";
// import Coffee from "../assets/coffee.png";
// import CoffeeLaptop from "../assets/coffee-laptop.png";
// import NatureLover from "../assets/nature-lover.png";
// import Spring from "../assets/spring.png";
// import Succulent from "../assets/succulent.png";
// import SustainableStay from "../assets/sustainable-stay.png";

// function DemoContainer() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [dragX, setDragX] = useState(0.5); // Initial drag position
  
//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   }

//   // Array of image paths for each tab
//   const imagePaths = [DemoImageCat, Sunset, Coffee, CoffeeLaptop, NatureLover, Spring, Succulent, SustainableStay]

//   return (
//     <div className="demo-container">
//       <div className="image-pairs">
//         {[...Array(4)].map((_, index) => (
//           <ImagePair 
//             key={index} 
//             active={activeTab === index} 
//             imagePath={imagePaths[index]} 
//             dragX={dragX}
//             setDragX={setDragX} // Pass setter function to update dragX
//           />
//         ))}
//       </div>
//       <div className="tabs">
//         {[...Array(4)].map((_, index) => (
//           <Tab
//             key={index}
//             index={index}
//             active={activeTab === index}
//             onClick={handleTabClick}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DemoContainer;


// import React, { useState } from 'react';
// import ImagePair from './ImagePair.jsx';
// import Tab from './Tab.jsx';
// import "./DemoContainer.css";
// import DemoImageCat from "../assets/demo-image-cat.png";
// import Sunset from "../assets/sunset.png";
// import Coffee from "../assets/coffee.png";
// import CoffeeLaptop from "../assets/coffee-laptop.png";
// import NatureLover from "../assets/nature-lover.png";
// import Spring from "../assets/spring.png";
// import Succulent from "../assets/succulent.png";
// import SustainableStay from "../assets/sustainable-stay.png";

// function DemoContainer() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [dragXStates, setDragXStates] = useState(Array(4).fill(0.5)); // Initial drag positions
  
//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   }

//   // Array of image paths for each tab
//   const imagePaths = [DemoImageCat, Sunset, Coffee, CoffeeLaptop, NatureLover, Spring, Succulent, SustainableStay]

//   const handleDragXChange = (index, newDragX) => {
//     const newDragXStates = [...dragXStates];
//     newDragXStates[index] = newDragX;
//     setDragXStates(newDragXStates);
//   }

//   return (
//     <div className="demo-container">
//       <div className="image-pairs">
//         {imagePaths.map((imagePath, index) => (
//           <ImagePair 
//             key={index} 
//             active={activeTab === index} 
//             imagePath={imagePath} 
//             dragX={dragXStates[index]}
//             setDragX={(newDragX) => handleDragXChange(index, newDragX)} // Pass setter function to update dragX
//           />
//         ))}
//       </div>
//       <div className="tabs">
//         {[...Array(4)].map((_, index) => (
//           <Tab
//             key={index}
//             index={index}
//             active={activeTab === index}
//             onClick={handleTabClick}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DemoContainer;



import React, { useState } from 'react';
import ImagePair from './ImagePair.jsx';
import Tab from './Tab.jsx';
import "./DemoContainer.css";
import DemoImageCat from "../assets/demo-image-cat.png";
import Sunset from "../assets/sunset.png";
import Coffee from "../assets/coffee.png";
import CoffeeLaptop from "../assets/coffee-laptop.png";
import NatureLover from "../assets/nature-lover.png";
import Spring from "../assets/spring.png";
import Succulent from "../assets/succulent.png";
import SustainableStay from "../assets/sustainable-stay.png";

function DemoContainer() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  }

  // Array of image paths for each tab
  const imagePaths = [
    [DemoImageCat, Sunset], // Tab 1
    [Coffee, CoffeeLaptop], // tab 2
    [Spring, Succulent],   
    [NatureLover, SustainableStay]
    // Add more image pairs for other tabs as needed
  ];

  return (
    <div className="demo-container">
      <div className="image-pairs">
        {imagePaths.map((paths, index) => (
          <ImagePair 
            key={index} 
            active={activeTab === index} 
            imagePaths={paths} 
          />
        ))}
      </div>
      {/* <div className="tabs">
        {[...Array(imagePaths.length)].map((_, index) => (
          <Tab
            key={index}
            index={index}
            active={activeTab === index}
            onClick={handleTabClick}
          />
        ))}
      </div> */}
      <div className="tabs">
        {imagePaths.map((paths, index) => (
          <Tab
            key={index}
            index={index}
            active={activeTab === index}
            onClick={handleTabClick}
            imagePaths={paths}
          />
        ))}
    </div>
    </div>
  );
}

export default DemoContainer;

