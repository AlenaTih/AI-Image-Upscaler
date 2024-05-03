import React from 'react'
import DemoImageCat from "../assets/demo-image-cat.png"

function Tab({ index, active, onClick }) {
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={() => onClick(index)}
    >
      <img src={DemoImageCat}></img>
      Tab {index + 1}
    </div>
  )
}

export default Tab
