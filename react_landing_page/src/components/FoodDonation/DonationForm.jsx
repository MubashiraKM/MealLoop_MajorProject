import React, { useState } from 'react';

const DonationForm = ({ addDonation }) => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [pickupOption, setPickupOption] = useState('pickup');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodType || !quantity || !expiry) return;
    addDonation({ foodType, quantity, expiry, pickupOption, status: 'active' });
    setFoodType('');
    setQuantity('');
    setExpiry('');
    setPickupOption('pickup');
  };

  return (
    <div className="card">
      <h3>Add Donation</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Type:</label>
          <input type="text" value={foodType} onChange={(e) => setFoodType(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Expiry Time:</label>
          <input type="datetime-local" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
        </div>
        <div>
          <label>Pickup Option:</label>
          <select value={pickupOption} onChange={(e) => setPickupOption(e.target.value)}>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <button className="button-success" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DonationForm;
