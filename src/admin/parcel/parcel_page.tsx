import React from 'react';

const ParcelsPage: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Parcels Management</h2>
      <p>Track and manage all parcels here.</p>
      
      {/* Placeholder content */}
      <div className="content-placeholder">
        <p>Parcel management features will be displayed here.</p>
        <ul>
          <li>Register new parcels</li>
          <li>Track parcel status</li>
          <li>View delivery history</li>
          <li>Manage shipping details</li>
        </ul>
      </div>
    </div>
  );
};

export default ParcelsPage;