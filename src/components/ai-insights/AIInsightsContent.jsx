import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, Building, Users, DollarSign, MessageSquare } from "lucide-react";
import StrategicIntelligence from "./StrategicIntelligence";
import StockPerformance from "./StockPerformance";
import LatestInsights from "./LatestInsights";
import CompetitorIntelligence from "./CompetitorIntelligence";
import ExecutiveInsights from "./ExecutiveInsights";
import InvestmentOpportunities from "./InvestmentOpportunities";
import AIInteractiveChat from "./AIInteractiveChat";

export default function AIInsightsContent({ company }) {
  const [activeTab, setActiveTab] = useState("strategic");

  if (!company) return null;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Insights for {company.company_name}</h1>
        <p className="text-slate-600">Powered by advanced AI analysis and real-time market intelligence</p>
      </div>

      {/* AI Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-white border border-purple-100 rounded-xl">
          <TabsTrigger 
            value="strategic" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
          >
            <Target className="w-4 h-4" />
            <span>Strategic</span>
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Stock</span>
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <Building className="w-4 h-4" />
            <span>Latest</span>
          </TabsTrigger>
          <TabsTrigger 
            value="competitors" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-red-50 data-[state=active]:text-red-700"
          >
            <Target className="w-4 h-4" />
            <span>Competitors</span>
          </TabsTrigger>
          <TabsTrigger 
            value="executives" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
          >
            <Users className="w-4 h-4" />
            <span>Executives</span>
          </TabsTrigger>
          <TabsTrigger 
            value="investment" 
            className="flex items-center space-x-2 py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
          >
            <DollarSign className="w-4 h-4" />
            <span>Investment</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategic" className="space-y-6 mt-8">
          <StrategicIntelligence company={company} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-8">
          <StockPerformance company={company} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-8">
          <LatestInsights company={company} />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6 mt-8">
          <CompetitorIntelligence company={company} />
        </TabsContent>

        <TabsContent value="executives" className="space-y-6 mt-8">
          <ExecutiveInsights company={company} />
        </TabsContent>

        <TabsContent value="investment" className="space-y-6 mt-8">
          <InvestmentOpportunities company={company} />
        </TabsContent>
      </Tabs>

      {/* Interactive AI Chat - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <AIInteractiveChat company={company} />
      </div>
    </div>
  );
}