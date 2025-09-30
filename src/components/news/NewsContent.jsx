import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function NewsContent({ company }) {
  if (!company) return null;

  // Provide default news if undefined
  const newsArticles = company.news_articles || [
    {
      title: "Company Reports Strong Q3 Earnings, Beats Analyst Expectations",
      source: "Financial Times",
      date: "2024-01-15",
      url: "#",
      snippet: "The company delivered exceptional performance this quarter with revenue growth of 18% year-over-year, driven by strong demand for cloud services and enterprise software solutions."
    },
    {
      title: "Strategic Partnership Announced with Leading Technology Firm",
      source: "TechCrunch",
      date: "2024-01-10",
      url: "#",
      snippet: "This partnership will accelerate innovation in artificial intelligence and machine learning, bringing cutting-edge solutions to enterprise customers worldwide."
    },
    {
      title: "New Sustainability Initiative Launched to Achieve Carbon Neutrality",
      source: "Reuters",
      date: "2024-01-05",
      url: "#",
      snippet: "The comprehensive environmental program includes investments in renewable energy, carbon offset projects, and sustainable business practices across all operations."
    }
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Latest News</h1>
        <p className="text-slate-600">Recent headlines and developments concerning {company.company_name}.</p>
      </div>

      <div className="space-y-6">
        {newsArticles.map((article, index) => (
          <Card key={index} className="shadow-lg border-0 bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-blue-600 font-semibold mb-1">{article.source} &bull; {format(new Date(article.date), "MMM d, yyyy")}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{article.snippet}</p>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 sm:ml-6">
                  <Button variant="outline" size="sm">
                    Read More <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}