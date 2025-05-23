import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RoomFormData {
    building: string;
    floor: string;
    roomNumber: string;
}

const CreateRoomPage: React.FC = () => {
    const [formData, setFormData] = useState<RoomFormData>({
        building: '',
        floor: '',
        roomNumber: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Create New Room</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Building</label>
                                    <input
                                        type="text"
                                        name="building"
                                        value={formData.building}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Floor</label>
                                    <input
                                        type="text"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Room Number</label>
                                    <input
                                        type="text"
                                        name="roomNumber"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Create Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomPage;