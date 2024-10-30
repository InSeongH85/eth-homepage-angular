export const environment = {
  production: false,
  SITE_NAME: 'ETH',
  SITE_CODE: 'ETH',
  // API_URL: 'https://lope2.inek.kr/solars-api',
  // WS_URL: 'wss://lope2.inek.kr/solars-api/ws/dashboard/widget-states',
  LOCALE: 'ko',
  PRICE_LABEL: {
    LABEL: $localize`원`,
    POSITION: 'after'
  },
  INFURA_API_KEY: '91da5aba061543259f22e9fce7816b83',
  PAGE_SIZE: 10,
  TO_DATE_FUNC_NAME: `TO_DATE('?', 'YYYY-MM-DD')`,
  UPLOAD_LIMIT_SIZE: 307200, // 300MB in kilobytes
};
