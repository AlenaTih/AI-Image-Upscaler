import React, { useState, useRef } from 'react'
import DemoImageCat from "../assets/demo-image-cat.png"
import Sunset from "../assets/sunset.png"

function ImagePair({ active }) {

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
        <div className={`image-pair ${active ? 'active' : ''}`}
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
        
        <div className="demo-image-container">
            <img
            src={DemoImageCat}
            alt="Image 1"
            className={`demo-image-one ${dragX < 0.5 ? "active" : ""}`}
            />
            <img
            src={Sunset}
            alt="Image 2"
            className={`demo-image-two ${dragX >= 0.5 ? "active" : ""}`}
            />
      </div>
    </div>
  )
  
}

export default ImagePair
