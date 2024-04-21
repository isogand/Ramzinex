export interface MarketItem {
  amount_step: number;
  base_currency_id: number;
  base_currency_symbol: {
    en: string;
    fa: string;
  };
  base_precision: number;
  buy: number;
  crypto_box: number;
  financial: {
    last24h: {
      base_volume: number;
      change_percent: number;
      close: number;
      highest: number;
      lowest: number;
      open: number;
      quote_volume: number;
    };
  };
  icon: string;
  logo: string;
  name: {
    en: string;
    fa: string;
  };
  pair_id: number;
  price_precision: number;
  price_step: number;
  quote_currency_id: number;
  quote_currency_symbol: {
    en: string;
    fa: string;
  };
  quote_precision: number;
  sell: number;
  show_order: number;
  tv_symbol: {
    international: string;
    ramzinex: string;
  };
  url_name: string;
  web_link: string;
}
