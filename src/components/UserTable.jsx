import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable = ({ users }) => {
  const getStatusBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return 'danger';
      case 'tenant':
        return 'success';
      case 'manager':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge bg-${getStatusBadgeColor(user.userRole)}`}>
                  {user.userRole}
                </span>
              </td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => user.onEdit && user.onEdit(user)}
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

export default UserTable; 