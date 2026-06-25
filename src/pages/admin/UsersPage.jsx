import React, { useState, useEffect } from 'react';
import api from "../../api";
import {
  Users, UserPlus, Edit2, Trash2, Search, X,
  ChevronLeft, ChevronRight, Phone, Calendar,
  Award, DollarSign, Shield,  AlertCircle, Eye, Upload, RefreshCw
} from 'lucide-react';
import '../../styles/UsersStyles.css';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [csvFile, setCsvFile] =
  useState(null);

  
const [formData, setFormData] = useState({
  telegramId: "",
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  role: "player",
  status: "active",
  balance: 0
});

  // Fetch users from MongoDB
const fetchUsers = async () => {
  setLoading(true);
  setError(null);

  try {

    const response = await api.get("/users");

    console.log(response.data);

    // support both array and object response
    const rawUsers = Array.isArray(response.data)
      ? response.data
      : response.data.users || [];

    const formattedUsers = rawUsers.map(user => ({
      ...user,

name:
  `${user.firstName || ""} ${user.lastName || ""}`.trim()
  || user.username
  || "Unknown User",

      status:
        user.status ||
        (user.isActive ? "active" : "inactive"),

      role:
        user.role || "player",

      balance:
        Number(user.balance || 0),

      createdAt:
        user.createdAt || new Date()
    }));

    setUsers(formattedUsers);
    setTotalUsers(formattedUsers.length);

  } catch (error) {

    console.error(
      "Error fetching users:",
      error
    );

    setError(
      "Failed to load users"
    );

  } finally {

    setLoading(false);
  }
};

  // Add new user to MongoDB
  const addUser = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post(
  "/users",
  userData
);
      setUsers([response.data.user, ...users]);
      closeModal();
      fetchUsers(); // Refresh the list
    } catch (error) {

  console.log("FULL ERROR:");
  console.log(error.response?.data);

  console.error(
    "Error adding user:",
    error
  );

  setError(
    error.response?.data?.message ||
    "Failed to add user"
  );
} finally {
      setLoading(false);
    }
  };

  const handleBulkUpload =
  async () => {

    if (!csvFile) {

      alert(
        "Please select CSV file"
      );

      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        csvFile
      );

      const response =
  await api.post(
    "/users/bulk-upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

      alert(
        response.data.message
      );

      setCsvFile(null);

      fetchUsers();

    } catch (error) {

      console.log(error);

      setError(

        error.response?.data
          ?.message ||

        "Bulk upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // Update user in MongoDB
  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const response = await api.put(
  `/users/${id}`,
  userData
);
      setUsers(users.map(user => user._id === id ? response.data.user : user));
      closeModal();
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Delete user from MongoDB
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await api.delete(
  `/users/${id}`
);
      setUsers(users.filter(user => user._id !== id));
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  // Bulk update balance
  const bulkUpdateBalance = async (amount) => {
    setLoading(true);
    try {
      await api.post(
  "/users/bulk-update-balance",
  { amount }
);
      fetchUsers(); // Refresh the list
      alert(`Successfully added ${amount} Birr to all users!`);
    } catch (error) {
      console.error('Error updating balances:', error);
      setError('Failed to update balances');
    } finally {
      setLoading(false);
    }
  };

  // Update user status
const updateUserStatus = async (id, status) => {

  try {

    setLoading(true);

    await api.patch(
      `/users/${id}/status`,
      {
        status
      }
    );

    fetchUsers();

  } catch (error) {

  } finally {

    setLoading(false);

  }

};

useEffect(() => {
  fetchUsers();
}, []);
const filteredUsers = users.filter((user) => {

  const matchesSearch =
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm);

  const matchesRole =
    filterRole === "all" ||
    user.role === filterRole;

  const matchesStatus =
    filterStatus === "all" ||
    user.status === filterStatus;

  return (
    matchesSearch &&
    matchesRole &&
    matchesStatus
  );
});
const paginatedUsers = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


const totalPages = Math.ceil(
  filteredUsers.length / itemsPerPage
);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
    setCurrentPage(1);
  };

const openModal = (user = null) => {

  if (user) {

    setSelectedUser(user);

setFormData({
  telegramId: user.telegramId || "",
  username: user.username || "",
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  phone: user.phone || "",
  email: user.email || "",
  password: "",
  role: user.role || "user",
  status: user.status || "active",
  balance: user.balance || 0
});

  } else {

    setSelectedUser(null);

setFormData({
  telegramId: "",
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  role: "player",
  status: "active",
  balance: 0
});
  }

  setShowModal(true);
};

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setSelectedUser(null);
    setError(null);
  };

