export const TENANT_CONFIG = {
  theme: process.env.NEXT_PUBLIC_STORE_THEME || 'default',
  name: process.env.NEXT_PUBLIC_STORE_NAME || null,
  logo: process.env.NEXT_PUBLIC_STORE_LOGO || '/images/logo.svg',
} as const;
