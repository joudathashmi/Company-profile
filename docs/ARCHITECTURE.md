# 🏗️ Architecture Documentation

## System Overview

The Company Intelligence Portal is built as a modern React application that integrates with Base44's corporate data platform and AI services. The architecture follows a component-based design with clear separation of concerns.

## Technology Stack

### Frontend Architecture
```
React 18 (Functional Components + Hooks)
├── Vite (Build Tool & Dev Server)
├── Tailwind CSS (Styling)
├── Radix UI (Component Library)
├── React Router (Navigation)
└── Recharts (Data Visualization)
```

### Backend Integration
```
Base44 SDK
├── Company Entity Management
├── AI/LLM Integration (InvokeLLM)
├── Authentication & Authorization
└── Real-time Data Access
```

## Data Flow Architecture

### 1. Company Data Loading
```javascript
// Primary data source
Base44 Database → Company.list() → Company Objects → React Components
```

### 2. AI Insights Generation
```javascript
// AI-powered analysis flow
Company Data + AI Prompts → InvokeLLM() → Internet Data → AI Analysis → UI Display
```

### 3. Real-time Updates
```javascript
// Dynamic data integration
Static Company Data (Base44) + Live Market Data (Internet) → Combined Insights
```

## Component Architecture

### Directory Structure
```
src/
├── components/
│   ├── ai-insights/          # AI-powered analysis modules
│   │   ├── AIInsightsContent.jsx      # Main container
│   │   ├── StrategicIntelligence.jsx  # Strategic analysis
│   │   ├── StockPerformance.jsx       # Financial analysis
│   │   ├── LatestInsights.jsx         # News & trends
│   │   ├── CompetitorIntelligence.jsx # Competitive analysis
│   │   ├── ExecutiveInsights.jsx      # Leadership analysis
│   │   ├── InvestmentOpportunities.jsx # Investment analysis
│   │   └── AIInteractiveChat.jsx      # Interactive AI chat
│   ├── dashboard/            # Main dashboard components
│   │   ├── CompanyHeader.jsx          # Company overview header
│   │   ├── CompanySidebar.jsx         # Company details sidebar
│   │   ├── BusinessIntelligence.jsx   # Business analytics
│   │   └── RecentActivity.jsx         # Recent company activities
│   ├── common/               # Shared components
│   │   └── CompanySelector.jsx        # Company selection interface
│   ├── business-units/       # Business segment analysis
│   ├── leadership/           # Executive team analysis
│   ├── global-presence/      # Geographic analysis
│   ├── financials/           # Financial performance
│   ├── documents/            # Document management
│   ├── news/                 # News and media
│   └── ui/                   # Reusable UI components
├── pages/                    # Main application pages
│   ├── Companies.jsx         # Main companies dashboard
│   ├── Dashboard.jsx         # Dashboard redirect
│   ├── Layout.jsx            # Application layout
│   └── index.jsx             # Routing configuration
├── api/                      # Base44 SDK integration
│   ├── base44Client.js       # Base44 client configuration
│   ├── entities.js           # Entity exports
│   └── integrations.js       # Integration functions
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
└── lib/                      # Library utilities
```

## Data Models

### Company Entity Structure
```typescript
interface Company {
  // Basic Information
  id: string;
  company_name: string;
  ticker_symbol: string;
  industry: string;
  
  // Financial Data
  revenue: number;                    // in billions
  market_cap: number;                // in billions
  founded_year: number;
  
  // Company Details
  headquarters: string;
  ceo: string;
  employee_count: number;
  esg_score: number;                 // 0-100 scale
  
  // Complex Data Structures
  key_metrics: {
    profit_margin: number;           // percentage
    roe: number;                     // Return on Equity %
    debt_to_equity: number;          // ratio
    pe_ratio: number;                // Price-to-Earnings
  };
  
  business_segments: Array<{
    name: string;
    revenue_percentage: number;
  }>;
  
  geographic_presence: Array<{
    region: string;
    revenue_percentage: number;
  }>;
  
  recent_activities: Array<{
    type: string;
    description: string;
    date: string;
  }>;
  
  leadership_team: Array<{
    name: string;
    title: string;
    experience: string;
  }>;
  
  documents: Array<{
    name: string;
    type: string;
    date: string;
  }>;
  
  news_articles: Array<{
    title: string;
    source: string;
    date: string;
  }>;
}
```

