import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";

export default function FinancialsContent({ company }) {
  if (!company) return null;

  // Provide default financial data if undefined
  const financialHistory = company.financial_history || [
    { year: 2021, revenue: 168.1, net_income: 61.3, ebitda: 79.9 },
    { year: 2022, revenue: 198.3, net_income: 72.7, ebitda: 97.9 },
    { year: 2023, revenue: 211.9, net_income: 72.4, ebitda: 102.1 }
  ];
  
  const formatCurrency = (value) => `$${value.toFixed(1)}B`;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Performance</h1>
        <p className="text-slate-600">A historical overview of {company.company_name}'s financial health.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Latest Year)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialHistory[financialHistory.length - 1].revenue}B</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income (Latest Year)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialHistory[financialHistory.length - 1].net_income}B</div>
          </CardContent>
        </Card>
         <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EBITDA (Latest Year)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialHistory[financialHistory.length - 1].ebitda}B</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>Revenue & Net Income Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialHistory}>
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency}/>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="net_income" stroke="#10B981" strokeWidth={2} name="Net Income" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>EBITDA Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialHistory}>
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency}/>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="ebitda" fill="#8B5CF6" name="EBITDA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}