import React, { useEffect, useState } from 'react';
import UserTable from './user_table';
import { User } from '../../network/model/user';
import { getUsers } from '../../network/user/network_get_all_users';


const UsersPage: React.FC = () => {

    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => { 
        async function fetchUsers() {
          try {
            const data = await getUsers();
            console.log(data);
            setUsers(data);
          } catch (error) {
            console.error('Failed to fetch projects:', error);
            // Optionally set an error state here to show a message to the user
          }
        }
        
        fetchUsers();
      }, []);   
    if(!users) return <div>Loading...</div>;
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