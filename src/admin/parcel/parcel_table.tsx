import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Parcel } from '../../network/model/parcel';

interface ParcelTableProps {
  parcels: Parcel[];
}

const ParcelTable: React.FC<ParcelTableProps> = ({ parcels }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'collected':
        return 'secondary';
      case 'delivered':
        return 'warning';
      default:
        return 'light';
    }
  };

  const filteredParcels = parcels.filter(parcel => 
    parcel.roomDetails.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by room number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">Recipient Name</th>
              <th scope="col">Manager Name</th>
              <th scope="col">Description</th>
              <th scope="col">Room Number</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => (
              <tr key={parcel.id}>
                <td>{parcel.recipientDetails.fullName}</td>
                <td>{parcel.managerDetails.fullName}</td>
                <td>{parcel.description}</td>
                <td>{parcel.roomDetails.roomNumber}</td>
                <td>
                  <span className={`badge bg-${getStatusBadgeColor(parcel.status)}`}>
                    {parcel.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelTable;