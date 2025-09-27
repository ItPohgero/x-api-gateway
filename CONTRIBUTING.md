# Contributing to Simple Gateway

First off, thank you for considering contributing to Simple Gateway! It's people like you that make Simple Gateway such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and considerate in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful** to most Simple Gateway users

### Pull Requests

The process described here has several goals:

- Maintain Simple Gateway's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible Simple Gateway
- Enable a sustainable system for Simple Gateway's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in the template
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all status checks are passing

## Development Process

### Setup Development Environment

1. Fork the repo on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/Simple-Gateway.git
   cd Simple-Gateway
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Copy environment file:

   ```bash
   cp .env.example .env
   ```

5. Make your changes
6. Test your changes:

   ```bash
   bun run dev
   ```

### Making Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Write or update tests as necessary
4. Update documentation if needed
5. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```

6. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎉 `:tada:` when adding a new feature
  - 🐛 `:bug:` when fixing a bug
  - 📝 `:memo:` when writing documentation
  - 🎨 `:art:` when improving the format/structure of the code
  - 🚀 `:rocket:` when improving performance
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Styleguide

- Use TypeScript for all new code
- Use meaningful variable names
- Use PascalCase for interfaces and types
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants
- Always define return types for functions
- Use async/await instead of Promises where possible
- Follow the existing code style in the project

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown/)
- Reference functions, classes, and other code elements in backticks
- Use descriptive titles and headers
- Include code examples where applicable
- Keep line length under 100 characters where possible

## File Structure

When adding new files, please follow the existing structure:

```bash
src/
├── config/           # Configuration files
├── constants/        # Application constants
├── middleware/       # Express-like middleware
├── routes/           # Route handlers
├── services/         # Business logic services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── index.ts          # Application entry point
```

## Testing

Currently, the project doesn't have a comprehensive test suite, but we encourage:

- Manual testing of your changes
- Testing against multiple service configurations
- Performance testing for proxy functionality
- Integration testing with actual services when possible

## Adding New Services

When adding support for a new service:

1. Add service configuration in `src/config/index.ts`
2. Add service constants in `src/constants/services.ts`
3. Update environment variables in `.env.example`
4. Update documentation in both README files
5. Test the new service integration

## Documentation

When making changes that affect the API or user experience:

1. Update the main README.md (English)
2. Update the README.id.md (Indonesian)
3. Update any relevant code comments
4. Consider adding examples

## Questions?

If you have questions about contributing, please:

1. Check the existing issues
2. Create a new issue with the "question" label
3. Join discussions in existing issues
4. Contact the maintainer directly

## Recognition

Contributors will be recognized in the project documentation. Thank you for your contributions!

---

**Author**: Wahyu Agus Arifin (ItPohgero)
**GitHub**: [@ItPohgero](https://github.com/ItPohgero)
