# 🔌 API Documentation

## Base44 SDK Integration

The Company Intelligence Portal integrates with Base44's powerful SDK to provide corporate data access and AI-powered insights.

## Configuration

### Base44 Client Setup
```javascript
// src/api/base44Client.js
import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: "68d836725a03957a20f5e244",
  requiresAuth: true
});
```

### Entity Exports
```javascript
// src/api/entities.js
import { base44 } from './base44Client';

export const Company = base44.entities.Company;
export const User = base44.auth;
```

## Company Entity API

### Company.list()
**Description**: Retrieves all available companies from the Base44 database
**Returns**: Array of company objects
**Usage**:
```javascript
const companies = await Company.list();
```

**Response Structure**:
```javascript
[
  {
    id: "unique-company-id",
    company_name: "Apple Inc.",
    ticker_symbol: "AAPL",
    industry: "Technology",
    revenue: 400,                    // in billions
    market_cap: 3000,               // in billions
    founded_year: 1976,
    headquarters: "Cupertino, CA, USA",
    ceo: "Tim Cook",
    employee_count: 164000,
    esg_score: 85,                  // 0-100 scale
    
    key_metrics: {
      profit_margin: 25.3,          // percentage
      roe: 147.4,                   // Return on Equity %
      debt_to_equity: 1.73,         // ratio
      pe_ratio: 28.34               // Price-to-Earnings
    },
    
    business_segments: [
      {
        name: "iPhone",
        revenue_percentage: 52
      },
      {
        name: "Services",
        revenue_percentage: 19
      }
    ],
    
    geographic_presence: [
      {
        region: "Americas",
        revenue_percentage: 43
      },
      {
        region: "Europe",
        revenue_percentage: 24
      }
    ],
    
    recent_activities: [
      {
        type: "Partnership",
        description: "Strategic AI collaboration",
        date: "2024-01-15"
      }
    ],
    
    leadership_team: [
      {
        name: "Chief Executive Officer",
        title: "CEO",
        experience: "12 years at Apple"
      }
    ],
    
    documents: [
      {
        name: "2023 Annual Report",
        type: "Annual Report",
        date: "2023-12-31"
      }
    ],
    
    news_articles: [
      {
        title: "Company Reports Strong Q3 Earnings",
        source: "Financial Times",
        date: "2024-01-15"
      }
    ]
  }
]
```

## AI Integration API

### InvokeLLM()
**Description**: Invokes Base44's AI service for intelligent analysis
**Parameters**:
- `prompt` (string): The analysis prompt
- `add_context_from_internet` (boolean): Whether to include real-time internet data

**Usage**:
```javascript
import { InvokeLLM } from '@/api/integrations';

const result = await InvokeLLM({
  prompt: "Analyze the strategic position of Apple Inc.",
  add_context_from_internet: true
});
```

**Response**: AI-generated analysis text

### Integration Functions
```javascript
// src/api/integrations.js
export const Core = base44.integrations.Core;
export const InvokeLLM = base44.integrations.Core.InvokeLLM;
export const SendEmail = base44.integrations.Core.SendEmail;
export const UploadFile = base44.integrations.Core.UploadFile;
export const GenerateImage = base44.integrations.Core.GenerateImage;
export const ExtractDataFromUploadedFile = base44.integrations.Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = base44.integrations.Core.CreateFileSignedUrl;
export const UploadPrivateFile = base44.integrations.Core.UploadPrivateFile;
```

## AI Prompt Engineering

### Strategic Intelligence Prompt
```javascript
const prompt = `
  Analyze the strategic position of ${company.company_name} based on the following data:
  - Industry: ${company.industry}
  - Revenue: $${company.revenue}B
  - Market Cap: $${company.market_cap}B
  - Employee Count: ${company.employee_count?.toLocaleString()}
  - Business Segments: ${company.business_segments?.map(s => `${s.name} (${s.revenue_percentage}%)`).join(', ')}
  - Geographic Presence: ${company.geographic_presence?.map(r => `${r.region} (${r.revenue_percentage}%)`).join(', ')}
  - Recent Activities: ${company.recent_activities?.map(a => `${a.type}: ${a.description}`).join(', ')}
  
  Provide strategic intelligence analysis covering:
  1. Competitive positioning and market leadership
  2. Strategic growth opportunities
  3. Risk assessment and potential challenges
  4. Innovation and transformation initiatives
  5. Market expansion strategies
