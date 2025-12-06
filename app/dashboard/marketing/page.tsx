import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Plus,
} from "lucide-react";

export default function MarketingPage() {
  const stats = [
    {
      title: "Website Visitors",
      value: "12,543",
      change: "+23.5%",
      icon: Eye,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: MousePointerClick,
    },
    {
      title: "Total Signups",
      value: "402",
      change: "+18.2%",
      icon: Users,
    },
    {
      title: "Growth Rate",
      value: "24%",
      change: "+5.1%",
      icon: TrendingUp,
    },
  ];

  const campaigns = [
    {
      name: "LinkedIn Outreach",
      channel: "Social Media",
      status: "Active",
      reach: "15,000",
      conversions: 45,
    },
    {
      name: "Product Hunt Launch",
      channel: "PR",
      status: "Scheduled",
      reach: "50,000+",
      conversions: 0,
    },
    {
      name: "Content Marketing",
      channel: "SEO",
      status: "Active",
      reach: "8,000",
      conversions: 120,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Marketing & Analytics
          </h1>
          <p className="mt-1 text-gray-600">
            Track campaigns, growth metrics, and customer acquisition
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>
              Your marketing campaigns and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campaigns.map((campaign, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <p className="text-sm text-gray-600">{campaign.channel}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                    <p className="mt-1 text-sm text-gray-600">
                      {campaign.reach} reach · {campaign.conversions} conversions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Marketing Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900">
                  📈 Growth Opportunity
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Your conversion rate is 40% higher on LinkedIn. Consider
                  increasing your budget there for maximum ROI.
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900">
                  💡 Content Suggestion
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Your audience engages most with founder story content. Share
                  your journey to attract more followers.
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900">
                  🎯 Target Audience
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Based on your best customers, focus on B2B SaaS founders aged
                  25-40 in tech hubs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

