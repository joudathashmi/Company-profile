# 🤝 Contributing to Company Intelligence Portal

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

### 1. Fork the Repository

1. Click the "Fork" button on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Company-profile.git
   cd Company-profile
   ```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Create a Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix
```

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### Development Process

1. **Create a branch** from `main`
2. **Make your changes**
3. **Test thoroughly**
4. **Commit with clear messages**
5. **Push to your fork**
6. **Create a Pull Request**

## 💻 Coding Standards

### JavaScript/React Standards

- Use **functional components** with hooks
- Follow **React best practices**
- Use **ES6+ syntax**
- Prefer **const** and **let** over **var**
- Use **arrow functions** for callbacks
- Keep components **small and focused**

### Code Style

```javascript
// ✅ Good
const MyComponent = ({ company }) => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Component logic
  }, [company]);
  
  return <div>{/* JSX */}</div>;
};

// ❌ Avoid
function MyComponent(props) {
  var state = null;
  // ...
}
```

### File Naming

- **Components**: PascalCase (e.g., `CompanyHeader.jsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### Component Structure

```javascript
// 1. Imports
import React, { useState } from "react";
import { Card } from "@/components/ui/card";

// 2. Component definition
export default function MyComponent({ prop1, prop2 }) {
  // 3. State and hooks
  const [state, setState] = useState(null);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat(ai-insights): Add competitor analysis module
fix(dashboard): Resolve company selector loading issue
docs(readme): Update installation instructions
refactor(api): Simplify Base44 client configuration

# Avoid
fix bug
update code
changes
```

## 🔍 Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

2. **Update documentation** if needed

3. **Ensure code follows style guidelines**

4. **Write clear commit messages**

### PR Template

When creating a PR, include:

- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How you tested the changes
- **Screenshots**: If UI changes were made
- **Checklist**: Completed items

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated (if applicable)
- [ ] All tests pass
- [ ] Build succeeds

## 📁 Project Structure

### Adding New Components

1. Create component in appropriate folder:
   ```
   src/components/
   ├── ai-insights/     # AI analysis components
   ├── dashboard/       # Dashboard components
   ├── common/          # Shared components
   └── ui/              # UI component library
   ```

2. Follow naming convention: `ComponentName.jsx`

3. Export as default:
   ```javascript
   export default function ComponentName() {
     // ...
   }
   ```

### Adding New Features

1. **AI Analysis Module**:
   - Create in `src/components/ai-insights/`
   - Use `InvokeLLM` from `@/api/integrations`
   - Follow existing prompt patterns

2. **Dashboard Component**:
   - Create in `src/components/dashboard/`
   - Accept `company` prop
   - Use existing UI components

3. **New Page**:
   - Create in `src/pages/`
   - Add route in `src/pages/index.jsx`
   - Update navigation if needed

## 🧪 Testing

### Manual Testing

- Test in different browsers
- Test responsive design
- Verify AI insights generate correctly
- Check error handling

### Code Quality

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## 📚 Documentation

### Updating Documentation

- **README.md**: Project overview and quick start
- **SETUP.md**: Detailed installation guide
- **docs/ARCHITECTURE.md**: System design
- **docs/FEATURES.md**: Feature documentation
- **docs/API.md**: API integration guide

### Code Comments

```javascript
// Good: Explain why, not what
// Calculate revenue growth rate to identify trending segments
const growthRate = (current - previous) / previous * 100;

// Avoid: Obvious comments
// Set state to true
setState(true);
```

## 🐛 Reporting Issues

### Bug Reports

Include:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version

### Feature Requests

Include:
- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered

## 🔐 Security

- **Never commit** API keys or secrets
- **Use environment variables** for sensitive data
- **Report security issues** privately
- **Keep dependencies updated**

## 📞 Getting Help

- **Documentation**: Check `docs/` folder
- **Issues**: Search existing issues on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: For sensitive matters

## ✅ Review Process

1. **Automated Checks**: CI/CD runs tests
2. **Code Review**: Maintainers review code
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves PR
5. **Merge**: Changes merged to main

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Acknowledged in project documentation

---

**Thank you for contributing!** Your efforts help make this project better for everyone. 🙏
