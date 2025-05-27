import React, { useEffect, useState } from 'react';
import { Root } from '../../network/model/parcel';
import ParcelTable from './parcel_table';
// import { searchParcels } from '../../network/parcel/network_get_all_parcels';
import { useSearchParams, useNavigate } from 'react-router';

const SearchParcelResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [parcelData, setParcelData] = useState<Root | null>(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    // Return to main parcels page for new search
    navigate('/parcels');
  };

  useEffect(() => {
    console.log(searchParams.get('roomNumber'));
    async function fetchSearchResults() {
      try {
        const searchObject = {
          recipientName: searchParams.get('roomNumber') || '',
          
          page
        };
        
       // const data = await searchParcels(searchObject);
        //setParcelData(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    }

    fetchSearchResults();
  }, [searchParams, page]);

  if (parcelData === null) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h2>Search Results</h2>
      <button 
        className="btn btn-primary mb-3"
        onClick={() => navigate('/parcels')}
      >
        Back to Parcels
      </button>

      <ParcelTable
        parcelData={parcelData}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchParcelResultPage;