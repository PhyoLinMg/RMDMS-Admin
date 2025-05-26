import React, { useEffect, useState } from 'react';
import { Root } from '../../network/model/parcel';
import ParcelTable from './parcel_table';
import { getAllParcels } from '../../network/parcel/network_get_all_parcels';

const ParcelsPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [parcelData, setParcelData] = useState<Root | null>(null);

  const handleSearch = (searchParams: any) => {
    // Implement search logic here
    // Make API call with search parameters
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => { 
      async function fetchRooms() {
        try {
          const data = await getAllParcels(page);
          console.log(data);
          setParcelData (data);
        } catch (error) {
          console.error('Failed to fetch projects:', error);
          // Optionally set an error state here to show a message to the user
        }
      }
      
      fetchRooms();
    }, [page]); 

  return (
    <div className="page-container">


      <h2>Parcels Management</h2>
      <p>Track and manage all parcels here.</p>

      {/* Placeholder content */}
      <div className="content-placeholder">
        <p>Parcel management features will be displayed here.</p>
        <ParcelTable
          parcelData={parcelData!}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default ParcelsPage;