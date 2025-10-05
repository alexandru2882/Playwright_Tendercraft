import { tendercraftTest as test, expect } from '../fixtures/auth.fixture';
import { ExploreTendersPage } from '../pages/explore-tenders.page';
import { tendercraftConfig } from '../utils/env';

const SAMPLE_SEARCH_TERM = 'construction';

if (!tendercraftConfig.email || !tendercraftConfig.password) {
  test.skip(true, 'TenderCraft credentials are not configured.');
}

test.describe('Explore Tenders', () => {
  test('allows searching tenders by keyword', async ({ authenticatedPage }) => {
    const explorePage = new ExploreTendersPage(authenticatedPage);

    await explorePage.goto();
    await explorePage.searchFor(SAMPLE_SEARCH_TERM);
    await explorePage.expectAnyTenderCard();

    const cardTitles = await explorePage.tenderCards.evaluateAll(cards =>
      cards.map(card => card.textContent?.toLowerCase() ?? '')
    );

    expect(cardTitles.some(title => title.includes('constr'))).toBeTruthy();
  });

  test('filters tenders by status', async ({ authenticatedPage }) => {
    const explorePage = new ExploreTendersPage(authenticatedPage);

    await explorePage.goto();
    await explorePage.selectStatus('Starter');
    await explorePage.expectAnyTenderCard();
  });
});
