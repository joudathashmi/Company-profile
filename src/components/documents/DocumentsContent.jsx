import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Download } from "lucide-react";
import { format } from "date-fns";

const typeColors = {
  "Annual Report": "bg-blue-100 text-blue-800",
  "SEC Filing": "bg-green-100 text-green-800",
  "Investor Deck": "bg-purple-100 text-purple-800",
  "ESG Report": "bg-teal-100 text-teal-800",
};

export default function DocumentsContent({ company }) {
  if (!company) return null;

  // Provide default documents if undefined
  const documents = company.documents || [
    {
      name: "2023 Annual Report",
      type: "Annual Report",
      date: "2023-10-24",
      url: "#"
    },
    {
      name: "Q2 2024 Form 10-Q",
      type: "SEC Filing",
      date: "2024-01-30",
      url: "#"
    },
    {
      name: "2023 Investor Presentation",
      type: "Investor Deck",
      date: "2023-12-15",
      url: "#"
    },
    {
      name: "2023 ESG Report",
      type: "ESG Report",
      date: "2023-06-01",
      url: "#"
    }
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Library</h1>
        <p className="text-slate-600">Key corporate publications and filings for {company.company_name}.</p>
      </div>

      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <a href={doc.url} target="_blank" rel="noopener noreferrer" key={index} className="block p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <FileText className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">{doc.name}</p>
                      <Badge className={`mt-1 text-xs ${typeColors[doc.type] || 'bg-gray-100 text-gray-800'}`}>{doc.type}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                     <div className="flex items-center">
                       <Calendar className="w-4 h-4 mr-1" />
                       <span>{format(new Date(doc.date), "MMM d, yyyy")}</span>
                     </div>
                     <Download className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}