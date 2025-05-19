import React from 'react';
import UserTable from '../../components/UserTable';
import { User } from '../../network/model/User';

const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'owner'
    },
    {
        id: 2,
        name: 'John Foe',
        email: 'john@example.com',
        role: 'manager'
    },
    {
        id: 3,
        name: 'John Goe',
        email: 'john@example.com',
        role: 'tenant'
    },

];

const UsersPage: React.FC = () => {
    return (
        <div className="page-container">
            <h2>Users Management</h2>
            <p>Manage system users and permissions here.</p>

            {/* Placeholder content */}
            <div className="content-placeholder">
                <UserTable users={users} />
            </div>
        </div>
    );
};

export default UsersPage;