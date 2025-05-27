import React, { useEffect, useState } from 'react';
import { Root } from '../../network/model/parcel';
import ParcelTable from './parcel_table';
import { getAllParcels } from '../../network/parcel/network_get_all_parcels';
import { SearchParams } from './search_dialog';
import { useNavigate } from 'react-router';

const ParcelsPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [parcelData, setParcelData] = useState<Root | null>(null);


  const navigate = useNavigate();

  const handleSearch = (searchParams: SearchParams) => {
    const queryParams= new URLSearchParams();
    if(searchParams.roomNumber) queryParams.set('roomNumber', searchParams.roomNumber);
    navigate(`/dashboard/parcels/search?${queryParams.toString()}`);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => { 
      async function fetchParcels() {
        try {
          const data = await getAllParcels(page);
          console.log(data);
          setParcelData (data);
        } catch (error) {
          console.error('Failed to fetch projects:', error);
          // Optionally set an error state here to show a message to the user
        }
      }
      
      fetchParcels();
    }, [page]); 
  if(parcelData === null) return <div>Loading...</div>;
  return (
    <div className="page-container">
      <h2>Parcels Management</h2>
      <p>Track and manage all parcels here.</p>

      {/* Placeholder content */}
      <div className="content-placeholder">
        <p>Parcel management features will be displayed here.</p>
        <ParcelTable
          parcelData={parcelData}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default ParcelsPage;