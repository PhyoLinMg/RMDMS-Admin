import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Root } from '../../network/model/parcel';
import SearchDialog from './search_dialog';


interface ParcelTableProps {
  parcelData: Root;
  onPageChange: (page: number) => void;
  onSearch: (searchParams: any) => void;
}

const ParcelTable: React.FC<ParcelTableProps> = ({ parcelData, onPageChange, onSearch }) => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

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

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <button 
          className="btn btn-primary" 
          onClick={() => setIsSearchDialogOpen(true)}
        >
          Advanced Search
        </button>
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
            {parcelData.content.map((parcel) => (
              <tr key={parcel.id}>
                <td>{parcel.recipientName}</td>
                <td>{parcel.managerName}</td>
                <td>{parcel.description}</td>
                <td>{parcel.roomNumber}</td>
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

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${parcelData.first ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(parcelData.number - 1)}
              disabled={parcelData.first}
            >
              Previous
            </button>
          </li>
          {[...Array(parcelData.totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${parcelData.number === index ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => onPageChange(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${parcelData.last ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(parcelData.number + 1)}
              disabled={parcelData.last}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ParcelTable;