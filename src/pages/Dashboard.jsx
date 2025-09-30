import React, { useEffect } from 'react';
import { createPageUrl } from '@/utils';

/**
 * This component acts as a permanent redirect.
 * The application's default entry point might still point to "Dashboard".
 * This page will immediately redirect the user to the correct, unified "Companies" page,
 * ensuring the application loads correctly.
 */
export default function DashboardRedirect() {
  useEffect(() => {
    // Use window.location.replace to redirect without creating a new entry in browser history.
    // This will redirect to the unified Companies page, defaulting to the overview tab.
    window.location.replace(createPageUrl("Companies?tab=overview"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading Corporate Intelligence Platform...</p>
      </div>
    </div>
  );
}