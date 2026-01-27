---
title: Development Standards
sidebar_position: 2
---

# Development Standards

This document outlines the development standards and best practices followed at UROC. These guidelines ensure consistency and maintainability across our codebase.

## Table of Contents

- [Version Control](#version-control)
- [Code Style](#code-style)
- [Development Workflow](#development-workflow)
- [Documentation](#documentation)

## Version Control

### Git Configuration

#### Branch Structure

- **Main Branch**: `main`
  - Production-ready code
  - Protected branch
  - Requires pull request approval
- **Development Branch**: `develop`
  - Integration branch for features
  - Testing environment

#### Branch Naming Convention

- Feature branches: `feature/short-description`
- Bug fixes: `fix/issue-description`
- Hotfixes: `hotfix/critical-fix`
- Releases: `release/v1.2.3`

### Commit Standards

#### Commit Message Format

```
<type>: <short description>

[optional body]
[optional footer]
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style updates
- `refactor`: Code refactoring
- `test`: Adding/modifying tests
- `chore`: Maintenance tasks

#### Best Practices

1. Keep commits atomic and focused
2. Write clear, concise descriptions
3. Reference issue numbers when applicable
4. AI-generated commit messages are acceptable if accurate and concise

## Development Workflow

### Feature Development Process

1. Create feature branch from `develop`
2. Implement changes
3. Submit pull request
4. Merge to `develop`

## Code Style

### General Guidelines

- Write self-documenting code
- Follow DRY (Don't Repeat Yourself) principles
- Maintain consistent naming conventions
- Keep functions small and focused
- Add comments for complex logic

## Documentation

### Code Documentation

- Ensure code comments are up to date

### Project Documentation

- Maintain README files
- Primarly document on UMD-UROC.GitHub.io