const handleSubmit = async (e) => {

  e.preventDefault();
const userData = {
  telegramId: formData.telegramId,
  username: formData.username,
  firstName: formData.firstName,
  lastName: formData.lastName,
  phone: formData.phone,
  email: formData.email,
  password: formData.password,
  role: formData.role,
  status: formData.status,
  balance: Number(formData.balance) || 0
};

  if (selectedUser) {

    await updateUser(
      selectedUser._id,
      userData
    );

  } else {

    await addUser(userData);
  }
};

const getRoleBadgeClass = (role) => {
  switch(role) {
    case "admin":
      return "role-admin";

    case "agent":
      return "role-agent";

    case "player":
      return "role-player";

    default:
      return "role-player";
  }
};

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'status-active' : 'status-inactive';
  };

  const stats = {
    totalUsers: totalUsers,
activeUsers: (users || []).filter(
  u => u.status === 'active'
).length,
totalBalance: (users || []).reduce(
  (sum, u) => sum + (u.balance || 0),
  0
),
    averageBalance: (users || []).length > 0 ? (users.reduce((sum, u) => sum + (u.balance || 0), 0) / users.length).toFixed(0) : 0
  };

  return (
    <div className="um-container">
      <div className="um-wrapper">
        {/* Header */}
        <div >
          <div className="top-header">
            <h1 className="um-title">User Management</h1>
            <p className="um-subtitle">Manage and organize all users</p>
          </div>
          <div className="um-header-actions">
            <button onClick={() => bulkUpdateBalance(100)} className="um-btn-secondary">
              <DollarSign size={16} /> Add 50 Birr to All
            </button>
            <button onClick={fetchUsers} className="um-btn-secondary">
              <RefreshCw size={16} /> Refresh
            </button>
            <button onClick={() => openModal()} className="um-btn-primary">
              <UserPlus size={18} /> 
            </button>
<div className="um-upload-card">

  <div className="um-upload-left">

    <div className="um-upload-icon">
      <Upload size={26} />
    </div>

    <div>
      <h3 className="um-upload-title">
        Bulk Import Users
      </h3>

      <p className="um-upload-subtitle">
        Upload CSV file to import Telegram users
      </p>
    </div>

  </div>

  <div className="um-upload-right">

    <label className="um-file-select">

      <input
        type="file"
        accept=".csv"
        hidden
        onChange={(e) =>
          setCsvFile(
            e.target.files[0]
          )
        }
      />

      <Upload size={16} />

      {csvFile
        ? "Change File"
        : "Choose CSV"}
    </label>

    {csvFile && (

      <div className="um-file-preview">

        <div className="um-file-info">

          <div className="um-file-name">
            {csvFile.name}
          </div>

          <div className="um-file-size">
            {(csvFile.size / 1024).toFixed(2)} KB
          </div>

        </div>

        <button
          className="um-remove-file"
          onClick={() =>
            setCsvFile(null)
          }
        >
          <X size={16} />
        </button>

      </div>
    )}

    <button
      onClick={handleBulkUpload}
      className="um-btn-primary"
      disabled={!csvFile || loading}
    >

      {loading
        ? (
          <>
            <RefreshCw
              size={16}
              className="um-spin"
            />
            Uploading...
          </>
        )
        : (
          <>
            <Upload size={16} />
            Import Users
          </>
        )}

    </button>

  </div>

</div>
            
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="um-error">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="um-stats-grid">
          <div className="um-stat-card">
            <div className="um-stat-icon blue">
              <Users size={24} />
            </div>
            <div className="um-stat-info">
              <span className="um-stat-label">Total Users</span>
              <span className="um-stat-value">{stats.totalUsers}</span>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-stat-icon green">
              <DollarSign size={24} />
            </div>
            <div className="um-stat-info">
              <span className="um-stat-label">Total Balance</span>
              <span className="um-stat-value">{stats.totalBalance.toLocaleString()} Birr</span>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-stat-icon purple">
              <Users size={24} />
            </div>
            <div className="um-stat-info">
              <span className="um-stat-label">Active Users</span>
              <span className="um-stat-value">{stats.activeUsers}</span>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-stat-icon orange">
              <Award size={24} />
            </div>
            <div className="um-stat-info">
              <span className="um-stat-label">Average Balance</span>
              <span className="um-stat-value">{Number(stats.averageBalance).toLocaleString()} Birr</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="um-filters">
          <div className="um-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="um-search-input"
            />
          </div>
          <div className="um-filter-group">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="um-select"
            >
              <option value="all">All Roles</option>
<option value="admin">Admin</option>
<option value="agent">Agent</option>
<option value="player">Player</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="um-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {loading && users.length === 0 ? (
          <div className="um-loading">
            <div className="um-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <>
            <div className="um-table-container">
              <table className="um-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')} className="um-sortable">
                      User {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('role')} className="um-sortable">
                      Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('phone')} className="um-sortable">
                      Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('balance')} className="um-sortable">
                      Balance {sortConfig.key === 'balance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('status')} className="um-sortable">
                      Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('createdAt')} className="um-sortable">
                      Join Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
