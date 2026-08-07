import React from 'react';

const RoleSwitcher = ({ role, setRole }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        className="button-primary"
        onClick={() => setRole('donor')}
        disabled={role === 'donor'}
      >
        Donor
      </button>
      <button
        className="button-success"
        onClick={() => setRole('receiver')}
        disabled={role === 'receiver'}
      >
        Receiver
      </button>
    </div>
  );
};

export default RoleSwitcher;
