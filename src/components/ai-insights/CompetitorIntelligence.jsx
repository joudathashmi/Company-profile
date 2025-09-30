import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/api/integrations";
import { Target, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export default function CompetitorIntelligence({ company }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!company) return;

    const generateCompetitorAnalysis = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Provide comprehensive competitor intelligence analysis for ${company.company_name} in the ${company.industry} industry:
          
          Company Context:
          - Market Cap: $${company.market_cap}B
          - Revenue: $${company.revenue}B
          - Key Business Segments: ${company.business_segments?.map(s => s.name).join(', ')}
          - Geographic Presence: ${company.geographic_presence?.map(r => r.region).join(', ')}
          
          Analyze:
          1. Direct competitors and market positioning
          2. Competitive advantages and differentiators
          3. Market share dynamics and trends
          4. Competitive threats and opportunities
          5. Strategic responses to competitive pressure
          6. Innovation race and technology competition
        `;

        const result = await InvokeLLM({
          prompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              direct_competitors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    market_cap: { type: "string" },
                    competitive_position: { type: "string" },
                    key_strengths: { type: "array", items: { type: "string" } },
                    market_overlap: { type: "string" }
                  }
                }
              },
              competitive_positioning: {
                type: "object",
                properties: {
                  market_leader_status: { type: "string" },
                  unique_value_propositions: { type: "array", items: { type: "string" } },
                  competitive_moats: { type: "array", items: { type: "string" } }
                }
              },
              market_dynamics: {
                type: "object",
                properties: {
                  market_share_trend: { type: "string" },
                  growth_rate_vs_competitors: { type: "string" },
                  pricing_strategy: { type: "string" }
                }
              },
              threats_opportunities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    description: { type: "string" },
                    impact_level: { type: "string" },
                    timeline: { type: "string" }
                  }
                }
              },
              strategic_recommendations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    strategy: { type: "string" },
                    rationale: { type: "string" },
                    priority: { type: "string" }
                  }
                }
              }
            }
          }
        });
        
        setAnalysis(result);
      } catch (error) {
        console.error("Error generating competitor analysis:", error);
      }
      setIsLoading(false);
    };

    generateCompetitorAnalysis();
  }, [company]);

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">AI is analyzing competitive landscape...</p>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-slate-600">
          <Target className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p>Unable to generate competitor analysis</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Direct Competitors */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-600" />
            <span>Direct Competitors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.direct_competitors?.map((competitor, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{competitor.name}</h4>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {competitor.market_cap}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 mb-3">{competitor.competitive_position}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-600">Key Strengths:</p>
                  {competitor.key_strengths?.map((strength, sIndex) => (
                    <div key={sIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-slate-700">{strength}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2 italic">Overlap: {competitor.market_overlap}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitive Positioning */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Competitive Position</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Market Leadership Status</h4>
              <p className="text-sm text-slate-700">{analysis.competitive_positioning?.market_leader_status}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Unique Value Propositions</h4>
              <div className="space-y-1">
                {analysis.competitive_positioning?.unique_value_propositions?.map((prop, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{prop}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Competitive Moats</h4>
              <div className="space-y-1">
                {analysis.competitive_positioning?.competitive_moats?.map((moat, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{moat}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Dynamics */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Market Dynamics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Market Share Trend</h4>
              <p className="text-sm text-slate-700">{analysis.market_dynamics?.market_share_trend}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Growth vs Competitors</h4>
              <p className="text-sm text-slate-700">{analysis.market_dynamics?.growth_rate_vs_competitors}</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Pricing Strategy</h4>
              <p className="text-sm text-slate-700">{analysis.market_dynamics?.pricing_strategy}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threats and Opportunities */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Competitive Threats & Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.threats_opportunities?.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                item.type === 'Threat' ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${
                    item.type === 'Threat' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.type}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${
                    item.impact_level === 'High' ? 'bg-red-100 text-red-800' :
                    item.impact_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.impact_level} Impact
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 mb-2">{item.description}</p>
                <p className="text-xs text-slate-500">Timeline: {item.timeline}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span>Strategic Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.strategic_recommendations?.map((rec, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{rec.strategy}</h4>
                  <Badge className={`text-xs ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm text-slate-700">{rec.rationale}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}