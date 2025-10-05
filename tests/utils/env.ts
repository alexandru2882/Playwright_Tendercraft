export const tendercraftConfig = {
  email: process.env.TENDERCRAFT_EMAIL ?? '',
  password: process.env.TENDERCRAFT_PASSWORD ?? '',
  baseURL: process.env.TENDERCRAFT_BASE_URL ?? 'https://dev.app.tendercraft.ai',
};

export function ensureCredentials() {
  if (!tendercraftConfig.email || !tendercraftConfig.password) {
    throw new Error(
      'TenderCraft credentials are not set. Provide TENDERCRAFT_EMAIL and TENDERCRAFT_PASSWORD in your environment or .env file.'
    );
  }
}
