import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Edit, Trash, Plus, Award, Users, ArrowUp, ArrowDown, Sparkles } from "lucide-react"

export default function MembershipTiers() {
  // Mock data for membership tiers
  const membershipTiers = [
    {
      id: 1,
      name: "Explorer",
      description: "Entry-level membership tier for new guests",
      members: 876,
      benefits: [
        "5% discount on room bookings",
        "Welcome drink on arrival",
        "Early check-in (subject to availability)",
        "Earn 1 loyalty coin per $10 spent",
      ],
      requirements: "No minimum spend required",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Adventurer",
      description: "Mid-tier membership for frequent guests",
      members: 202,
      benefits: [
        "10% discount on room bookings",
        "Welcome drink and fruit basket on arrival",
        "Early check-in and late check-out",
        "15% discount on spa treatments",
        "Earn 1.5 loyalty coins per $10 spent",
      ],
      requirements: "Minimum spend of $1,000 or 3 stays per year",
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Pioneer",
      description: "Top-tier membership with exclusive benefits",
      members: 156,
      benefits: [
        "15% discount on room bookings",
        "Welcome drink, fruit basket, and local gift on arrival",
        "Guaranteed early check-in and late check-out",
        "25% discount on spa treatments",
        "One complimentary dinner for two per stay",
        "Access to exclusive events",
        "Ability to mine loyalty coins",
        "Earn 2 loyalty coins per $10 spent",
      ],
      requirements: "Minimum spend of $3,000 or 5 stays per year",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Membership Tiers</h1>
          <p className="text-gray-500">Manage membership tiers and their benefits</p>
        </div>
        <button className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tier
        </button>
      </div>

      {/* Membership Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Users className="w-5 h-5 text-green-600" />
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
              <ArrowUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tier Upgrades (This Month)</p>
              <p className="text-2xl font-semibold">45</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <ArrowDown className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tier Downgrades (This Month)</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {membershipTiers.map((tier) => (
          <Card key={tier.id} className="border-t-4" style={{ borderTopColor: tier.color }}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Award className="w-6 h-6 mr-2" style={{ color: tier.color }} />
                  <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-md hover:bg-gray-100">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-gray-100">
                    <Trash className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Members</span>
                  <span className="text-sm font-medium">{tier.members}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(tier.members / 1234) * 100}%`,
                      backgroundColor: tier.color,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-kuriftu-gold" />
                  Benefits
                </h4>
                <ul className="text-sm space-y-1.5">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Requirements</h4>
                <p className="text-sm text-gray-600">{tier.requirements}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
