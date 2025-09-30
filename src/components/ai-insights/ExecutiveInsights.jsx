import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/api/integrations";
import { Users, Award, TrendingUp, MessageCircle } from "lucide-react";

export default function ExecutiveInsights({ company }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!company) return;

    const generateExecutiveAnalysis = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Provide comprehensive executive leadership analysis for ${company.company_name}:
          
          Company Context:
          - CEO: ${company.ceo}
          - Industry: ${company.industry}
          - Market Cap: $${company.market_cap}B
          - Leadership Team: ${company.leadership_team?.map(l => `${l.name} - ${l.title}`).join(', ')}
          
          Analyze:
          1. Leadership effectiveness and track record
          2. Strategic vision and execution capability
          3. Recent executive communications and statements
          4. Leadership changes and their impact
          5. Board composition and governance
          6. Executive compensation and alignment
          7. Leadership reputation and market perception
        `;

        const result = await InvokeLLM({
          prompt,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              leadership_effectiveness: {
                type: "object",
                properties: {
                  overall_rating: { type: "string" },
                  key_strengths: { type: "array", items: { type: "string" } },
                  areas_for_improvement: { type: "array", items: { type: "string" } },
                  leadership_style: { type: "string" }
                }
              },
              strategic_vision: {
                type: "object",
                properties: {
                  vision_clarity: { type: "string" },
                  execution_track_record: { type: "string" },
                  innovation_leadership: { type: "string" },
                  transformation_initiatives: { type: "array", items: { type: "string" } }
                }
              },
              recent_communications: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    executive: { type: "string" },
                    key_message: { type: "string" },
                    market_impact: { type: "string" },
                    significance: { type: "string" }
                  }
                }
              },
              governance_analysis: {
                type: "object",
                properties: {
                  board_composition: { type: "string" },
                  independence_rating: { type: "string" },
                  governance_practices: { type: "array", items: { type: "string" } }
                }
              },
              succession_planning: {
                type: "object",
                properties: {
                  readiness_assessment: { type: "string" },
                  key_successors: { type: "array", items: { type: "string" } },
                  continuity_risks: { type: "array", items: { type: "string" } }
                }
              },
              market_perception: {
                type: "object",
                properties: {
                  investor_confidence: { type: "string" },
                  analyst_sentiment: { type: "string" },
                  reputation_factors: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        });
        
        setAnalysis(result);
      } catch (error) {
        console.error("Error generating executive analysis:", error);
      }
      setIsLoading(false);
    };

    generateExecutiveAnalysis();
  }, [company]);

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">AI is analyzing executive leadership...</p>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-slate-600">
          <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p>Unable to generate executive analysis</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Leadership Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span>Leadership Effectiveness</span>
              </div>
              <Badge className={`${
                analysis.leadership_effectiveness?.overall_rating === 'Excellent' ? 'bg-green-100 text-green-800' :
                analysis.leadership_effectiveness?.overall_rating === 'Strong' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {analysis.leadership_effectiveness?.overall_rating}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Leadership Style</h4>
              <p className="text-sm text-slate-700 p-3 bg-orange-50 rounded-lg">
                {analysis.leadership_effectiveness?.leadership_style}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 text-green-700">Key Strengths</h4>
              <div className="space-y-1">
                {analysis.leadership_effectiveness?.key_strengths?.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2 text-amber-700">Areas for Improvement</h4>
              <div className="space-y-1">
                {analysis.leadership_effectiveness?.areas_for_improvement?.map((area, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Vision */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Strategic Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Vision Clarity</h4>
              <p className="text-sm text-slate-700">{analysis.strategic_vision?.vision_clarity}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-1">Execution Track Record</h4>
              <p className="text-sm text-slate-700">{analysis.strategic_vision?.execution_track_record}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Transformation Initiatives</h4>
              <div className="space-y-1">
                {analysis.strategic_vision?.transformation_initiatives?.map((initiative, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-slate-700">{initiative}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Communications */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <span>Recent Executive Communications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.recent_communications?.map((comm, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{comm.executive}</h4>
                  <Badge variant="outline" className={`text-xs ${
                    comm.significance === 'High' ? 'bg-red-50 text-red-700' :
                    comm.significance === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {comm.significance}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 mb-3">{comm.key_message}</p>
                <p className="text-xs text-slate-500 italic">{comm.market_impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Governance Analysis */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Governance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Board Composition</h4>
              <p className="text-sm text-slate-700">{analysis.governance_analysis?.board_composition}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Independence Rating</h4>
              <Badge className="bg-blue-100 text-blue-800">
                {analysis.governance_analysis?.independence_rating}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Best Practices</h4>
              <div className="space-y-1">
                {analysis.governance_analysis?.governance_practices?.slice(0, 3).map((practice, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-xs text-slate-700">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Succession Planning */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Succession Planning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Readiness Assessment</h4>
              <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded">
                {analysis.succession_planning?.readiness_assessment}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Key Successors</h4>
              <div className="space-y-1">
                {analysis.succession_planning?.key_successors?.map((successor, index) => (
                  <p key={index} className="text-sm text-slate-700 px-2 py-1 bg-blue-50 rounded text-center">
                    {successor}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Perception */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Market Perception</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Investor Confidence</h4>
              <p className="text-sm text-slate-700">{analysis.market_perception?.investor_confidence}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Analyst Sentiment</h4>
              <Badge className="bg-green-100 text-green-800">
                {analysis.market_perception?.analyst_sentiment}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Reputation Factors</h4>
              <div className="space-y-1">
                {analysis.market_perception?.reputation_factors?.slice(0, 3).map((factor, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-xs text-slate-700">{factor}</p>
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