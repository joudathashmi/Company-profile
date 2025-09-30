
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Building2, TrendingUp, Users, MapPin, DollarSign, FileText, Newspaper, BarChart3, Brain } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'overview';
  const companyTicker = urlParams.get('company');

  // Build the base URL for navigation, preserving the selected company
  const navBaseUrl = (tabName) => {
    let url = `Companies?tab=${tabName}`;
    if (companyTicker) {
      url += `&company=${companyTicker}`;
    }
    return createPageUrl(url);
  };

  const navigationTabs = [
    { name: "OVERVIEW", tab: "overview", icon: BarChart3 },
    { name: "BUSINESS UNITS", tab: "business-units", icon: Building2 },
    { name: "LEADERSHIP", tab: "leadership", icon: Users },
    { name: "GLOBAL PRESENCE", tab: "global-presence", icon: MapPin },
    { name: "FINANCIALS", tab: "financials", icon: DollarSign },
    { name: "AI INSIGHTS", tab: "ai-insights", icon: Brain },
    { name: "DOCUMENTS", tab: "documents", icon: FileText },
    { name: "NEWS", tab: "news", icon: Newspaper }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
        :root {
          --primary: #1e293b; --secondary: #334155; --accent: #3b82f6;
          --muted: #64748b; --background: #ffffff; --surface: #f8fafc;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .corporate-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .ai-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); }
      `}</style>
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 corporate-gradient rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CorpIntel Pro</h1>
                <p className="text-xs text-slate-500">Corporate Intelligence Platform</p>
              </div>
            </div>
          </div>
          
          <nav className="px-6">
            <div className="flex space-x-8 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={navBaseUrl(tab.tab)}
                  className={`relative flex items-center space-x-2 py-4 px-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-slate-900 hover:border-b-2 hover:border-slate-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                  {tab.name === "AI INSIGHTS" && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 ai-gradient rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
