import { Page, expect } from '@playwright/test';
import { tendercraftConfig } from '../utils/env';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.page.getByRole('textbox', { name: /email/i }).fill(email);
    await this.page.getByLabel(/password/i).fill(password);
    await this.page.getByRole('button', { name: /sign in|log in/i }).click();
    await expect(this.page.getByRole('navigation')).toBeVisible();
  }

  async loginWithDefaultUser() {
    await this.login(tendercraftConfig.email, tendercraftConfig.password);
  }
}