`;
```

### Stock Performance Prompt
```javascript
const prompt = `
  Provide comprehensive stock performance analysis for ${company.company_name} (${company.ticker_symbol}) based on:
  - Market Cap: $${company.market_cap}B
  - Revenue: $${company.revenue}B
  - Industry: ${company.industry}
  - Key Metrics: P/E ${company.key_metrics?.pe_ratio}, ROE ${company.key_metrics?.roe}%, Debt-to-Equity ${company.key_metrics?.debt_to_equity}
  - Recent Activities: ${company.recent_activities?.map(a => `${a.type}: ${a.description} (${a.date})`).join(', ')}
  
  Analyze:
  1. Financial health and valuation metrics
  2. Stock performance trends and outlook
  3. Dividend policy and shareholder returns
  4. Analyst sentiment and target price insights
  5. Peer comparison and relative valuation
`;
```

### Interactive Chat Prompt
```javascript
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
```

## Error Handling

### API Error Patterns
```javascript
try {
  const companyData = await Company.list();
  setCompanies(companyData);
} catch (error) {
  console.error("Error loading companies:", error);
  // Handle error gracefully
}
```

### AI Error Handling
```javascript
try {
  const result = await InvokeLLM({
    prompt,
    add_context_from_internet: true
  });
  setInsights({ textAnalysis: result });
} catch (error) {
  console.error("Error generating insights:", error);
  // Provide fallback insights
  setInsights({
    textAnalysis: "Unable to fetch real-time insights. Please try again later."
  });
}
```

## Authentication

### Base44 Authentication
```javascript
// Authentication is handled automatically by Base44 SDK
export const base44 = createClient({
  appId: "68d836725a03957a20f5e244",
  requiresAuth: true // Ensures all operations require authentication
});
```

### User Management
```javascript
import { User } from '@/api/entities';

// User authentication methods available through Base44
// Implementation depends on Base44's auth system
```

## Data Flow Patterns

### Company Data Loading
```javascript
// 1. Load all companies
const companies = await Company.list();

// 2. Select specific company
const selectedCompany = companies.find(c => c.ticker_symbol === ticker);

// 3. Pass to components
<AIInsightsContent company={selectedCompany} />
```

### AI Analysis Flow
```javascript
// 1. Prepare company data
const companyData = extractCompanyData(company);

// 2. Build prompt
const prompt = buildAnalysisPrompt(companyData, analysisType);

// 3. Call AI service
const result = await InvokeLLM({
  prompt,
  add_context_from_internet: true
});

// 4. Process response
const insights = processAIResponse(result);

// 5. Update UI
setInsights(insights);
```

## Rate Limiting & Performance

### Best Practices
- **Single API Call**: Load all company data at once with `Company.list()`
- **Client-side Filtering**: Filter companies in memory rather than multiple API calls
- **AI Caching**: Consider caching AI responses for better performance
- **Error Retry**: Implement retry logic for failed API calls

### Performance Optimization
```javascript
// Efficient company selection
const handleCompanySelect = (company) => {
  // Use URL navigation instead of API calls
  window.location.href = `/pages/Companies?tab=${activeTab}&company=${company.ticker_symbol}`;
};
```

## Future API Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live data
- **Bulk Operations**: Batch company operations
- **Advanced Filtering**: Server-side filtering and pagination
- **Custom Metrics**: User-defined analysis parameters
- **Export APIs**: Data export functionality

### Integration Opportunities
- **External Data Sources**: Additional financial data providers
- **Webhook Support**: Real-time notifications
- **GraphQL API**: More flexible data querying
- **RESTful Endpoints**: Standard REST API access

---

*This API documentation provides comprehensive information about the Base44 SDK integration and API usage patterns in the Company Intelligence Portal.*
