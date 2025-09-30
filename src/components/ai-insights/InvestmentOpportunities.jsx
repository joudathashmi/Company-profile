import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/api/integrations";
import { DollarSign, TrendingUp, Target, AlertCircle, Lightbulb } from "lucide-react";

export default function InvestmentOpportunities({ company }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!company) return;

    const generateInvestmentAnalysis = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Provide comprehensive investment opportunities analysis for ${company.company_name}:
          
          Company Data:
          - Market Cap: $${company.market_cap}B
          - Revenue: $${company.revenue}B
          - Industry: ${company.industry}
          - Key Metrics: P/E ${company.key_metrics?.pe_ratio}, ROE ${company.key_metrics?.roe}%
          - Recent Activities: ${company.recent_activities?.map(a => `${a.type}: ${a.description}`).join(', ')}
          - Business Segments: ${company.business_segments?.map(s => s.name).join(', ')}
          
          Analyze:
          1. Investment thesis and value proposition
          2. Growth catalysts and expansion opportunities  
          3. Valuation assessment and price targets
          4. Risk factors and mitigation strategies
          5. ESG investment considerations
          6. Portfolio fit and allocation recommendations
          7. Entry and exit strategies
        `;

        const result = await InvokeLLM({
          prompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              investment_thesis: {
                type: "object",
                properties: {
                  core_thesis: { type: "string" },
                  investment_grade: { type: "string" },
                  time_horizon: { type: "string" },
                  expected_return_range: { type: "string" }
                }
              },
              growth_catalysts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    catalyst: { type: "string" },
                    impact_potential: { type: "string" },
                    timeline: { type: "string" },
                    probability: { type: "string" }
                  }
                }
              },
              valuation_analysis: {
                type: "object",
                properties: {
                  current_valuation_assessment: { type: "string" },
                  fair_value_estimate: { type: "string" },
                  upside_scenario: { type: "string" },
                  downside_scenario: { type: "string" }
                }
              },
              risk_assessment: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    risk_factor: { type: "string" },
                    impact_level: { type: "string" },
                    probability: { type: "string" },
                    mitigation_strategy: { type: "string" }
                  }
                }
              },
              esg_considerations: {
                type: "object",
                properties: {
                  esg_score_assessment: { type: "string" },
                  sustainability_initiatives: { type: "array", items: { type: "string" } },
                  governance_strength: { type: "string" }
                }
              },
              portfolio_recommendation: {
                type: "object",
                properties: {
                  recommended_allocation: { type: "string" },
                  portfolio_role: { type: "string" },
                  investor_suitability: { type: "string" }
                }
              },
              entry_exit_strategy: {
                type: "object",
                properties: {
                  optimal_entry_points: { type: "array", items: { type: "string" } },
                  exit_triggers: { type: "array", items: { type: "string" } },
                  monitoring_metrics: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        });
        
        setAnalysis(result);
      } catch (error) {
        console.error("Error generating investment analysis:", error);
      }
      setIsLoading(false);
    };

    generateInvestmentAnalysis();
  }, [company]);

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">AI is analyzing investment opportunities...</p>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-slate-600">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p>Unable to generate investment analysis</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Investment Thesis */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <span>Investment Thesis</span>
            </div>
            <Badge className={`${
              analysis.investment_thesis?.investment_grade === 'Buy' ? 'bg-green-100 text-green-800' :
              analysis.investment_thesis?.investment_grade === 'Hold' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {analysis.investment_thesis?.investment_grade}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-2">Core Investment Thesis</h4>
            <p className="text-slate-700">{analysis.investment_thesis?.core_thesis}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Time Horizon</h4>
              <p className="text-sm text-slate-700">{analysis.investment_thesis?.time_horizon}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Expected Return</h4>
              <p className="text-sm text-slate-700">{analysis.investment_thesis?.expected_return_range}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Catalysts */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Growth Catalysts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.growth_catalysts?.map((catalyst, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{catalyst.catalyst}</h4>
                  <Badge variant="outline" className={`text-xs ${
                    catalyst.probability === 'High' ? 'bg-green-50 text-green-700' :
                    catalyst.probability === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {catalyst.probability}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 mb-2">{catalyst.impact_potential}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Timeline: {catalyst.timeline}</span>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">{catalyst.impact_potential?.includes('High') ? 'High Impact' : 'Medium Impact'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Analysis */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span>Valuation Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Current Assessment</h4>
              <p className="text-sm text-slate-700">{analysis.valuation_analysis?.current_valuation_assessment}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Fair Value Estimate</h4>
              <p className="text-sm text-slate-700 font-bold">{analysis.valuation_analysis?.fair_value_estimate}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-green-50 rounded text-center">
                <p className="text-xs font-medium text-green-700">Upside</p>
                <p className="text-sm font-bold text-green-800">{analysis.valuation_analysis?.upside_scenario}</p>
              </div>
              <div className="p-2 bg-red-50 rounded text-center">
                <p className="text-xs font-medium text-red-700">Downside</p>
                <p className="text-sm font-bold text-red-800">{analysis.valuation_analysis?.downside_scenario}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ESG Considerations */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-teal-600" />
              <span>ESG Considerations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">ESG Score Assessment</h4>
              <p className="text-sm text-slate-700">{analysis.esg_considerations?.esg_score_assessment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Sustainability Initiatives</h4>
              <div className="space-y-1">
                {analysis.esg_considerations?.sustainability_initiatives?.map((initiative, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{initiative}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Governance Strength</h4>
              <p className="text-sm text-slate-700">{analysis.esg_considerations?.governance_strength}</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
            {analysis.risk_assessment?.map((risk, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{risk.risk_factor}</h4>
                  <div className="flex space-x-2">
                    <Badge className={`text-xs ${
                      risk.impact_level === 'High' ? 'bg-red-100 text-red-800' :
                      risk.impact_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {risk.impact_level} Impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {risk.probability} Probability
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-700">{risk.mitigation_strategy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Recommendation */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Recommended Allocation</h4>
              <p className="text-lg font-bold text-slate-900">{analysis.portfolio_recommendation?.recommended_allocation}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Portfolio Role</h4>
              <p className="text-sm text-slate-700">{analysis.portfolio_recommendation?.portfolio_role}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Investor Suitability</h4>
              <p className="text-sm text-slate-700">{analysis.portfolio_recommendation?.investor_suitability}</p>
            </div>
          </CardContent>
        </Card>

        {/* Entry/Exit Strategy */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Entry/Exit Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Optimal Entry Points</h4>
              <div className="space-y-1">
                {analysis.entry_exit_strategy?.optimal_entry_points?.map((point, index) => (
                  <div key={index} className="p-2 bg-green-50 rounded text-sm text-slate-700">
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Exit Triggers</h4>
              <div className="space-y-1">
                {analysis.entry_exit_strategy?.exit_triggers?.map((trigger, index) => (
                  <div key={index} className="p-2 bg-red-50 rounded text-sm text-slate-700">
                    {trigger}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}