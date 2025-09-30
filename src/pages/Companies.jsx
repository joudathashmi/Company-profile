import React, { useState, useEffect } from "react";
import { Company } from "@/api/entities";

// Component Imports
import CompanySelector from "../components/common/CompanySelector";
import CompanyHeader from "../components/dashboard/CompanyHeader";
import CompanySidebar from "../components/dashboard/CompanySidebar";
import BusinessIntelligence from "../components/dashboard/BusinessIntelligence";
import RecentActivity from "../components/dashboard/RecentActivity";
import BusinessUnitsContent from "../components/business-units/BusinessUnitsContent";
import LeadershipContent from "../components/leadership/LeadershipContent";
import GlobalPresenceContent from "../components/global-presence/GlobalPresenceContent";
import FinancialsContent from "../components/financials/FinancialsContent";
import DocumentsContent from "../components/documents/DocumentsContent";
import NewsContent from "../components/news/NewsContent";
import AIInsightsContent from "../components/ai-insights/AIInsightsContent";
import { Building2, ChevronDown } from "lucide-react";

// Main Page Component
export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompanySelector, setShowCompanySelector] = useState(false);

  // Get active tab and company from URL
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'overview';
  const companyTicker = urlParams.get('company');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const companyData = await Company.list();
        setCompanies(companyData);

        if (companyData.length > 0) {
          let companyToSelect;
          if (companyTicker) {
            companyToSelect = companyData.find(c => c.ticker_symbol === companyTicker);
          }
          // Fallback to first company if no ticker is in URL or ticker is invalid
          if (!companyToSelect) {
            companyToSelect = companyData[0];
          }
          setSelectedCompany(companyToSelect);
        }
      } catch (error) {
        console.error("Error loading companies:", error);
      }
      setIsLoading(false);
    };
    loadData();
  }, [companyTicker]);

  const handleCompanySelect = (company) => {
    // Navigate to the same page but with the new company in the URL
    window.location.href = `/pages/Companies?tab=${activeTab}&company=${company.ticker_symbol}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Corporate Intelligence...</p>
        </div>
      </div>
    );
  }

  // Render company selection grid if no companies are loaded yet (initial state)
  if (!selectedCompany) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 corporate-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Select a Company to Analyze</h1>
          <p className="text-slate-600 text-lg mb-8">Choose from our comprehensive database of multinational corporations</p>
          <CompanySelector
            companies={companies}
            selectedCompany={null}
            onCompanySelect={handleCompanySelect}
          />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <CompanyHeader company={selectedCompany} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              <div className="lg:col-span-1"><CompanySidebar company={selectedCompany} /></div>
              <div className="lg:col-span-3 space-y-8">
                <BusinessIntelligence company={selectedCompany} />
                <RecentActivity company={selectedCompany} />
              </div>
            </div>
          </>
        );
      case 'business-units': 
        return <BusinessUnitsContent company={selectedCompany} />;
      case 'leadership': 
        return <LeadershipContent company={selectedCompany} />;
      case 'global-presence': 
        return <GlobalPresenceContent company={selectedCompany} />;
      case 'financials': 
        return <FinancialsContent company={selectedCompany} />;
      case 'ai-insights': 
        return <AIInsightsContent company={selectedCompany} />;
      case 'documents': 
        return <DocumentsContent company={selectedCompany} />;
      case 'news': 
        return <NewsContent company={selectedCompany} />;
      default: 
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <style>
        {`
          .corporate-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        `}
      </style>

      {/* Company Switcher Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Corporate Intelligence Dashboard</h1>
          <p className="text-slate-600">Comprehensive analysis of multinational corporations</p>
        </div>
        <button
          onClick={() => setShowCompanySelector(!showCompanySelector)}
          className="flex items-center space-x-3 px-6 py-3 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
        >
          <div className="w-10 h-10 corporate-gradient rounded-lg flex items-center justify-center text-white font-bold">
            {selectedCompany.ticker_symbol || selectedCompany.company_name?.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-900">{selectedCompany.company_name}</p>
            <p className="text-sm text-slate-500">${selectedCompany.market_cap}B Market Cap</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showCompanySelector ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Company Selector Dropdown */}
      {showCompanySelector && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Company to Analyze</h3>
            <CompanySelector
              companies={companies}
              selectedCompany={selectedCompany}
              onCompanySelect={handleCompanySelect}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {!showCompanySelector && renderContent()}
    </div>
  );
}