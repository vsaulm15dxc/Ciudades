import React, { useState } from 'react';
import './CollapsibleCard.css';

function CollapsibleCard({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="collapsible-card">
      <div className="card-header" onClick={handleToggle}>
        <h3 className="card-title">{title}</h3>
        <button className="toggle-button" onClick={handleToggle}>
          {isExpanded ? '-' : '+'}
        </button>
      </div>
      {isExpanded && <div className="card-content">{children}</div>}
    </div>
  );
}

export default CollapsibleCard;
