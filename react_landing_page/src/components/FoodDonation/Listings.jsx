import React from 'react';

const Listings = ({ items, type, handleAction }) => {
  return (
    <div className="card">
      <h3>{type}</h3>
      {items.length === 0 ? (
        <p>No {type.toLowerCase()} yet.</p>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li className="list-item" key={idx}>
              <span>{item.foodType} ({item.quantity})</span>
              {handleAction && <button className="button-primary" onClick={() => handleAction(item)}>Request</button>}
              <span>Status: {item.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listings;
