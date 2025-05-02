import React from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';

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
      <span className="flex items-center text-green-400">
        <FiCheckCircle className="mr-1" /> Active
      </span>
    ) : (
      <span className="flex items-center text-red-400">
        <FiXCircle className="mr-1" /> Inactive
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      Admin: 'bg-purple-600 bg-opacity-20 text-purple-400',
      Editor: 'bg-blue-600 bg-opacity-20 text-blue-400',
      Customer: 'bg-gray-600 bg-opacity-20 text-gray-300'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${roleClasses[role]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-rajdhani">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiUser className="mr-2" /> Registered Users
        </h1>
        <div className="bg-gray-800 px-3 py-1 rounded text-sm">
          Total: {users.length} users
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <FiMail className="inline mr-1" /> Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <FiPhone className="inline mr-1" /> Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <FiCalendar className="inline mr-1" /> Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full mr-3 object-cover" 
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${user.email}`} className="text-blue-400 hover:text-blue-300">
                    {user.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`tel:${user.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-400">
                    {user.phone}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700"
                      title="Edit user"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-700"
                      title="Delete user"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
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