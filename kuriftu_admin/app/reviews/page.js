import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card.js"
import { Search, Filter, AlertTriangle, CheckCircle, XCircle, MessageSquare, RefreshCw } from "lucide-react"

export default function ReviewAnalysis() {
  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      source: "Google",
      summary: "Multiple guests complained about slow check-in process during peak hours",
      sentiment: "Negative",
      date: "2023-04-10",
      priority: "High",
      status: "Pending",
      details:
        "Several guests mentioned waiting more than 30 minutes to check in during the weekend. Staff appeared overwhelmed during peak check-in times (4-6 PM).",
    },
    {
      id: 2,
      source: "TripAdvisor",
      summary: "Issues with room cleanliness reported by 3 guests in the past week",
      sentiment: "Negative",
      date: "2023-04-08",
      priority: "Medium",
      status: "In Progress",
      details:
        "Three separate reviews mentioned finding hair in the bathroom and dust on furniture. Rooms affected were 203, 215, and 224.",
    },
    {
      id: 3,
      source: "Booking.com",
      summary: "Several complaints about Wi-Fi connectivity in the north wing rooms",
      sentiment: "Negative",
      date: "2023-04-05",
      priority: "Medium",
      status: "Resolved",
      details:
        "Five guests reported intermittent Wi-Fi issues in rooms 301-315. Signal strength appears to be weak in the north wing of the property.",
    },
    {
      id: 4,
      source: "Google",
      summary: "Positive feedback about the new breakfast menu and service",
      sentiment: "Positive",
      date: "2023-04-09",
      priority: "Low",
      status: "Acknowledged",
      details:
        "Multiple guests praised the expanded breakfast options and attentive service from the morning staff. Special mentions for the local coffee and pastry selection.",
    },
    {
      id: 5,
      source: "Facebook",
      summary: "Complaints about noise from nearby construction affecting guest experience",
      sentiment: "Negative",
      date: "2023-04-07",
      priority: "High",
      status: "In Progress",
      details:
        "Several guests mentioned being disturbed by construction noise starting at 7 AM. Rooms facing the east side of the property are most affected.",
    },
    {
      id: 6,
      source: "Expedia",
      summary: "Multiple guests praised the spa services and treatments",
      sentiment: "Positive",
      date: "2023-04-06",
      priority: "Low",
      status: "Acknowledged",
      details:
        "Guests consistently rated the spa services 4.8/5 or higher. Particular praise for the hot stone massage and facial treatments.",
    },
  ]

  // Function to get badge color based on sentiment
  const getSentimentBadgeColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-100 text-green-600"
      case "Negative":
        return "bg-red-100 text-red-600"
      case "Neutral":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Function to get badge color based on priority
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600"
      case "Medium":
        return "bg-yellow-100 text-yellow-600"
      case "Low":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Function to get badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600"
      case "In Progress":
        return "bg-blue-100 text-blue-600"
      case "Resolved":
        return "bg-green-100 text-green-600"
      case "Acknowledged":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Function to get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return AlertTriangle
      case "In Progress":
        return RefreshCw
      case "Resolved":
        return CheckCircle
      case "Acknowledged":
        return MessageSquare
      default:
        return XCircle
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">AI Review Analysis</h1>
          <p className="text-gray-500">AI-powered analysis and summarization of guest reviews</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Analysis
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-semibold">1,245</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Reviews</p>
              <p className="text-2xl font-semibold">876</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative Reviews</p>
              <p className="text-2xl font-semibold">369</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Action</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <select className="border px-4 py-2 rounded-md">
            <option>All Sources</option>
            <option>Google</option>
            <option>TripAdvisor</option>
            <option>Booking.com</option>
            <option>Expedia</option>
            <option>Facebook</option>
          </select>
          <select className="border px-4 py-2 rounded-md">
            <option>All Sentiments</option>
            <option>Positive</option>
            <option>Negative</option>
            <option>Neutral</option>
          </select>
          <button className="border px-4 py-2 rounded-md flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">AI-Summarized Reviews</CardTitle>
          <CardDescription>Reviews analyzed and summarized by our AI system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => {
              const StatusIcon = getStatusIcon(review.status)

              return (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                    <div className="flex items-center mb-2 md:mb-0">
                      <span className="font-medium text-gray-700 mr-3">Source: {review.source}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentBadgeColor(review.sentiment)}`}
                      >
                        {review.sentiment}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(review.priority)}`}
                      >
                        {review.priority} Priority
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeColor(review.status)}`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {review.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{review.summary}</h3>
                  <p className="text-gray-600 text-sm">{review.details}</p>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <button className="text-kuriftu-green text-sm font-medium">Mark as Resolved</button>
                      <button className="text-gray-500 text-sm font-medium">Assign</button>
                    </div>
                    <button className="text-kuriftu-gold text-sm font-medium">View Original</button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">Showing 1 to 6 of 1,245 results</div>
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
