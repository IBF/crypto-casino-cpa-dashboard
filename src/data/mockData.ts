export type OfferType = 'Crypto' | 'Casino';

export interface Campaign {
  id: string;
  name: string;
  logo: string;
  type: OfferType;
  trafficSource: string;
  geo: string[];
  clicks: number;
  leads: number;
  ftds: number;
  deposits: number;
  recDeposits: number;
  spend: number;
  revenue: number;
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'binance-ww',
    name: 'Binance Global',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png',
    type: 'Crypto',
    trafficSource: 'Facebook Ads',
    geo: ['WW'],
    clicks: 14500,
    leads: 1200,
    ftds: 150,
    deposits: 45000,
    recDeposits: 12000,
    spend: 8500,
    revenue: 16500,
  },
  {
    id: 'bitstarz-eu',
    name: 'BitStarz VIP',
    logo: 'https://www.pngkey.com/png/full/141-1410148_bitstarz-casino-logo.png',
    type: 'Casino',
    trafficSource: 'Native Ads',
    geo: ['DE', 'AT', 'CH'],
    clicks: 8200,
    leads: 650,
    ftds: 80,
    deposits: 28000,
    recDeposits: 9000,
    spend: 4200,
    revenue: 9600,
  },
  {
    id: '1win-latam',
    name: '1win Latam',
    logo: 'https://i.logos-download.com/114075/30164-s640-8fab63424d9cd0a2e12e0b334801a166.png',
    type: 'Casino',
    trafficSource: 'TikTok Ads',
    geo: ['BR', 'MX', 'CO'],
    clicks: 22000,
    leads: 3100,
    ftds: 240,
    deposits: 31000,
    recDeposits: 5000,
    spend: 6000,
    revenue: 14400,
  },
  {
    id: 'pinup-cis',
    name: 'Pin-Up Main',
    logo: 'https://i.logos-download.com/114075/30164-s1280-0f310ab7338bd3107410d47786b73bd4.png',
    type: 'Casino',
    trafficSource: 'SEO / Organic',
    geo: ['KZ', 'UZ'],
    clicks: 12000,
    leads: 800,
    ftds: 110,
    deposits: 18000,
    recDeposits: 6000,
    spend: 2100,
    revenue: 6600,
  },
  {
    id: 'rox-eu',
    name: 'ROX Casino Premium',
    logo: 'https://www.google.com/s2/favicons?domain=roxcasino.com&sz=128',
    type: 'Casino',
    trafficSource: 'Email Drops',
    geo: ['PL', 'CZ'],
    clicks: 4500,
    leads: 210,
    ftds: 45,
    deposits: 12000,
    recDeposits: 3500,
    spend: 1500,
    revenue: 3800,
  },
  {
    id: 'stake-tier1',
    name: 'Stake.com High Roller',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Stake.com_logo.svg/2560px-Stake.com_logo.svg.png',
    type: 'Crypto',
    trafficSource: 'Google Search',
    geo: ['CA', 'NZ', 'IE'],
    clicks: 9500,
    leads: 420,
    ftds: 95,
    deposits: 55000,
    recDeposits: 21000,
    spend: 7800,
    revenue: 18500,
  },
  {
    id: 'bcgame-asia',
    name: 'BC.Game',
    logo: 'https://www.google.com/s2/favicons?domain=bc.game&sz=128',
    type: 'Crypto',
    trafficSource: 'In-app Ads',
    geo: ['JP', 'IN'],
    clicks: 18000,
    leads: 1900,
    ftds: 130,
    deposits: 22000,
    recDeposits: 4000,
    spend: 3500,
    revenue: 7800,
  },
  {
    id: 'melbet-afr',
    name: 'Melbet Sports',
    logo: 'https://www.google.com/s2/favicons?domain=melbet.com&sz=128',
    type: 'Casino',
    trafficSource: 'Telegram',
    geo: ['NG', 'KE'],
    clicks: 25000,
    leads: 4000,
    ftds: 310,
    deposits: 19000,
    recDeposits: 2000,
    spend: 4000,
    revenue: 9300,
  },
  {
    id: 'mostbet-asia',
    name: 'Mostbet Partners',
    logo: 'https://www.google.com/s2/favicons?domain=mostbet.com&sz=128',
    type: 'Casino',
    trafficSource: 'Push Notifications',
    geo: ['BD', 'PK'],
    clicks: 35000,
    leads: 5000,
    ftds: 420,
    deposits: 26000,
    recDeposits: 3000,
    spend: 5200,
    revenue: 12600,
  },
  {
    id: '888starz-ww',
    name: '888Starz Crypto',
    logo: 'https://www.google.com/s2/favicons?domain=888starz.bet&sz=128',
    type: 'Crypto',
    trafficSource: 'Twitter Ads',
    geo: ['WW'],
    clicks: 7400,
    leads: 550,
    ftds: 60,
    deposits: 18000,
    recDeposits: 5000,
    spend: 3100,
    revenue: 7200,
  }
];

export const GEO_OPTIONS = ['WW', 'EU', 'US', 'CA', 'BR', 'MX', 'CO', 'KZ', 'UZ', 'PL', 'CZ', 'NZ', 'IE', 'JP', 'IN', 'NG', 'KE', 'BD', 'PK', 'DE', 'AT', 'CH'];

// We'll multiply these values depending on the "Time Period" selected
export const TIME_MULTIPLIERS = {
  'Today': 0.1,
  'Yesterday': 0.15,
  'This Week': 1.0,
  'This Month': 4.2
};
