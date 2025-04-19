import React from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './viewuser.css';

function UserView() {
  // Sample user data
  const users = [
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-01-15',
      status: 'active',
      role: 'Admin'
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2023-02-20',
      status: 'active',
      role: 'Customer'
    },
    {
      id: 3,
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-03-10',
      status: 'inactive',
      role: 'Customer'
    },
    {
      id: 4,
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 789-0123',
      joinDate: '2023-04-05',
      status: 'active',
      role: 'Editor'
    },
    {
      id: 5,
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-05-12',
      status: 'inactive',
      role: 'Customer'
    }
  ];

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="status-badge active">
        <FiCheckCircle /> Active
      </span>
    ) : (
      <span className="status-badge inactive">
        <FiXCircle /> Inactive
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      Admin: 'admin',
      Editor: 'editor',
      Customer: 'customer'
    };
    return <span className={`role-badge ${roleClasses[role]}`}>{role}</span>;
  };

  return (
    <div className="user-view-container">
      <div className="user-view-header">
        <h1>
          <FiUser /> Registered Users
        </h1>
        <div className="user-count">
          Total: {users.length} users
        </div>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>
                <FiMail /> Email
              </th>
              <th>
                <FiPhone /> Phone
              </th>
              <th>
                <FiCalendar /> Joined
              </th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-info">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joinDate}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{getRoleBadge(user.role)}</td>
                <td className="actions">
                  <button className="action-btn edit-btn" title="Edit user">
                    <FiEdit2 />
                  </button>
                  <button className="action-btn delete-btn" title="Delete user">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserView;