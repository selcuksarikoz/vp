export const COMMERCE_CONSTANTS = {
  apiBaseUrl:
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001',
  revalidate: 120,
} as const;
