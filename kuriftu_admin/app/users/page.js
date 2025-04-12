import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.js"
import { Search, Filter, Download, Plus, MoreHorizontal, Award, Coins } from "lucide-react"

export default function UserManagement() {
  // Mock data for users
  const users = [
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
  ]

  // Function to get badge color based on membership tier
  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case "Explorer":
        return "bg-green-100 text-green-600"
      case "Adventurer":
        return "bg-blue-100 text-blue-600"
      case "Pioneer":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">User Management</h1>
          <p className="text-gray-500">Manage membership users and their details</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
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
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-md flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="border px-4 py-2 rounded-md flex items-center">
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
              <p className="text-2xl font-semibold">1,234</p>
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
              <p className="text-2xl font-semibold">1,198</p>
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
              <p className="text-2xl font-semibold">45,678</p>
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
                {users.map((user) => (
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
                    <td className="py-3 px-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Showing 1 to 6 of 1,234 results</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-kuriftu-green text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">2</button>
              <button className="px-3 py-1 border rounded-md text-sm">3</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
