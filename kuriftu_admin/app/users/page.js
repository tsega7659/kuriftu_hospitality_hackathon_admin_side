"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.js";
import { Search, Filter, Download, Plus, MoreHorizontal, Award, Coins } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserManagement() {
  // State management
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+251 912 345 678",
        membershipTier: "Pioneer",
        loyaltyCoins: 2450,
        status: "Active",
        joinDate: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+251 923 456 789",
        membershipTier: "Adventurer",
        loyaltyCoins: 1250,
        status: "Active",
        joinDate: "2023-02-20",
      },
      {
        id: 3,
        name: "Michael Johnson",
        email: "michael.j@example.com",
        phone: "+251 934 567 890",
        membershipTier: "Explorer",
        loyaltyCoins: 450,
        status: "Active",
        joinDate: "2023-03-10",
      },
      {
        id: 4,
        name: "Sarah Williams",
        email: "sarah.w@example.com",
        phone: "+251 945 678 901",
        membershipTier: "Explorer",
        loyaltyCoins: 300,
        status: "Inactive",
        joinDate: "2023-03-15",
      },
      {
        id: 5,
        name: "David Brown",
        email: "david.b@example.com",
        phone: "+251 956 789 012",
        membershipTier: "Adventurer",
        loyaltyCoins: 980,
        status: "Active",
        joinDate: "2023-02-05",
      },
      {
        id: 6,
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "+251 967 890 123",
        membershipTier: "Pioneer",
        loyaltyCoins: 3200,
        status: "Active",
        joinDate: "2023-01-10",
      },
    ];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    membershipTier: 'Explorer',
    loyaltyCoins: 0,
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const usersPerPage = 6;

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Filter and search logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesTier = tierFilter === 'All' || user.membershipTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Dynamic stats
  const totalMembers = users.length;
  const activeMembers = users.filter(u => u.status === 'Active').length;
  const totalLoyaltyCoins = users.reduce((sum, u) => sum + u.loyaltyCoins, 0);

  // Function to get badge color based on membership tier
  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case "Explorer": return "bg-green-100 text-green-600";
      case "Adventurer": return "bg-blue-100 text-blue-600";
      case "Pioneer": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name) return "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email";
    if (!formData.phone.match(/^\+\d{1,3}\s\d{9,12}$/)) return "Invalid phone number (e.g., +251 912 345 678)";
    if (formData.loyaltyCoins < 0) return "Loyalty coins cannot be negative";
    return null;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'loyaltyCoins' ? parseInt(value) || 0 : value,
    }));
  };

  // Add/Edit user handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const newUser = {
      ...formData,
      id: isEditing ? formData.id : Math.max(...users.map(u => u.id), 0) + 1,
      joinDate: isEditing ? formData.joinDate : new Date().toISOString().split('T')[0],
    };

    if (isEditing) {
      setUsers((prev) => prev.map((user) => (user.id === newUser.id ? newUser : user)));
      toast.success(`User ${newUser.name} updated`);
    } else {
      setUsers((prev) => [...prev, newUser]);
      toast.success(`User ${newUser.name} added`);
    }

    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({
      id: null,
      name: '',
      email: '',
      phone: '',
      membershipTier: 'Explorer',
      loyaltyCoins: 0,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    });
  };

  // Add New Member button handler
  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      name: '',
      email: '',
      phone: '',
      membershipTier: 'Explorer',
      loyaltyCoins: 0,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  // Edit user handler
  const handleEdit = (user) => {
    setIsEditing(true);
    setFormData(user);
    setIsModalOpen(true);
  };

  // Delete user handler
  const handleDelete = (id, name) => {
    if (confirm(`Delete user ${name}?`)) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success(`User ${name} deleted`);
    }
  };

  // Export users handler
  const handleExport = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Phone", "Membership Tier", "Loyalty Coins", "Status", "Join Date"],
      ...filteredUsers.map(u => [
        u.id,
        u.name,
        u.email,
        u.phone,
        u.membershipTier,
        u.loyaltyCoins,
        u.status,
        u.joinDate,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users_export.csv';
    link.click();
    toast.success("Users exported as CSV");
  };

  // Reset Filters handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setTierFilter('All');
    setCurrentPage(1);
    toast.info("Filters reset");
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Actions menu handler
  const handleActionClick = (id) => {
    setSelectedUserId(selectedUserId === id ? null : id);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">User Management</h1>
          <p className="text-gray-500">Manage membership users and their details</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Member
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option>All</option>
            <option>Explorer</option>
            <option>Adventurer</option>
            <option>Pioneer</option>
          </select>
          <button
            onClick={handleResetFilters}
            className="border px-4 py-2 rounded-md flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Reset Filters
          </button>
          <button
            onClick={handleExport}
            className="border px-4 py-2 rounded-md flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-semibold">{totalMembers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <p className="text-2xl font-semibold">{activeMembers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-kuriftu-gold/20 p-3 rounded-full mr-4">
              <Coins className="w-5 h-5 text-kuriftu-gold" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Loyalty Coins</p>
              <p className="text-2xl font-semibold">{totalLoyaltyCoins}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Membership</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Loyalty Coins</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTierBadgeColor(user.membershipTier)}`}>
                        {user.membershipTier}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Coins className="w-4 h-4 text-kuriftu-gold mr-1" />
                        <span>{user.loyaltyCoins}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 relative">
                      <button
                        onClick={() => handleActionClick(user.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      {selectedUserId === user.id && (
                        <div className="absolute right-4 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(user)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
                      No users match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * usersPerPage + 1} to{' '}
              {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page ? 'bg-kuriftu-green text-white' : 'border'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{isEditing ? 'Edit Member' : 'Add New Member'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+251 912 345 678"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Membership Tier</label>
                  <select
                    name="membershipTier"
                    value={formData.membershipTier}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Explorer</option>
                    <option>Adventurer</option>
                    <option>Pioneer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loyalty Coins</label>
                  <input
                    type="number"
                    name="loyaltyCoins"
                    value={formData.loyaltyCoins}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-kuriftu-green text-white rounded-md"
                  >
                    {isEditing ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}