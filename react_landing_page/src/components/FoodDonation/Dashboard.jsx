import React, { useState } from 'react';
import RoleSwitcher from './RoleSwitcher';
import DonationForm from './DonationForm';
import Listings from './Listings';
import './FoodDonation.css';

const Dashboard = () => {
  const [role, setRole] = useState('donor'); // donor or receiver
  const [donations, setDonations] = useState([]); // donor listings
  const [requests, setRequests] = useState([]);   // receiver requests
  const [availableDonations, setAvailableDonations] = useState([]); // for receiver view

  const addDonation = (donation) => {
    setDonations([donation, ...donations]);
    setAvailableDonations([donation, ...availableDonations]);
  };

  const requestDonation = (donation) => {
    setRequests([donation, ...requests]);
    // Optionally mark as requested in available list
    setAvailableDonations(availableDonations.map(d => d === donation ? { ...d, status: 'requested' } : d));
  };

  return (
    <div className="food-donation-container">
      <RoleSwitcher role={role} setRole={setRole} />

      {role === 'donor' ? (
        <>
          <DonationForm addDonation={addDonation} />
          <Listings items={donations} type="My Donations" />
        </>
      ) : (
        <>
          <Listings items={availableDonations} type="Available Donations" handleAction={requestDonation} />
          <Listings items={requests} type="My Requests" />
        </>
      )}
    </div>
  );
};

export default Dashboard;
