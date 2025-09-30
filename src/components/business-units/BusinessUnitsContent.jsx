import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

export default function BusinessUnitsContent({ company }) {
  if (!company) return null;

  // Provide default data if business_segments is undefined
  const businessSegments = company.business_segments || [
    {
      name: "Technology Services",
      revenue_percentage: 40,
      description: "Core technology and cloud services",
      key_products: ["Cloud Platform", "Enterprise Software", "AI Services"]
    },
    {
      name: "Software Solutions",
      revenue_percentage: 35,
      description: "Business productivity and collaboration tools",
      key_products: ["Office Suite", "Collaboration Tools", "Business Apps"]
    },
    {
      name: "Hardware & Devices",
      revenue_percentage: 25,
      description: "Consumer and enterprise hardware products",
      key_products: ["Devices", "Gaming", "Accessories"]
    }
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Units for {company.company_name}</h1>
        <p className="text-slate-600">A detailed breakdown of revenue streams and operational segments.</p>
      </div>

      <Card className="mb-8 shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Revenue Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={businessSegments}
                  dataKey="revenue_percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, revenue_percentage }) => `${revenue_percentage}%`}
                >
                  {businessSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSegments.map((segment, index) => (
          <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{segment.name}</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">{segment.revenue_percentage}% Revenue</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{segment.description}</p>
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center"><Package className="w-4 h-4 mr-2 text-blue-500" /> Key Products & Services</h4>
              <div className="flex flex-wrap gap-2">
                {(segment.key_products || []).map((product, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{product}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}