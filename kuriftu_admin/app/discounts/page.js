import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Tag, Calendar, Plus, Edit, Trash, Check, Users, Percent } from "lucide-react"

export default function DiscountsOffers() {
  // Mock data for discounts and offers
  const discountsOffers = [
    {
      id: 1,
      title: "Weekend Getaway",
      description: "20% off on all room bookings for Pioneer members",
      discountType: "Percentage",
      discountValue: "20%",
      applicableTo: "Room Bookings",
      membershipTier: "Pioneer",
      startDate: "2023-04-15",
      endDate: "2023-04-17",
      status: "Active",
      redemptions: 125,
    },
    {
      id: 2,
      title: "Spa Special",
      description: "Buy one get one free on all spa treatments",
      discountType: "BOGO",
      discountValue: "Buy 1 Get 1 Free",
      applicableTo: "Spa Treatments",
      membershipTier: "All Tiers",
      startDate: "2023-04-20",
      endDate: "2023-04-25",
      status: "Upcoming",
      redemptions: 0,
    },
    {
      id: 3,
      title: "Birthday Month",
      description: "Free dinner for members during their birthday month",
      discountType: "Free Item",
      discountValue: "Free Dinner",
      applicableTo: "Restaurant",
      membershipTier: "All Tiers",
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      status: "Upcoming",
      redemptions: 0,
    },
    {
      id: 4,
      title: "Early Bird Booking",
      description: "15% off on bookings made 30 days in advance",
      discountType: "Percentage",
      discountValue: "15%",
      applicableTo: "Room Bookings",
      membershipTier: "All Tiers",
      startDate: "2023-04-01",
      endDate: "2023-06-30",
      status: "Active",
      redemptions: 87,
    },
    {
      id: 5,
      title: "Spring Break Special",
      description: "25% off on adventure activities",
      discountType: "Percentage",
      discountValue: "25%",
      applicableTo: "Adventure Activities",
      membershipTier: "Adventurer, Pioneer",
      startDate: "2023-03-15",
      endDate: "2023-04-15",
      status: "Expired",
      redemptions: 203,
    },
    {
      id: 6,
      title: "Loyalty Appreciation",
      description: "10% off on all services for members over 1 year",
      discountType: "Percentage",
      discountValue: "10%",
      applicableTo: "All Services",
      membershipTier: "All Tiers",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
      status: "Active",
      redemptions: 156,
    },
  ]

  // Function to get badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600"
      case "Upcoming":
        return "bg-blue-100 text-blue-600"
      case "Expired":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Function to get badge color based on discount type
  const getDiscountTypeBadgeColor = (type) => {
    switch (type) {
      case "Percentage":
        return "bg-purple-100 text-purple-600"
      case "BOGO":
        return "bg-yellow-100 text-yellow-600"
      case "Free Item":
        return "bg-pink-100 text-pink-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Discounts & Offers</h1>
          <p className="text-gray-500">Manage situational discounts and membership offers</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create New Offer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Offers</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Offers</p>
              <p className="text-2xl font-semibold">2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-kuriftu-gold/20 p-3 rounded-full mr-4">
              <Check className="w-5 h-5 text-kuriftu-gold" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-2xl font-semibold">571</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discounts and Offers */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">All Discounts & Offers</CardTitle>
          <CardDescription>View and manage all promotional offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discountsOffers.map((offer) => (
              <div key={offer.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{offer.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeColor(offer.status)}`}>
                      {offer.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs flex items-center ${getDiscountTypeBadgeColor(offer.discountType)}`}
                    >
                      <Percent className="w-3 h-3 mr-1" />
                      {offer.discountValue}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {offer.membershipTier}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      {offer.redemptions} redemptions
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 flex justify-between">
                  <span className="text-sm text-gray-500">Applies to: {offer.applicableTo}</span>
                  <div className="flex gap-2">
                    <button className="text-kuriftu-green">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Offer Form (Hidden by default, would be shown in a modal) */}
      <div className="hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Create New Offer</CardTitle>
            <CardDescription>Set up a new discount or special offer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Offer Title</label>
                <input type="text" placeholder="e.g., Weekend Getaway" className="w-full p-2 border rounded-md" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  placeholder="Describe the offer..."
                  className="w-full p-2 border rounded-md"
                  rows={3}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                    <option>Buy One Get One</option>
                    <option>Free Item</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value</label>
                  <input type="text" placeholder="e.g., 20%" className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Applicable To</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Room Bookings</option>
                  <option>Spa Treatments</option>
                  <option>Restaurant</option>
                  <option>Adventure Activities</option>
                  <option>All Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Membership Tier</label>
                <select className="w-full p-2 border rounded-md">
                  <option>All Tiers</option>
                  <option>Explorer</option>
                  <option>Adventurer</option>
                  <option>Pioneer</option>
                  <option>Adventurer, Pioneer</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button className="px-4 py-2 border rounded-md">Cancel</button>
                <button className="px-4 py-2 bg-kuriftu-green text-white rounded-md">Create Offer</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
