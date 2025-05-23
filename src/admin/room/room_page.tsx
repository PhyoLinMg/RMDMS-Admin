import React, { useEffect } from 'react';
import { Room } from '../../network/model/room';
import { getAllRooms } from '../../network/room/network_get_all_rooms';
import RoomTable from './room_table';
import { useNavigate } from 'react-router';

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => { 
    async function fetchRooms() {
      try {
        const data = await getAllRooms();
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        // Optionally set an error state here to show a message to the user
      }
    }
    
    fetchRooms();
  }, []);   

  if(!rooms) return <div>Loading...</div>;

  const handleCreateRoom = () => {
    navigate('/dashboard/rooms/create');
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Rooms Management</h2>
          <p className="mb-0">Manage your property rooms here.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
      
      <div className="content-placeholder">
        <RoomTable rooms={rooms} />
      </div>
    </div>
  );
};

export default RoomsPage;