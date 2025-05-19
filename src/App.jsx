import React from 'react';
import UserTable from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Sample user data
  const users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      status: 'owner',
      onEdit: (user) => console.log('Edit user:', user)
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'tenant',
      onEdit: (user) => console.log('Edit user:', user)
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'manager',
      onEdit: (user) => console.log('Edit user:', user)
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Management</h2>
      <UserTable users={users} />
    </div>
  );
}

export default App; 