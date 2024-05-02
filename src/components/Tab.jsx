// Tab.js
import React from 'react';

function Tab({ index, active, onClick }) {
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={() => onClick(index)}
    >
      Tab {index + 1}
    </div>
  );
};

export default Tab
