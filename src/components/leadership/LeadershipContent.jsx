import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";

export default function LeadershipContent({ company }) {
  const [selectedLeader, setSelectedLeader] = useState(null);

  if (!company) return null;

  // Provide default leadership data if undefined
  const leadershipTeam = company.leadership_team || [
    {
      name: "Chief Executive Officer",
      title: "CEO",
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Leading the company's vision and strategic direction.",
      tenure: "Current leadership",
      education: "Advanced business education",
      previous_roles: ["Executive leadership roles"],
      achievements: ["Business transformation initiatives"]
    }
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Executive Leadership</h1>
        <p className="text-slate-600">The team driving the vision and strategy for {company.company_name}. Click on any leader to learn more.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {leadershipTeam.map((leader, index) => (
          <Card 
            key={index} 
            className="text-center shadow-lg border-0 bg-white hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-xl"
            onClick={() => setSelectedLeader(leader)}
          >
            <CardContent className="p-6">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={leader.photo_url}
                  alt={leader.name}
                  className="w-full h-full rounded-full object-cover"
                />
                 <div className="absolute inset-0 rounded-full border-2 border-blue-200"></div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{leader.title}</p>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{leader.bio}</p>
              <div className="mt-4">
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                  Click to view profile
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leader Detail Modal */}
      <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Executive Profile</DialogTitle>
          </DialogHeader>
          
          {selectedLeader && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={selectedLeader.photo_url}
                  alt={selectedLeader.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedLeader.name}</h2>
                  <p className="text-lg text-blue-600 font-semibold mb-2">{selectedLeader.title}</p>
                  <p className="text-sm text-slate-600 mb-3">{selectedLeader.tenure}</p>
                  <p className="text-slate-700 leading-relaxed">{selectedLeader.bio}</p>
                </div>
              </div>

              {/* Education */}
              {selectedLeader.education && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-bold text-slate-900">Education</h3>
                  </div>
                  <p className="text-slate-700">{selectedLeader.education}</p>
                </div>
              )}

              {/* Key Achievements */}
              {selectedLeader.achievements && selectedLeader.achievements.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-bold text-slate-900">Key Achievements</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedLeader.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-slate-700">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}