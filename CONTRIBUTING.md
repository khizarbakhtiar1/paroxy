# Contributing to PAROXY

Thank you for your interest in contributing to PAROXY! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Help create a welcoming environment for all contributors
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** (see DEVELOPMENT.md)
4. **Create a new branch** for your feature/fix

## Development Process

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions/improvements

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat(legal): add contract template generator

fix(auth): resolve session timeout issue

docs(readme): update installation instructions
```

### Code Standards

- Use TypeScript for all new code
- Follow existing code style and patterns
- Use Prettier for formatting (run `npm run format`)
- Pass ESLint checks (run `npm run lint`)
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test across different browsers
- Test responsive design on mobile devices

## Pull Request Process

1. **Update Documentation**
   - Update README.md if adding features
   - Add JSDoc comments to functions
   - Update DEVELOPMENT.md for setup changes

2. **Self-Review Checklist**
   - [ ] Code follows project style guidelines
   - [ ] All tests pass
   - [ ] No console errors or warnings
   - [ ] Responsive design works on mobile
   - [ ] Documentation is updated
   - [ ] Commit messages follow convention

3. **Create Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe what changed and why
   - Add screenshots for UI changes
   - Request review from maintainers

4. **Pull Request Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing process

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

## Feature Requests

Have an idea for PAROXY? We'd love to hear it!

1. Check existing issues to avoid duplicates
2. Open a new issue with the `enhancement` label
3. Clearly describe the feature and its benefits
4. Explain the use case
5. Be open to discussion and feedback

## Bug Reports

Found a bug? Help us fix it!

1. Check if the bug is already reported
2. Open a new issue with the `bug` label
3. Include:
   - Clear bug description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, etc.)

## Development Guidelines

### Component Structure

```tsx
// components/ModuleName/ComponentName.tsx

import { type ComponentProps } from "./types";

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic

  return (
    // JSX
  );
}
```

### API Route Structure

```ts
// app/api/module/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Route logic

  return NextResponse.json({ data });
}
```

### Database Queries

- Use Prisma for all database operations
- Include error handling
- Use transactions for multi-step operations
- Validate input data

### AI Integration

- Keep prompts in separate configuration
- Handle API errors gracefully
- Provide fallback responses
- Cache expensive operations when possible

## Areas Needing Contribution

Looking to contribute? Here are areas that need help:

### High Priority
- [ ] Unit tests for core modules
- [ ] E2E tests with Playwright/Cypress
- [ ] Mobile responsive improvements
- [ ] Accessibility (WCAG compliance)
- [ ] Performance optimization

### Features
- [ ] Export functionality (PDF, CSV)
- [ ] Calendar integration
- [ ] Slack/Discord notifications
- [ ] Multi-language support
- [ ] Dark mode improvements

### Documentation
- [ ] Video tutorials
- [ ] API documentation
- [ ] Component storybook
- [ ] Migration guides

## Questions?

- Open a discussion on GitHub
- Join our Discord community
- Email: dev@paroxy.io

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project documentation

Thank you for making PAROXY better! 🚀

