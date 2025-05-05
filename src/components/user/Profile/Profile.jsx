import React, { useState, useEffect } from 'react';
import { User, MapPin, Edit, Plus } from 'lucide-react';
import { useAuth } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import {getMyDeliveryAddress} from '../../../Services/userApi'
function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();
const [address,setAddress] = useState([])
  useEffect(() => {
    // Load user data when component mounts or user changes
    const loadUserData = () => {
      try {
        if (user) {
          setUserData(user);
          // Store user data in localStorage for persistence
          localStorage.setItem('userProfile', JSON.stringify(user));
        } else {
          // Try to get from localStorage if context user is not available
          const storedUser = localStorage.getItem('userProfile');
          if (storedUser) {
            setUserData(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
    getAddress();
  }, [user]);
  const getAddress = async ()=>{
    try {
            let address = await getMyDeliveryAddress()
            console.log(address,"address")
            setAddress(address.data)
    } catch (error) {
        console.log(error)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" >
        <div className="text-center">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800">No user data available</h3>
          <p className="text-gray-600 mt-2">Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const ProfileInfo = () => (
    <div className="space-y-6" >
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
          {/* <button className="text-blue-600 flex items-center text-sm font-medium">
            <Edit size={16} className="mr-1" /> Edit
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800">{userData.first_name} {userData.last_name || ''}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-gray-800">{userData.phone_number || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">District</p>
            <p className="text-gray-800">{userData.district || 'Not available'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Addresses</h3>
          {/* <button className="text-blue-600 flex items-center text-sm font-medium">
            <Plus size={16} className="mr-1" /> Add New
          </button> */}
        </div>
        
        {address && address.length > 0 ? (
          <div className="space-y-4">
            {address.map((address, index) => (
              <div key={index} className={`border rounded-lg p-4 ${address.is_primary ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{address.is_primary || 'Primary Address'}</span>
                  {address.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-gray-800">{address.delivery_person_name || 'No name provided'}</p>
                <p className="text-gray-600">{address.district || 'Street not specified'}</p>
                <p className="text-gray-600">
                  {address.address || 'City not specified'}, 
                  {address.state ? ` ${address.state}` : ''} 
                  {address.zipCode ? ` ${address.zip_code}` : ''}
                </p>
                <p className="text-gray-600">{address.country || 'Country not specified'}</p>
                <p className="text-gray-600 mt-1">{address.phone_number || 'Phone not provided'}</p>
                
                <div className="flex gap-3 mt-3">
                  <button className="text-blue-600 text-sm font-medium">Edit</button>
                  {!address.isDefault && (
                    <>
                      <button className="text-blue-600 text-sm font-medium">Set as Default</button>
                      <button className="text-red-600 text-sm font-medium">Remove</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No addresses saved yet</p>
            <button className="mt-2 text-blue-600 text-sm font-medium">
              Add your first address
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{marginTop:"50px"}}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={32} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {userData.first_name} {userData.last_name || ''}
                  </h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <nav>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 ${activeTab === 'profile' ? 'border-l-4 border-blue-600 bg-blue-50' : ''}`}
                >
                  <User size={20} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'} />
                  <span className={activeTab === 'profile' ? 'font-medium text-blue-600' : 'text-gray-700'}>Profile</span>
                </button>
              </nav>
              
              <div className="px-6 py-4 border-t border-gray-100">
                <button 
                  className="text-red-600 text-sm font-medium"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <ProfileInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;