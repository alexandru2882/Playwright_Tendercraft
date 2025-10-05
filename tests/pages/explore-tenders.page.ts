import { Page, expect, Locator } from '@playwright/test';

export class ExploreTendersPage {
  readonly searchInput: Locator;
  readonly statusFilterButton: Locator;
  readonly tenderCards: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByRole('textbox', { name: /search/i });
    this.statusFilterButton = page.getByRole('button', { name: /filters?|status/i });
    this.tenderCards = page.locator('[data-testid="tender-card"], [data-test="tender-card"]');
  }

  async goto() {
    await this.page.goto('/tenders');
    await expect(this.page.getByRole('heading', { name: /explore tenders/i })).toBeVisible();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
    await this.expectAnyTenderCard();
  }

  async openStatusFilter() {
    await this.statusFilterButton.click();
  }

  async selectStatus(statusLabel: string) {
    await this.openStatusFilter();
    const option = this.page.getByRole('option', { name: new RegExp(statusLabel, 'i') });
    if (await option.count()) {
      await option.first().click();
    } else {
      await this.page.getByRole('checkbox', { name: new RegExp(statusLabel, 'i') }).check({ force: true });
      await this.page.keyboard.press('Escape');
    }
    await this.expectAnyTenderCard();
  }

  async expectAnyTenderCard() {
    await expect(this.tenderCards.first()).toBeVisible();
  }
}
