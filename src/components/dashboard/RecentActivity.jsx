import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowUpRight, Building, Handshake, ShoppingCart } from "lucide-react";

export default function RecentActivity({ company }) {
  const activities = company?.recent_activities || [
    {
      type: "Acquisition",
      description: "CloudTech Solutions",
      date: "2024-01-15",
      value: 2.5,
      details: "Enterprise Software"
    },
    {
      type: "Partnership",
      description: "Strategic Alliance with GlobalCorp",
      date: "2024-01-10",
      value: 0,
      details: "Joint Venture"
    },
    {
      type: "Product Launch",
      description: "Next-Gen AI Platform",
      date: "2024-01-05",
      value: 0,
      details: "Technology Innovation"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "Acquisition":
        return <Building className="w-6 h-6" />;
      case "Partnership":
        return <Handshake className="w-6 h-6" />;
      case "Product Launch":
        return <ShoppingCart className="w-6 h-6" />;
      default:
        return <ArrowUpRight className="w-6 h-6" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "Acquisition":
        return "bg-green-100 text-green-800 border-green-200";
      case "Partnership":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Product Launch":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Recent Corporate Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-xl transition-colors duration-200">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                activity.type === "Acquisition" ? "bg-green-50 text-green-600" :
                activity.type === "Partnership" ? "bg-blue-50 text-blue-600" :
                "bg-purple-50 text-purple-600"
              }`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">{activity.description}</p>
                    <p className="text-sm text-slate-600 mb-2">{activity.details}</p>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className={getActivityColor(activity.type)}>
                        {activity.type}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        {format(new Date(activity.date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  {activity.value > 0 && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">${activity.value}B</p>
                      <p className="text-sm text-slate-500">Transaction</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}