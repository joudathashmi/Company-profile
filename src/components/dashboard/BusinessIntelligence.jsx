import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Users, Briefcase } from "lucide-react";

export default function BusinessIntelligence({ company }) {
  const businessSegmentData = company?.business_segments || [
    { name: "Cloud Computing", revenue_percentage: 35, value: 35 },
    { name: "Software", revenue_percentage: 28, value: 28 },
    { name: "Hardware", revenue_percentage: 20, value: 20 },
    { name: "Services", revenue_percentage: 17, value: 17 }
  ];

  const geographicData = company?.geographic_presence || [
    { region: "North America", revenue_percentage: 45 },
    { region: "Europe", revenue_percentage: 25 },
    { region: "Asia Pacific", revenue_percentage: 20 },
    { region: "Latin America", revenue_percentage: 6 },
    { region: "Middle East & Africa", revenue_percentage: 4 }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Corporate Profile */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Corporate Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Operates diversified technology solutions across multiple business segments with strong market positioning.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Focuses on innovation-driven growth with emphasis on cloud computing and enterprise software solutions.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Maintains strong global presence with strategic investments in emerging markets and technologies.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Committed to sustainable business practices with industry-leading ESG initiatives and corporate governance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Intelligence */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Market Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Market leader in enterprise cloud solutions with significant competitive advantages and pricing power.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Strong recurring revenue base through subscription models and long-term enterprise contracts.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Consistent track record of strategic acquisitions to enhance capabilities and market reach.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-700">
                Well-positioned for future growth with investments in AI, machine learning, and digital transformation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Segment */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Revenue by Business Segment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={businessSegmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="revenue_percentage"
                  label={({ name, revenue_percentage }) => `${name} ${revenue_percentage}%`}
                  labelLine={false}
                >
                  {businessSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Revenue */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Revenue by Geographic Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="region" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue_percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}