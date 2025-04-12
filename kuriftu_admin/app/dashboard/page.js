"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Star, Award, Coins, Tag, TrendingUp, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Members",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Average Rating",
      value: "4.7",
      change: "+0.3",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Active Pioneers",
      value: "156",
      change: "+8%",
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Coins Mined",
      value: "45,678",
      change: "+23%",
      icon: Coins,
      color: "bg-kuriftu-gold/20 text-kuriftu-gold",
    },
  ]

  // Mock data for recent negative reviews
  const negativeReviews = [
    {
      id: 1,
      source: "Google",
      summary: "Multiple guests complained about slow check-in process during peak hours",
      sentiment: "Negative",
      date: "2023-04-10",
      priority: "High",
    },
    {
      id: 2,
      source: "TripAdvisor",
      summary: "Issues with room cleanliness reported by 3 guests in the past week",
      sentiment: "Negative",
      date: "2023-04-08",
      priority: "Medium",
    },
    {
      id: 3,
      source: "Booking.com",
      summary: "Several complaints about Wi-Fi connectivity in the north wing rooms",
      sentiment: "Negative",
      date: "2023-04-05",
      priority: "Medium",
    },
  ]

  // Mock data for membership distribution
  const membershipDistribution = [
    { tier: "Explorer", count: 876, color: "bg-green-500" },
    { tier: "Adventurer", count: 202, color: "bg-blue-500" },
    { tier: "Pioneer", count: 156, color: "bg-purple-500" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome to Kuriftu Resorts Membership & Loyalty Program</p>
        </div>
        <div className="bg-kuriftu-green text-white px-4 py-2 rounded-md">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
        {/* AI Review Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">AI Review Analysis</CardTitle>
              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />3 Issues Need Attention
              </div>
            </div>
            <CardDescription>AI-summarized negative reviews requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {negativeReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Source: {review.source}</span>
                      <span className="ml-4 text-sm text-gray-500">{review.date}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : review.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {review.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-600">{review.summary}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-kuriftu-green font-medium flex items-center">
              View All Reviews
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </CardContent>
        </Card>

        {/* Membership Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Membership Distribution</CardTitle>
            <CardDescription>Current distribution of membership tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membershipDistribution.map((tier) => (
                <div key={tier.tier} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{tier.tier}</span>
                    <span className="text-gray-500">{tier.count} members</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${tier.color} h-2.5 rounded-full`}
                      style={{ width: `${(tier.count / 1234) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-kuriftu-green/10 text-kuriftu-green p-2 rounded-md text-sm font-medium">
                  Export Data
                </button>
                <button className="bg-kuriftu-gold/10 text-kuriftu-gold p-2 rounded-md text-sm font-medium">
                  Send Promotion
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Upcoming Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
            <CardDescription>Latest membership activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">15 new members joined</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">5 members upgraded to Adventurer</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Coins className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">2,500 loyalty coins redeemed</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Tag className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Weekend discount activated</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Upcoming Promotions</CardTitle>
            <CardDescription>Scheduled discounts and offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-kuriftu-green">Weekend Getaway</h4>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">20% off on all room bookings for Pioneer members</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Apr 15 - Apr 17</span>
                  <span>125 redemptions</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-kuriftu-gold">Spa Special</h4>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">Upcoming</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Buy one get one free on all spa treatments</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Apr 20 - Apr 25</span>
                  <span>0 redemptions</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-kuriftu-pink">Birthday Month</h4>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">Upcoming</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Free dinner for members during their birthday month</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>May 1 - May 31</span>
                  <span>0 redemptions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
