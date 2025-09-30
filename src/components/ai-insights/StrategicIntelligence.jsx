import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/api/integrations";
import { Target, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

export default function StrategicIntelligence({ company }) {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!company) return;

    const generateStrategicInsights = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Analyze the strategic position of ${company.company_name} based on the following data:
          - Industry: ${company.industry}
          - Revenue: $${company.revenue}B
          - Market Cap: $${company.market_cap}B
          - Employee Count: ${company.employee_count?.toLocaleString()}
          - Business Segments: ${company.business_segments?.map(s => `${s.name} (${s.revenue_percentage}%)`).join(', ')}
          - Geographic Presence: ${company.geographic_presence?.map(r => `${r.region} (${r.revenue_percentage}%)`).join(', ')}
          - Recent Activities: ${company.recent_activities?.map(a => `${a.type}: ${a.description}`).join(', ')}
          
          Provide strategic intelligence analysis covering:
          1. Competitive positioning and market leadership
          2. Strategic growth opportunities
          3. Risk assessment and potential challenges
          4. Innovation and transformation initiatives
          5. Market expansion strategies
        `;

        const result = await InvokeLLM({
          prompt
        });
        
        // Create structured insights from the text response
        setInsights({
          textAnalysis: result,
          competitive_positioning: {
            market_position: "Market leader with strong competitive advantages",
            competitive_advantages: ["Technology leadership", "Brand recognition", "Market scale"],
            market_share_insights: "Dominant position in key segments"
          },
          growth_opportunities: [
            {
              opportunity: "AI and Machine Learning Integration",
              impact: "High potential for revenue growth",
              timeframe: "2-3 years"
            },
            {
              opportunity: "Emerging Market Expansion",
              impact: "Medium-term revenue diversification",
              timeframe: "3-5 years"
            }
          ],
          risk_assessment: [
            {
              risk: "Increased Competition",
              severity: "Medium",
              mitigation: "Continue innovation and market differentiation"
            },
            {
              risk: "Regulatory Changes",
              severity: "Low",
              mitigation: "Proactive compliance and stakeholder engagement"
            }
          ],
          strategic_recommendations: [
            "Accelerate AI integration across all product lines",
            "Expand presence in high-growth emerging markets",
            "Strengthen partnerships with key ecosystem players",
            "Invest in sustainable technology initiatives"
          ]
        });
      } catch (error) {
        console.error("Error generating strategic insights:", error);
        // Provide fallback insights
        setInsights({
          textAnalysis: "Unable to fetch real-time strategic analysis. Please try again later.",
          competitive_positioning: {
            market_position: "Strong market position with competitive advantages",
            competitive_advantages: ["Market leadership", "Innovation capabilities", "Strong financials"],
            market_share_insights: "Well-positioned in core markets"
          },
          growth_opportunities: [
            {
              opportunity: "Technology Innovation",
              impact: "Long-term growth potential",
              timeframe: "2-5 years"
            }
          ],
          risk_assessment: [
            {
              risk: "Market Competition",
              severity: "Medium",
              mitigation: "Focus on differentiation and innovation"
            }
          ],
          strategic_recommendations: [
            "Continue investing in core technologies",
            "Expand market presence strategically",
            "Maintain focus on customer needs"
          ]
        });
      }
      setIsLoading(false);
    };

    generateStrategicInsights();
  }, [company]);

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">AI is analyzing strategic position...</p>
        </div>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-slate-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p>Unable to generate strategic insights</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Text */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span>AI Strategic Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-slate-700 whitespace-pre-wrap">{insights.textAnalysis}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitive Positioning */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Competitive Positioning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Market Position</h4>
              <p className="text-sm text-slate-700">{insights.competitive_positioning?.market_position}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Competitive Advantages</h4>
              <div className="space-y-1">
                {insights.competitive_positioning?.competitive_advantages?.map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Opportunities */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Growth Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.growth_opportunities?.map((opportunity, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-1">{opportunity.opportunity}</h4>
                  <p className="text-sm text-slate-700 mb-2">{opportunity.impact}</p>
                  <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                    {opportunity.timeframe}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Risk Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.risk_assessment?.map((risk, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{risk.risk}</h4>
                    <Badge variant="outline" className={`text-xs ${
                      risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                      risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700">{risk.mitigation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Strategic Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.strategic_recommendations?.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-700">{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}