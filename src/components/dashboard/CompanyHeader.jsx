import React from "react";
import { TrendingUp, Users, MapPin, Calendar } from "lucide-react";

export default function CompanyHeader({ company }) {
  if (!company) return null;

  const formatNumber = (num, suffix = '') => {
    if (num === null || num === undefined) return `N/A${suffix}`;
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K${suffix}`;
    }
    return `${num}${suffix}`;
  };

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return 'N/A';
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}T`;
    }
    if (num >= 1) {
      return `$${num.toFixed(1)}B`;
    }
    return `$${(num * 1000).toFixed(0)}M`;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-start justify-between mb-8">
        {/* Company Logo and Info */}
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 corporate-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {company.ticker_symbol || company.company_name?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{company.company_name}</h1>
            <div className="flex items-center space-x-6 text-slate-600">
              <span className="font-medium">Market Cap</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(company.market_cap)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Most Active</p>
            <p className="text-sm font-medium text-slate-900">Business Unit</p>
            <p className="text-lg font-bold text-slate-900">{company.business_segments?.[0]?.name || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Most Active</p>
            <p className="text-sm font-medium text-slate-900">Region</p>
            <p className="text-lg font-bold text-slate-900">{company.geographic_presence?.[0]?.region || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Employee Count</p>
            <p className="text-sm font-medium text-slate-900">Global Workforce</p>
            <p className="text-lg font-bold text-slate-900">{formatNumber(company.employee_count)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Annual Revenue</p>
            <p className="text-sm font-medium text-slate-900">FY 2023</p>
            <p className="text-lg font-bold text-slate-900">{formatCurrency(company.revenue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}