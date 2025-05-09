import React, { useState, useEffect } from 'react';
import { User, MapPin, Edit, Plus, LogOut, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getMyDeliveryAddress } from '../../../Services/userApi';
import AddNewAddress from './AddNewAddress';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [showAddressPopup, setShowAddressPopup] = useState(false);

  // Scroll to top on component mount to fix scrolling issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const getAddress = async () => {
    try {
      let address = await getMyDeliveryAddress();
      console.log(address, "address");
      setAddress(address.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  const handleAddressSubmit = (newAddress) => {
    // Handle the new address submission here
    // You would typically call an API to save the address
    // Then refresh the address list
    getAddress();
    setShowAddressPopup(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 text-center">No user data available</h3>
          <p className="text-gray-600 mt-2 text-center">Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Address Popup Component
  const AddressPopup = () => {
    if (!showAddressPopup) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-800">Add New Address</h3>
            <button 
              onClick={() => setShowAddressPopup(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <AddNewAddress 
              onSubmit={handleAddressSubmit} 
              onCancel={() => setShowAddressPopup(false)} 
            />
          </div>
        </div>
      </div>
    );
  };

  const ProfileInfo = () => (
    <div className="space-y-6 ">
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
          {/* <button className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-700 transition-colors">
            <Edit size={16} className="mr-1" /> Edit
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transition-all duration-200 hover:bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="text-gray-800 font-medium">{userData.first_name} {userData.last_name || ''}</p>
          </div>
          <div className="transition-all duration-200 hover:bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Email Address</p>
            <p className="text-gray-800 font-medium">{userData.email}</p>
          </div>
          <div className="transition-all duration-200 hover:bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="text-gray-800 font-medium">{userData.phone_number || 'Not provided'}</p>
          </div>
          <div className="transition-all duration-200 hover:bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">District</p>
            <p className="text-gray-800 font-medium">{userData.district || 'Not available'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-800">Addresses</h3>
          <button 
            onClick={() => setShowAddressPopup(true)}
            className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-1" /> Add New
          </button>
        </div>
        
        {address && address.length > 0 ? (
          <div className="space-y-4">
            {address.map((address, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-5 transition-all duration-200 hover:shadow-md ${
                  address.is_primary ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{address.is_primary || 'Primary Address'}</span>
                  {address.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-gray-800 font-medium">{address.delivery_person_name || 'No name provided'}</p>
                <p className="text-gray-600">{address.district || 'Street not specified'}</p>
                <p className="text-gray-600">
                  {address.address || 'City not specified'}, 
                  {address.state ? ` ${address.state}` : ''} 
                  {address.zipCode ? ` ${address.zip_code}` : ''}
                </p>
                <p className="text-gray-600">{address.country || 'Country not specified'}</p>
                <p className="text-gray-600 mt-1">{address.phone_number || 'Phone not provided'}</p>
                
                <div className="flex gap-4 mt-4">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">Edit</button>
                  {!address.isDefault && (
                    <>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">Set as Default</button>
                      <button className="text-red-600 text-sm font-medium hover:text-red-800 transition-colors">Remove</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No addresses saved yet</p>
            <button 
              onClick={() => setShowAddressPopup(true)}
              className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
            >
              Add your first address
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-16 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blue-200">
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
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
              <nav>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-6 py-4 flex items-center justify-between transition-colors ${
                    activeTab === 'profile' 
                      ? 'border-l-4 border-blue-600 bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User size={20} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'} />
                    <span className={activeTab === 'profile' ? 'font-medium' : ''}>Profile</span>
                  </div>
                  <ChevronRight size={16} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'} />
                </button>
              </nav>
              
              <div className="px-6 py-5 border-t border-gray-100">
                <button 
                  className="text-red-600 text-sm font-medium flex items-center hover:text-red-700 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
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
      
      {/* Render the address popup */}
      <AddressPopup />
    </div>
  );
}

export default UserProfile;