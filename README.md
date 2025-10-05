# TenderCraft Playwright Automation

This repository contains a Playwright + TypeScript end-to-end automation framework targeting [TenderCraft](https://dev.app.tendercraft.ai/). The framework is intentionally lightweight so that you can extend it with more scenarios as you onboard additional flows.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm 8+
- Valid TenderCraft test account credentials

## Getting started

1. Install dependencies and Playwright browsers:

   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. Create a `.env` file from the provided template and populate your TenderCraft credentials:

   ```bash
   cp .env.example .env
   # edit .env and add TENDERCRAFT_EMAIL / TENDERCRAFT_PASSWORD
   ```

3. Execute the regression suite in headless mode:

   ```bash
   npm test
   ```

   Useful alternatives:

   - `npm run test:headed` – run tests with the browser visible.
   - `npm run test:debug` – run with Playwright Inspector for step-by-step debugging.
   - `npm run codegen` – open Playwright Codegen for fast locator discovery.

## Project structure

```
├── playwright.config.ts        # Global configuration shared by all tests
├── tests/
│   ├── fixtures/               # Custom fixtures (e.g. authentication)
│   ├── pages/                  # Page Object Model (POM) classes
│   ├── specs/                  # Playwright test specs
│   └── utils/                  # Helper utilities (env, data builders, etc.)
├── .env.example                # Template for environment variables
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # npm scripts and devDependencies
```

### Adding new tests

1. Model each significant screen as a page object in `tests/pages/`.
2. Reuse or extend fixtures within `tests/fixtures/` for shared setup such as login or data seeding.
3. Add new specs under `tests/specs/`. Import `tendercraftTest` from the fixture to gain access to shared context and helpers.

### Handling authentication

The sample tests demonstrate authenticating with credentials defined in `.env`. If you need to reuse an authenticated state across tests, update `tests/fixtures/auth.fixture.ts` to perform login once and persist the storage state.

### Reporting

The default configuration generates an HTML report under `playwright-report/`. Open it after a run with:

```bash
npx playwright show-report
```

### Tips for locator strategy

- Prefer `getByRole`, `getByLabel`, or `getByTestId` queries for resilient selectors.
- When the application provides `data-testid` attributes, surface them in the page objects for easier maintenance.
- Use `npm run codegen` against the dev environment to explore the DOM and capture locators interactively.

## Next steps

- Expand the page objects with more methods that encapsulate common flows (e.g., tender bookmarking, exporting, status transitions).
- Integrate the suite with your CI pipeline (GitHub Actions, GitLab CI, etc.) and export reports as build artifacts.
- Configure test data management (API seeds, fixtures) if you require deterministic datasets.
