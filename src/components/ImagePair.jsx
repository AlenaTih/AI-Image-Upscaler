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
  )
}

export default ImagePair                    
