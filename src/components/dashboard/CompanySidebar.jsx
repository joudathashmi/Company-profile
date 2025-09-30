import React from "react";
import { Badge } from "@/components/ui/badge";

export default function CompanySidebar({ company }) {
  if (!company) return null;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Company Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Annual Revenue</p>
            <p className="text-2xl font-bold text-slate-900">${company.revenue || 'N/A'}B</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Market Cap</p>
            <p className="text-xl font-semibold text-slate-900">${company.market_cap || 'N/A'}B</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Industry</p>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {company.industry || 'N/A'}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Founded</p>
            <p className="font-medium text-slate-900">{company.founded_year || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Headquarters</p>
            <p className="font-medium text-slate-900">{company.headquarters || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">CEO</p>
            <p className="font-medium text-slate-900">{company.ceo || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Profit Margin</span>
            <span className="font-semibold text-slate-900">{company.key_metrics?.profit_margin || 'N/A'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">ROE</span>
            <span className="font-semibold text-slate-900">{company.key_metrics?.roe || 'N/A'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Debt-to-Equity</span>
            <span className="font-semibold text-slate-900">{company.key_metrics?.debt_to_equity || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">P/E Ratio</span>
            <span className="font-semibold text-slate-900">{company.key_metrics?.pe_ratio || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Business Segments */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Business Segments</h3>
        <div className="space-y-3">
          {(company.business_segments || []).map((segment, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-slate-600">{segment.name}</span>
              <Badge variant="outline" className="text-xs">
                {segment.revenue_percentage}%
              </Badge>
            </div>
          ))}
           {(company.business_segments || []).length === 0 && (
            <p className="text-sm text-slate-500">No segment data available.</p>
          )}
        </div>
      </div>

      {/* ESG Score */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">ESG Rating</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {company.esg_score || 'N/A'}/100
          </div>
          <p className="text-sm text-slate-600">Environmental, Social & Governance</p>
          {company.esg_score && (
            <Badge className="mt-2 bg-green-50 text-green-700 border-green-200">
              {company.esg_score >= 80 ? 'Excellent' : 'Good'}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}