import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import {
  Coins,
  TrendingUp,
  TrendingDown,
  BarChart,
  Download,
  Settings,
  RefreshCw,
  ArrowRight,
  Plus,
} from "lucide-react"

export default function LoyaltyCoins() {
  // Mock data for loyalty coin stats
  const coinStats = [
    {
      title: "Total Coins Mined",
      value: "45,678",
      change: "+12%",
      icon: Coins,
      color: "bg-kuriftu-gold/20 text-kuriftu-gold",
    },
    {
      title: "Coins Earned This Month",
      value: "5,432",
      change: "+8%",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Coins Redeemed This Month",
      value: "2,345",
      change: "+15%",
      icon: TrendingDown,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Average Coins per Member",
      value: "37",
      change: "+3%",
      icon: BarChart,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      member: "John Doe",
      membershipTier: "Pioneer",
      type: "Earned",
      amount: 250,
      source: "Room Booking",
      date: "2023-04-10",
    },
    {
      id: 2,
      member: "Jane Smith",
      membershipTier: "Adventurer",
      type: "Redeemed",
      amount: 500,
      source: "Spa Treatment",
      date: "2023-04-09",
    },
    {
      id: 3,
      member: "Michael Johnson",
      membershipTier: "Pioneer",
      type: "Mined",
      amount: 100,
      source: "Mining Activity",
      date: "2023-04-08",
    },
    {
      id: 4,
      member: "Sarah Williams",
      membershipTier: "Explorer",
      type: "Earned",
      amount: 75,
      source: "Restaurant Bill",
      date: "2023-04-07",
    },
    {
      id: 5,
      member: "David Brown",
      membershipTier: "Adventurer",
      type: "Redeemed",
      amount: 300,
      source: "Room Upgrade",
      date: "2023-04-06",
    },
  ]

  // Mock data for redemption options
  const redemptionOptions = [
    {
      id: 1,
      title: "Room Upgrade",
      description: "Upgrade to the next room category",
      coinsCost: 500,
      popularity: "High",
    },
    {
      id: 2,
      title: "Spa Treatment",
      description: "60-minute massage or facial",
      coinsCost: 750,
      popularity: "Medium",
    },
    {
      id: 3,
      title: "Dinner for Two",
      description: "Complimentary dinner at our restaurant",
      coinsCost: 1000,
      popularity: "High",
    },
    {
      id: 4,
      title: "Airport Transfer",
      description: "Free round-trip airport transfer",
      coinsCost: 600,
      popularity: "Low",
    },
  ]

  // Function to get badge color based on transaction type
  const getTransactionBadgeColor = (type) => {
    switch (type) {
      case "Earned":
        return "bg-green-100 text-green-600"
      case "Redeemed":
        return "bg-blue-100 text-blue-600"
      case "Mined":
        return "bg-kuriftu-gold/20 text-kuriftu-gold"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Loyalty Coins</h1>
          <p className="text-gray-500">Manage blockchain-based loyalty coins and redemptions</p>
        </div>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-md flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Coin Settings
          </button>
          <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Blockchain
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {coinStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="ml-2 text-sm text-green-500 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
              <button className="text-sm text-kuriftu-green font-medium flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
            <CardDescription>Recent loyalty coin transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Member</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{transaction.member}</div>
                        <div className="text-xs text-gray-500">{transaction.membershipTier}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getTransactionBadgeColor(transaction.type)}`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Coins className="w-4 h-4 text-kuriftu-gold mr-1" />
                          <span>{transaction.amount}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{transaction.source}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 text-kuriftu-green font-medium flex items-center">
              View All Transactions
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </CardContent>
        </Card>

        {/* Blockchain Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Blockchain Status</CardTitle>
            <CardDescription>Current status of the loyalty blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Blockchain Active</p>
                  <p className="text-xs text-gray-500">Last synced: 5 minutes ago</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Blocks</span>
                  <span className="font-medium">12,345</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mining Rate</span>
                  <span className="font-medium">0.5 coins/hour</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active Miners</span>
                  <span className="font-medium">156 Pioneers</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Network Health</span>
                  <span className="font-medium text-green-500">Excellent</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-kuriftu-green/10 text-kuriftu-green p-2 rounded-md text-sm font-medium">
                    Adjust Mining Rate
                  </button>
                  <button className="bg-kuriftu-gold/10 text-kuriftu-gold p-2 rounded-md text-sm font-medium">
                    View Blockchain
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redemption Options */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Redemption Options</CardTitle>
            <button className="bg-kuriftu-green text-white px-3 py-1.5 rounded-md text-sm flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </button>
          </div>
          <CardDescription>Available options for loyalty coin redemption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {redemptionOptions.map((option) => (
              <div key={option.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{option.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      option.popularity === "High"
                        ? "bg-green-100 text-green-600"
                        : option.popularity === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {option.popularity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-kuriftu-gold">
                    <Coins className="w-4 h-4 mr-1" />
                    <span className="font-medium">{option.coinsCost}</span>
                  </div>
                  <button className="text-kuriftu-green text-sm font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
