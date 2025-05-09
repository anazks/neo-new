import React, { useState, useEffect, useCallback } from 'react';
import { User, MapPin, Edit, Plus, Save, X, Camera, Check } from 'lucide-react';
import { useAuth } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getMyDeliveryAddress, profileUpdate,getUserInfo } from '../../../Services/userApi';
import AddressPopup from './AddNewAddress';
import axios from 'axios';
import Nouser from './Nouser';
import { Loader } from 'lucide-react';
import BaseURL from '../../../Static/Static';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();

  // Memoized fetch functions
  const fetchUserData = useCallback(async () => {
    try {
      if (!user?.id) {
        // Try to get from localStorage if not available from context
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
          setFormData({
            first_name: parsedUser.first_name || '',
            last_name: parsedUser.last_name || '',
            phone_number: parsedUser.phone_number || '',
            date_of_birth: parsedUser.date_of_birth || '',
            district: parsedUser.district || '',
            state: parsedUser.state || '',
            address: parsedUser.address || '',
            pin_code: parsedUser.pin_code || '',
            age: parsedUser.age || '',
          });
        }
        return;
      }
      
      const response = await getUserInfo()
      console.log(response,"response")
      if (response.data) {
        setUserData(response.data);
        setFormData({
          first_name: response.data.first_name || '',
          last_name: response.data.last_name || '',
          phone_number: response.data.phone_number || '',
          date_of_birth: response.data.date_of_birth || '',
          district: response.data.district || '',
          state: response.data.state || '',
          address: response.data.address || '',
          pin_code: response.data.pin_code || '',
          age: response.data.age || '',
        });
        localStorage.setItem('userProfile', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Try to get from localStorage if API fails
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setFormData({
          first_name: parsedUser.first_name || '',
          last_name: parsedUser.last_name || '',
          phone_number: parsedUser.phone_number || '',
          date_of_birth: parsedUser.date_of_birth || '',
          district: parsedUser.district || '',
          state: parsedUser.state || '',
          address: parsedUser.address || '',
          pin_code: parsedUser.pin_code || '',
          age: parsedUser.age || '',
        });
      }
    }
  }, [user, token]);

  const getAddress = useCallback(async () => {
    try {
      const { data } = await getMyDeliveryAddress();
      setUserAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setUserAddresses([]);
    }
  }, []);

  // Load data immediately on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // First, try to load from localStorage for immediate display
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setFormData({
          first_name: parsedUser.first_name || '',
          last_name: parsedUser.last_name || '',
          phone_number: parsedUser.phone_number || '',
          date_of_birth: parsedUser.date_of_birth || '',
          district: parsedUser.district || '',
          state: parsedUser.state || '',
          address: parsedUser.address || '',
          pin_code: parsedUser.pin_code || '',
          age: parsedUser.age || '',
        });
      }
      
      // Then fetch updated data from API
      await Promise.all([fetchUserData(), getAddress()]);
      setLoading(false);
    };

    loadData();
  }, [fetchUserData, getAddress]);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError(null);
    
    try {
      // Create a proper FormData object
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, value);
        }
      });
      
      // Add profile picture if present
      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }
      
      // Call the profileUpdate API with the FormData
      const { data } = await profileUpdate(formDataToSend);
      
      if (data) {
        const updatedUserData = {...userData, ...data};
        setUserData(updatedUserData);
        localStorage.setItem('userProfile', JSON.stringify(updatedUserData));
        setUpdateSuccess(true);
        setTimeout(() => {
          setIsEditing(false);
          setUpdateSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateError("Failed to update profile. Please try again.");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setPreviewImage(null);
    if (userData) {
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone_number: userData.phone_number || '',
        date_of_birth: userData.date_of_birth || '',
        district: userData.district || '',
        state: userData.state || '',
        address: userData.address || '',
        pin_code: userData.pin_code || '',
        age: userData.age || '',
      });
    }
  };

  const handleAddAddress = () => {
    setShowAddressPopup(true);
  };

  const handleAddressAdded = async () => {
    await getAddress(); // Refresh addresses after adding new one
    setShowAddressPopup(false);
  };

  // Helper functions
  const getProfilePicture = () => {
    if (previewImage) return previewImage;
    if (userData?.profile_picture) return userData.profile_picture;
    if (userData?.profile_picture_url) return userData.profile_picture_url;
    return null;
  };

  // Loading state
  if (loading && !userData) {
    return <Loader />;
  }

  // No user data state
  if (!loading && !userData) {
    return <Nouser />;
  }

  // Profile Info Component
  const ProfileInfo = () => (
    <div className="space-y-6">
      {isEditing ? (
        <EditProfileForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
          cancelEdit={cancelEdit}
          getProfilePicture={getProfilePicture}
          handleProfilePicChange={handleProfilePicChange}
          updateSuccess={updateSuccess}
          updateError={updateError}
          userData={userData}
        />
      ) : (
        <ViewProfile 
          userData={userData} 
          userAddresses={userAddresses} 
          setIsEditing={setIsEditing}
          getProfilePicture={getProfilePicture}
          handleAddAddress={handleAddAddress}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{paddingTop:"50px", paddingBottom:"50px", marginTop:"50px",background: "linear-gradient(to right, #FFFFFF 24%, #63A375 100%)"}}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and delivery addresses</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <ProfileSidebar 
              userData={userData} 
              getProfilePicture={getProfilePicture} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              handleLogout={handleLogout}
            />
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <ProfileInfo />
          </div>
        </div>
      </div>
      
      {/* Address Popup */}
      {showAddressPopup && (
        <AddressPopup 
          onClose={() => setShowAddressPopup(false)}
          onSuccess={handleAddressAdded}
        />
      )}
    </div>
  );
}

