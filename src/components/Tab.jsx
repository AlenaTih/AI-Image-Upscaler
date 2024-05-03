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

export default Tab
