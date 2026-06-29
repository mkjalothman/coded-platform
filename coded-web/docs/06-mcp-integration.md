# MCP Integration Guide

## What is MCP?

MCP (Model Context Protocol) is a standard for connecting AI models to external tools and data sources. In the CODED project, MCP is used during **development** to enhance the build process — it is not part of the production runtime.

## MCP in the CODED Project

MCP integrations are used for three purposes:

### 1. GitHub MCP — Version Control

Used for structured Git operations during development:

- Creating and managing pull requests
- Viewing CI status and deployment checks
- Code review workflows

**When to use**: For all GitHub interactions during development. Prefer MCP tools over the `gh` CLI.

### 2. Browser MCP — Design Validation

Used to inspect live websites for design system alignment:

- Extracting color palettes, spacing, and typography from production sites
- Comparing implemented UI against design references
- Validating visual consistency

**When to use**: When aligning the design system with an external reference or auditing visual consistency.

**Limitation**: Access to external sites may be restricted by network policy. The system is designed to work without Browser MCP by relying on the design tokens defined in `design-system/`.

### 3. Supabase MCP — Database (Future)

Available for future features that require a database backend:

- User accounts and authentication
- Application tracking
- Program enrollment data

**When to use**: Only when adding database-backed features. Not currently used in the marketing site.

## Guidelines

1. **MCP is a development tool, not a runtime dependency.** The production application never calls MCP services.
2. **Use MCP purposefully.** Each MCP call should serve a specific design or development goal.
3. **Always have fallbacks.** If an MCP service is unavailable (network restrictions, rate limits), the development workflow should continue using local data and tokens.
4. **Don't store MCP credentials in code.** MCP authentication is handled by the development environment, not the application.

## Adding a New MCP Integration

1. Identify the MCP server and its available tools.
2. Determine which development workflow it improves.
3. Document the integration purpose and usage guidelines in this file.
4. Ensure the feature works without MCP access (graceful degradation).
