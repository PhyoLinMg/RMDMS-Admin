import React from 'react';
import { Room } from '../../network/model/room';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RoomTableProps {
  rooms: Room[];
  onEdit?: (room: Room) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms, onEdit }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Room ID</th>
            <th scope="col">Building</th>
            <th scope="col">Floor</th>
            <th scope="col">Room Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomId}</td>
              <td>{room.building}</td>
              <td>{room.floor}</td>
              <td>{room.roomNumber}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEdit && onEdit(room)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;