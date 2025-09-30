import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Building2, DollarSign, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CompanySelector({ companies, selectedCompany, onCompanySelect, showInHeader = false }) {
  if (showInHeader) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-3 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-all duration-200">
            <div className="w-8 h-8 corporate-gradient rounded-lg flex items-center justify-center text-white text-sm font-bold">
              {selectedCompany?.ticker_symbol || selectedCompany?.company_name?.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900">{selectedCompany?.company_name}</p>
              <p className="text-xs text-slate-500">${selectedCompany?.market_cap || 'N/A'}B Market Cap</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-2">
          {companies.map((company) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => onCompanySelect(company)}
              className="p-3 cursor-pointer"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="w-10 h-10 corporate-gradient rounded-lg flex items-center justify-center text-white font-bold">
                  {company.ticker_symbol || company.company_name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{company.company_name}</p>
                  <p className="text-xs text-slate-500">{company.industry} • ${company.market_cap || 'N/A'}B</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Card 
          key={company.id}
          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
            selectedCompany?.id === company.id 
              ? 'ring-2 ring-blue-500 shadow-xl bg-blue-50/50' 
              : 'shadow-lg border-0 bg-white hover:shadow-xl'
          }`}
          onClick={() => onCompanySelect(company)}
        >
          <div className="p-6">
            {/* Company Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 corporate-gradient rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {company.ticker_symbol || company.company_name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{company.company_name}</h3>
                <p className="text-sm text-slate-600">{company.industry}</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-600">Market Cap</span>
                </div>
                <span className="text-sm font-bold text-slate-900">${company.market_cap || 'N/A'}B</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-600">Revenue</span>
                </div>
                <span className="text-sm font-bold text-slate-900">${company.revenue || 'N/A'}B</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-slate-600">Employees</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{company.employee_count ? (company.employee_count / 1000).toFixed(0) + 'K' : 'N/A'}</span>
              </div>
            </div>

            {/* CEO & Headquarters */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">CEO</span>
                <span className="text-xs font-medium text-slate-700">{company.ceo || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">HQ</span>
                <span className="text-xs font-medium text-slate-700">{company.headquarters?.split(',')[0] || 'N/A'}</span>
              </div>
            </div>

            {/* ESG Score */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-sm text-slate-600">ESG Score</span>
              <Badge className={`${
                company.esg_score && company.esg_score >= 80 ? 'bg-green-100 text-green-800' :
                company.esg_score && company.esg_score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                company.esg_score ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {company.esg_score ? `${company.esg_score}/100` : 'N/A'}
              </Badge>
            </div>

            {/* Selection Indicator */}
            {selectedCompany?.id === company.id && (
              <div className="mt-3 text-center">
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                  Currently Selected
                </Badge>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}