// Sub-components for better organization
const EditProfileForm = ({
  formData, handleInputChange, handleSubmit, cancelEdit, 
  getProfilePicture, handleProfilePicChange, updateSuccess, updateError, userData
}) => (
  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={cancelEdit}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <X size={18} className="mr-1" /> Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <Save size={18} className="mr-1" /> Save Changes
        </button>
      </div>
    </div>

    {updateSuccess && (
      <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-700 rounded flex items-center">
        <Check size={16} className="mr-1" /> Profile updated successfully!
      </div>
    )}
    
    {updateError && (
      <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
        {updateError}
      </div>
    )}

    <div className="mb-6 flex justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {getProfilePicture() ? (
            <img 
              src={BaseURL + getProfilePicture()} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>
        <label 
          htmlFor="profile_picture" 
          className="absolute bottom-0 right-0 bg-red-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
        >
          <Camera size={16} />
        </label>
        <input 
          type="file" 
          id="profile_picture" 
          name="profile_picture" 
          accept="image/*" 
          onChange={handleProfilePicChange} 
          className="hidden" 
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          value={userData.email || ''}
          disabled
          className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500"
        />
        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
        <input
          type="text"
          name="age"
          value={formData.age || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
        <input
          type="text"
          name="pin_code"
          value={formData.pin_code || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
        <input
          type="text"
          name="district"
          value={formData.district || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <input
          type="text"
          name="state"
          value={formData.state || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
      <div className="form-group md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        ></textarea>
      </div>
    </div>
  </form>
);

const ViewProfile = ({ userData, userAddresses, setIsEditing, getProfilePicture, handleAddAddress }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
        <button 
          onClick={() => setIsEditing(true)} 
          className="flex items-center px-4 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
        >
          <Edit size={16} className="mr-1" /> Edit Profile
        </button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-2">
          {getProfilePicture() ? (
            <img 
              src={BaseURL + getProfilePicture()} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>
        <h4 className="text-lg font-medium text-gray-800">
          {userData.first_name} {userData.last_name || ''}
        </h4>
        <p className="text-gray-500">{userData.email}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Phone Number</p>
          <p className="text-gray-800">{userData.phone_number || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date of Birth</p>
          <p className="text-gray-800">{userData.date_of_birth || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Age</p>
          <p className="text-gray-800">{userData.age || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">PIN Code</p>
          <p className="text-gray-800">{userData.pin_code || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">District</p>
          <p className="text-gray-800">{userData.district || 'Not available'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">State</p>
          <p className="text-gray-800">{userData.state || 'Not available'}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500">Address</p>
          <p className="text-gray-800">{userData.address || 'No address provided'}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Delivery Addresses</h3>
        <button 
          onClick={handleAddAddress}
          className="flex items-center px-4 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
        >
          <Plus size={16} className="mr-1" /> Add New Address
        </button>
      </div>
      
      {userAddresses?.length > 0 ? (
        <div className="space-y-4">
          {userAddresses.map((address, index) => (
            <div key={index} className={`border rounded-lg p-4 ${address.is_primary ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{address.is_primary ? 'Primary Address' : `Address ${index + 1}`}</span>
                {address.is_primary && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <p className="text-gray-800">{address.delivery_person_name || 'No name provided'}</p>
              <p className="text-gray-600">{address.district || 'Street not specified'}</p>
              <p className="text-gray-600">
                {address.address || 'City not specified'}, 
                {address.state ? ` ${address.state}` : ''} 
                {address.zip_code ? ` ${address.zip_code}` : ''}
              </p>
              <p className="text-gray-600 mt-1">{address.phone_number || 'Phone not provided'}</p>
              
              <div className="flex gap-3 mt-3">
                <button className="text-red-600 text-sm font-medium hover:text-red-700">Edit</button>
                {!address.is_primary && (
                  <>
                    <button className="text-red-600 text-sm font-medium hover:text-red-700">Set as Default</button>
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800">Remove</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MapPin size={48} className="mx-auto text-red-300 mb-4" />
          <p className="text-gray-500">No delivery addresses saved yet</p>
          <button 
            onClick={handleAddAddress}
            className="mt-3 px-4 py-1.5 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
          >
            Add your first address
          </button>
        </div>
      )}
    </div>
  </div>
);

const ProfileSidebar = ({ userData, getProfilePicture, activeTab, setActiveTab, handleLogout }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {getProfilePicture() ? (
          <img 
          src={BaseURL + getProfilePicture()} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={28} className="text-gray-400" />
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {userData?.first_name} {userData?.last_name || ''}
        </h2>
        <p className="text-gray-600 text-sm">{userData?.email}</p>
      </div>
    </div>
    
    <nav className="mb-6">
      <button 
        onClick={() => setActiveTab('profile')}
        className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors rounded-md ${activeTab === 'profile' ? 'border-l-4 border-red-500 bg-red-50' : ''}`}
      >
        <User size={20} className={activeTab === 'profile' ? 'text-red-500' : 'text-gray-500'} />
        <span className={activeTab === 'profile' ? 'font-medium text-red-500' : 'text-gray-700'}>Profile</span>
      </button>
    </nav>
    
    <div className="pt-4 border-t border-gray-100">
      <button 
        className="w-full text-left px-4 py-2 text-red-600 font-medium hover:text-red-700 transition-colors rounded-md hover:bg-red-50"
        onClick={handleLogout}
      >
        Delete My Account
      </button>
    </div>
  </div>
);

export default UserProfile;