<tbody>
  {(paginatedUsers || []).map((user) => (
    <tr key={user._id} className="um-row">
      <td>
        <div className="um-user-info">
          <div className="um-user-avatar">
            {user.name?.charAt(0) || '?'}
          </div>

          <div>
            <div className="um-user-name">
              {user.name}
            </div>

            <div className="um-user-email">
              @{user.username}
            </div>
          </div>
        </div>
      </td>

      <td>
        <span
          className={`um-badge ${getRoleBadgeClass(user.role)}`}
        >
          {user.role}
        </span>
      </td>

      <td>
        <div className="um-phone">
          <Phone size={14} />
          {user.phone || 'N/A'}
        </div>
      </td>

      <td>
        <div className="um-balance">
          <DollarSign size={14} />
          {(user.balance || 0).toLocaleString()} Birr
        </div>
      </td>

      <td>

  <span
    className={
      user.isActive
        ? "status-active"
        : "status-inactive"
    }
  >
    {user.isActive
      ? "Active"
      : "Inactive"}
  </span>

  <button
    className="status-toggle-btn"
    onClick={() =>
      updateUserStatus(
        user._id,
        user.isActive
          ? "inactive"
          : "active"
      )
    }
  >
    {user.isActive
      ? "Deactivate"
      : "Activate"}
  </button>

</td>

      <td>
        <div className="um-date">
          <Calendar size={14} />
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </td>

      <td>
        <div className="um-actions">
          <button
            onClick={() => openViewModal(user)}
            className="um-action-view"
            title="View Details"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => openModal(user)}
            className="um-action-edit"
            title="Edit User"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => deleteUser(user._id)}
            className="um-action-delete"
            title="Delete User"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="um-pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="um-page-btn"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <div className="um-page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`um-page-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="um-page-btn"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}

            {users.length === 0 && !loading && (
              <div className="um-empty">
                <Users size={48} />
                <p>No users found</p>
                <button onClick={() => openModal()} className="um-btn-primary">
                  Add your first user
                </button>
              </div>
            )}
          </>
        )}

        {/* Add/Edit Modal */}
{showModal && (
  <div
    className="um-modal-overlay"
    onClick={closeModal}
  >
    <div
      className="um-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="um-modal-header">

        <h2>
          {selectedUser
            ? "Edit User"
            : "Add New User"}
        </h2>

        <button
          onClick={closeModal}
          className="um-modal-close"
        >
          <X size={20} />
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="um-form"
      >

        {/* Telegram + Username */}
        <div className="um-form-row">

          <div className="um-form-group">
            <label>Telegram ID</label>

            <input
              type="text"
              value={formData.telegramId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telegramId: e.target.value
                })
              }
              placeholder="123456789"
            />
          </div>

          <div className="um-form-group">
            <label>Username</label>

            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value
                })
              }
              placeholder="@username"
            />
          </div>

        </div>

        {/* First + Last Name */}
        <div className="um-form-row">

          <div className="um-form-group">
            <label>First Name</label>

            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value
                })
              }
              placeholder="John"
            />
          </div>

          <div className="um-form-group">
            <label>Last Name</label>

            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value
                })
              }
              placeholder="Doe"
            />
          </div>

        </div>

        {/* Phone + Role */}
        <div className="um-form-row">

          <div className="um-form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
              }
              placeholder="+251XXXXXXXXX"
            />
          </div>

          <div className="um-form-group">
            <label>Role</label>
            <select
  value={formData.role}
  onChange={(e) =>
    setFormData({
      ...formData,
      role: e.target.value
    })
  }
>
  <option value="player">
    Player
  </option>

  <option value="agent">
    Agent
  </option>

  <option value="admin">
    Admin
  </option>
</select>
          </div>

        </div>
        {/* Email + Password for Admin & Agent */}
{["admin", "agent"].includes(formData.role) && (
  <div className="um-form-row">

    <div className="um-form-group">
      <label>Email</label>

      <input
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value
          })
        }
        placeholder="admin@arkey.bet"
      />
    </div>

    <div className="um-form-group">
      <label>Password</label>

      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value
          })
        }
        placeholder="Enter password"
      />
    </div>

  </div>
)}

        {/* Balance */}
        <div className="um-form-row">

          <div className="um-form-group">
            <label>
              Balance (Birr)
            </label>

            <input
              type="number"
              value={formData.balance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  balance:
                    parseFloat(
                      e.target.value
                    ) || 0
                })
              }
              placeholder="0"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="um-form-actions">

          <button
            type="button"
            onClick={closeModal}
            className="um-btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="um-btn-primary"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : selectedUser
              ? "Update User"
              : "Create User"}
          </button>

        </div>

      </form>
    </div>
  </div>
)}

        {/* View User Modal */}
        {showViewModal && selectedUser && (
          <div className="um-modal-overlay" onClick={closeModal}>
            <div className="um-modal um-view-modal" onClick={(e) => e.stopPropagation()}>
              <div className="um-modal-header">
                <h2>User Details</h2>
                <button onClick={closeModal} className="um-modal-close">
                  <X size={20} />
                </button>
              </div>
              <div className="um-view-content">
                <div className="um-view-avatar">
                  {selectedUser.name?.charAt(0) || '?'}
                </div>
                <h3>{selectedUser.name}</h3>
                <p className="um-view-email">@{selectedUser.username}</p>
                
                <div className="um-view-details">
                  <div className="um-view-detail">
                    <Phone size={16} />
                    <span>{selectedUser.phone || 'N/A'}</span>
                  </div>
                  <div className="um-view-detail">
                    <Shield size={16} />
                    <span className={`um-badge ${getRoleBadgeClass(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div className="um-view-detail">
                    <DollarSign size={16} />
                    <span className="um-balance">{(selectedUser.balance || 0).toLocaleString()} Birr</span>
                  </div>
                  <div className="um-view-detail">
                    <Calendar size={16} />
                    <span>Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="um-view-actions">
                  <button onClick={() => { closeModal(); openModal(selectedUser); }} className="um-btn-primary">
                    Edit User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;