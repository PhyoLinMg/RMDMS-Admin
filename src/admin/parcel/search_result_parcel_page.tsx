import React, { useEffect, useState } from 'react';
import { Root } from '../../network/model/parcel';
import ParcelTable from './parcel_table';
// import { searchParcels } from '../../network/parcel/network_get_all_parcels';
import { useSearchParams, useNavigate } from 'react-router';
import { searchParcels } from '../../network/parcel/parcel_service';

const SearchParcelResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [parcelData, setParcelData] = useState<Root | null>(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log('Page changed to:', newPage);
  };

  const handleSearch = (roomNumber: string) => {
    
  
  };

  useEffect(() => {
    console.log(searchParams.get('roomNumber'));
    async function fetchSearchResults() {
      try {
        const searchObject = {
          roomNumber: searchParams.get('roomNumber') || '',
        };
        
       const data = await searchParcels(searchObject.roomNumber,page);
        setParcelData(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    }

    fetchSearchResults();
  }, [page]);

  if (parcelData === null) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h2>Search Results</h2>
      <button 
        className="btn btn-primary mb-3"
        onClick={() =>  navigate(-1)}
      >
        Back to Parcels
      </button>

      <ParcelTable
        parcelData={parcelData}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        disableSearch={true} // Disable search since this is a search result page
      />
    </div>
  );
};

export default SearchParcelResultPage;