## API Integration

### Base44 SDK Configuration
```javascript
// src/api/base44Client.js
import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: "68d836725a03957a20f5e244",
  requiresAuth: true
});
```

### Entity Management
```javascript
// src/api/entities.js
export const Company = base44.entities.Company;
export const User = base44.auth;
```

### AI Integration
```javascript
// src/api/integrations.js
export const InvokeLLM = base44.integrations.Core.InvokeLLM;
export const SendEmail = base44.integrations.Core.SendEmail;
export const UploadFile = base44.integrations.Core.UploadFile;
export const GenerateImage = base44.integrations.Core.GenerateImage;
```

## State Management

### Component State
- **Local State**: React hooks (useState, useEffect) for component-specific state
- **URL State**: React Router for navigation and company selection
- **No Global State**: Application uses prop drilling and local state management

### Data Flow Patterns
```javascript
// Parent Component (Companies.jsx)
const [companies, setCompanies] = useState([]);
const [selectedCompany, setSelectedCompany] = useState(null);

// Child Components receive data via props
<AIInsightsContent company={selectedCompany} />
<CompanyHeader company={selectedCompany} />
```

## AI Integration Architecture

### Prompt Engineering
Each AI component follows a consistent pattern:

1. **Data Preparation**: Extract relevant company data
2. **Prompt Construction**: Build structured prompts with context
3. **AI Call**: Invoke Base44's AI service with internet access
4. **Response Processing**: Parse and structure AI responses
5. **UI Rendering**: Display insights in formatted components

### Example AI Flow
```javascript
// StrategicIntelligence.jsx
const prompt = `
  Analyze the strategic position of ${company.company_name} based on:
  - Industry: ${company.industry}
  - Revenue: $${company.revenue}B
  - Market Cap: $${company.market_cap}B
  - Business Segments: ${company.business_segments?.map(...)}
  
  Provide strategic intelligence analysis covering:
  1. Competitive positioning and market leadership
  2. Strategic growth opportunities
  3. Risk assessment and potential challenges
`;

const result = await InvokeLLM({
  prompt,
  add_context_from_internet: true
});
```

## Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Components load only when needed
- **Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Proper dependency arrays in useEffect
- **Code Splitting**: Vite handles automatic code splitting

### Data Loading
- **Single API Call**: Company.list() loads all company data once
- **Client-side Filtering**: Company selection happens in memory
- **AI Caching**: AI responses could be cached (future enhancement)

## Security Architecture

### Authentication
- **Base44 Authentication**: All API calls require authentication
- **Client-side Security**: No sensitive data stored in localStorage
- **API Security**: All communication encrypted via HTTPS

### Data Privacy
- **Company Data**: Handled according to Base44 privacy policies
- **User Data**: Authentication managed by Base44
- **AI Data**: Prompts and responses processed securely

## Deployment Architecture

### Build Process
```
Source Code → Vite Build → Optimized Bundle → Static Files → CDN/Hosting
```

### Environment Configuration
- **Development**: Vite dev server with hot reload
- **Production**: Static files served from CDN
- **API Endpoints**: Base44 handles all backend services

## Scalability Considerations

### Current Limitations
- **Single Page Application**: All data loaded at once
- **Client-side Rendering**: SEO limitations
- **Memory Usage**: All company data in browser memory

### Future Enhancements
- **Server-side Rendering**: Next.js migration for better SEO
- **Data Pagination**: Load companies on demand
- **Caching Strategy**: Implement proper caching layers
- **Microservices**: Split into smaller, focused applications

## Monitoring & Analytics

### Error Handling
- **Try-catch Blocks**: Comprehensive error handling in async operations
- **Fallback UI**: Graceful degradation when data is unavailable
- **User Feedback**: Loading states and error messages

### Performance Monitoring
- **React DevTools**: Component performance analysis
- **Network Monitoring**: API call optimization
- **User Experience**: Loading times and interaction feedback

---

*This architecture documentation provides a comprehensive overview of the Company Intelligence Portal's technical structure and design decisions.*
