import React, { useState } from 'react'
import ImagePair from './ImagePair.jsx'
import Tab from './Tab.jsx'
import "./DemoContainer.css"

function DemoContainer() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="demo-container">
      <div className="image-pairs">
        {[...Array(4)].map((_, index) => (
          <ImagePair key={index} active={activeTab === index} />
        ))}
      </div>
      <div className="tabs">
        {[...Array(4)].map((_, index) => (
          <Tab
            key={index}
            index={index}
            active={activeTab === index}
            onClick={handleTabClick}
          />
        ))}
      </div>
    </div>
  )
}

export default DemoContainer
