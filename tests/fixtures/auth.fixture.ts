import { test as base, Page } from '@playwright/test';
import { ensureCredentials } from '../utils/env';
import { LoginPage } from '../pages/login.page';

interface AuthFixtures {
  loginPage: LoginPage;
  authenticatedPage: Page;
}

export const tendercraftTest = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  authenticatedPage: async ({ page, loginPage }, use) => {
    ensureCredentials();
    await loginPage.loginWithDefaultUser();
    await use(page);
  },
});

export const expect = tendercraftTest.expect;
