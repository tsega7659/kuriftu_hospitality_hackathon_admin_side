import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { MessageCircle, Search, Filter, Star, ThumbsUp, ThumbsDown, Download } from "lucide-react"

export default function Feedback() {
  // Mock data for feedback
  const feedbackItems = [
    {
      id: 1,
      member: "John Doe",
      membershipTier: "Pioneer",
      message:
        "I love the new loyalty program! The ability to mine coins is a great incentive for me to stay more often. The Pioneer benefits are excellent.",
      rating: 5,
      sentiment: "Positive",
      date: "2023-04-10",
      category: "Loyalty Program",
    },
    {
      id: 2,
      member: "Jane Smith",
      membershipTier: "Adventurer",
      message:
        "The membership tiers are confusing. It's not clear what I need to do to upgrade from Adventurer to Pioneer. Please make this more transparent.",
      rating: 3,
      sentiment: "Neutral",
      date: "2023-04-08",
      category: "Membership Tiers",
    },
    {
      id: 3,
      member: "Michael Johnson",
      membershipTier: "Explorer",
      message:
        "I think the loyalty coins are a great idea, but it takes too long to earn enough for meaningful rewards. Consider increasing the earning rate for Explorer members.",
      rating: 3,
      sentiment: "Neutral",
      date: "2023-04-05",
      category: "Loyalty Coins",
    },
    {
      id: 4,
      member: "Sarah Williams",
      membershipTier: "Pioneer",
      message:
        "The weekend getaway discount was amazing! I saved a lot on my recent stay. Looking forward to more offers like this.",
      rating: 5,
      sentiment: "Positive",
      date: "2023-04-03",
      category: "Discounts & Offers",
    },
    {
      id: 5,
      member: "David Brown",
      membershipTier: "Adventurer",
      message:
        "I'm disappointed that some benefits are only available to Pioneer members. It feels like there's too big a gap between Adventurer and Pioneer tiers.",
      rating: 2,
      sentiment: "Negative",
      date: "2023-04-01",
      category: "Membership Tiers",
    },
  ]

  // Function to get badge color based on sentiment
  const getSentimentBadgeColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-100 text-green-600"
      case "Neutral":
        return "bg-blue-100 text-blue-600"
      case "Negative":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

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

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />,
      )
    }
    return stars
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Feedback</h1>
          <p className="text-gray-500">Review and analyze member feedback</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Feedback
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Feedback</p>
              <p className="text-2xl font-semibold">245</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Feedback</p>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold">4.2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <ThumbsDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative Feedback</p>
              <p className="text-2xl font-semibold">32</p>
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
            placeholder="Search feedback..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <select className="border px-4 py-2 rounded-md">
            <option>All Categories</option>
            <option>Loyalty Program</option>
            <option>Membership Tiers</option>
            <option>Loyalty Coins</option>
            <option>Discounts & Offers</option>
          </select>
          <select className="border px-4 py-2 rounded-md">
            <option>All Sentiments</option>
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>
          <button className="border px-4 py-2 rounded-md flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Feedback Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Feedback by Category</CardTitle>
            <CardDescription>Distribution of feedback across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Loyalty Program</span>
                  <span className="text-gray-500">98 feedback items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-kuriftu-green h-2.5 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Membership Tiers</span>
                  <span className="text-gray-500">65 feedback items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-kuriftu-green h-2.5 rounded-full" style={{ width: "27%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Loyalty Coins</span>
                  <span className="text-gray-500">42 feedback items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-kuriftu-green h-2.5 rounded-full" style={{ width: "17%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Discounts & Offers</span>
                  <span className="text-gray-500">40 feedback items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-kuriftu-green h-2.5 rounded-full" style={{ width: "16%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Sentiment Analysis</CardTitle>
            <CardDescription>Breakdown of feedback sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold">4.2</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                </div>
                {/* This would be a donut chart in a real implementation */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-200">
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 64%, 0 64%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500"
                    style={{ clipPath: "polygon(0 64%, 100% 64%, 100% 87%, 0 87%)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-red-500"
                    style={{ clipPath: "polygon(0 87%, 100% 87%, 100% 100%, 0 100%)" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Positive</span>
                </div>
                <span className="font-medium">64%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Neutral</span>
                </div>
                <span className="font-medium">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Negative</span>
                </div>
                <span className="font-medium">13%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Recent Feedback</CardTitle>
          <CardDescription>Latest feedback from members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackItems.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <div className="mb-2 md:mb-0">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">{feedback.member}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getTierBadgeColor(feedback.membershipTier)}`}
                      >
                        {feedback.membershipTier}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{new Date(feedback.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex">{renderStars(feedback.rating)}</div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSentimentBadgeColor(feedback.sentiment)}`}
                    >
                      {feedback.sentiment}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {feedback.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{feedback.message}</p>
                <div className="mt-3 pt-3 border-t flex justify-end gap-2">
                  <button className="text-kuriftu-green text-sm font-medium">Reply</button>
                  <button className="text-gray-500 text-sm font-medium">Archive</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">Showing 1 to 5 of 245 results</div>
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
