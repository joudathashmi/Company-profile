import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/api/integrations";
import { MessageSquare, Send, Brain, Minimize2, Maximize2 } from "lucide-react";

export default function AIInteractiveChat({ company }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    "What are the main competitive advantages?",
    "How is the financial health trending?",
    "What are the biggest growth opportunities?",
    "What risks should investors be aware of?",
    "How does the leadership compare to peers?"
  ];

  const handleAskQuestion = async (question) => {
    if (!question.trim() || !company) return;

    const userMessage = { type: "user", content: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion("");
    setIsLoading(true);

    try {
      const prompt = `
        You are an expert corporate analyst providing insights about ${company.company_name}. 
        
        Company Context:
        - Company: ${company.company_name}
        - Industry: ${company.industry}
        - Market Cap: $${company.market_cap}B
        - Revenue: $${company.revenue}B
        - Business Segments: ${company.business_segments?.map(s => s.name).join(', ')}
        
        User Question: ${question}
        
        Please provide a concise, expert-level response (2-3 sentences max) that directly answers the question with specific insights about this company.
      `;

      const response = await InvokeLLM({
        prompt,
        add_context_from_internet: true
      });

      const aiMessage = { 
        type: "ai", 
        content: response, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        type: "ai", 
        content: "I apologize, but I'm having trouble processing your question right now. Please try again.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const handlePredefinedQuestion = (question) => {
    handleAskQuestion(question);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-full ai-gradient shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Brain className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="w-96 h-96 shadow-xl border-0 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg">AI Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-600">Ask me anything about {company?.company_name}</p>
      </CardHeader>
      
      <CardContent className="flex flex-col h-80">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm text-slate-500 mb-4">Start by asking a question or use a suggestion below</p>
              <div className="space-y-2">
                {predefinedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePredefinedQuestion(question)}
                    className="text-xs w-full"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-100 text-slate-800"
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Predefined Questions */}
        {messages.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {predefinedQuestions.slice(0, 2).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePredefinedQuestion(question)}
                  className="text-xs"
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Ask about the company..."
            onKeyPress={(e) => e.key === "Enter" && handleAskQuestion(currentQuestion)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleAskQuestion(currentQuestion)}
            disabled={!currentQuestion.trim() || isLoading}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}