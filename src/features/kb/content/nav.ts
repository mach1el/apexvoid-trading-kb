export interface NavItem {
  label: string;
  slug: string;
  path: string;
  children?: NavItem[];
}

export interface NavSection {
  label: string;
  prefix: string;
  icon: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    label: 'Start Here',
    prefix: '/',
    icon: '🚀',
    items: [
      { label: 'Introduction', slug: 'introduction', path: '/' },
    ],
  },
  {
    label: 'Risk Management',
    prefix: '/risk-management',
    icon: '🛡️',
    items: [
      { label: 'Why Risk is Everything', slug: 'why-risk-is-everything', path: '/risk-management/why-risk-is-everything' },
      { label: 'Position Sizing', slug: 'position-sizing', path: '/risk-management/position-sizing' },
      { label: 'Scaling Into a Zone', slug: 'scaling-into-a-zone', path: '/risk-management/scaling-into-a-zone' },
      { label: 'Breakeven Math', slug: 'breakeven-math', path: '/risk-management/breakeven-math' },
      { label: 'Drawdown Recovery', slug: 'drawdown-recovery', path: '/risk-management/drawdown-recovery' },
      { label: 'Expectancy', slug: 'expectancy', path: '/risk-management/expectancy' },
      { label: 'Risk of Ruin & Streaks', slug: 'risk-of-ruin-and-streaks', path: '/risk-management/risk-of-ruin-and-streaks' },
      { label: 'Trade Management & Stops', slug: 'trade-management-and-stops', path: '/risk-management/trade-management-and-stops' },
      { label: 'The Risk Checklist', slug: 'the-risk-checklist', path: '/risk-management/the-risk-checklist' },
    ],
  },
  {
    label: 'Dow Theory',
    prefix: '/dow-theory',
    icon: '🏛️',
    items: [
      { label: 'Origins & History', slug: 'origins-history', path: '/dow-theory/origins-history' },
      { label: 'The Six Tenets', slug: 'the-six-tenets', path: '/dow-theory/the-six-tenets' },
      { label: 'Trend Mechanics', slug: 'trend-mechanics', path: '/dow-theory/trend-mechanics' },
      { label: 'Criticisms & Limitations', slug: 'criticisms-limitations', path: '/dow-theory/criticisms-limitations' },
      { label: 'Connection to Modern Frameworks', slug: 'connection-to-modern-frameworks', path: '/dow-theory/connection-to-modern-frameworks' },
    ],
  },
  {
    label: '1. Foundations',
    prefix: '/foundations',
    icon: '🏗️',
    items: [
      { label: 'Market Structure', slug: 'market-structure', path: '/foundations/market-structure' },
      { label: 'Candles & Volume', slug: 'candles-volume', path: '/foundations/candles-volume' },
      { label: 'Timeframes & MTF', slug: 'timeframes-mtf', path: '/foundations/timeframes-mtf' },
      { label: 'Liquidity Intuition', slug: 'liquidity-intuition', path: '/foundations/liquidity-intuition' },
    ],
  },
  {
    label: '2. Key Levels',
    prefix: '/key-levels',
    icon: '📍',
    items: [
      { label: 'Swing High / Low', slug: 'swing-high-low', path: '/key-levels/swing-high-low' },
      { label: 'PDH/PDL & PWH/PWL', slug: 'pdh-pdl-pwh-pwl', path: '/key-levels/pdh-pdl-pwh-pwl' },
      { label: 'Round Numbers', slug: 'round-numbers', path: '/key-levels/round-numbers' },
      { label: 'Session Highs & Lows', slug: 'session-high-low', path: '/key-levels/session-high-low' },
    ],
  },
  {
    label: '3. Pure Price Action',
    prefix: '/price-action',
    icon: '📈',
    items: [
      { label: 'BOS', slug: 'bos', path: '/price-action/bos' },
      { label: 'CHoCH', slug: 'choch', path: '/price-action/choch' },
      { label: 'Displacement & Imbalance', slug: 'displacement-imbalance', path: '/price-action/displacement-imbalance' },
      { label: 'Reading Without Indicators', slug: 'reading-without-indicators', path: '/price-action/reading-without-indicators' },
    ],
  },
  {
    label: '4. Order Block',
    prefix: '/order-block',
    icon: '🧱',
    items: [
      { label: 'What Is an OB', slug: 'what-is-ob', path: '/order-block/what-is-ob' },
      { label: 'Identify Manually', slug: 'identify-manually', path: '/order-block/identify-manually' },
      { label: 'Mitigation & Retest', slug: 'mitigation-retest', path: '/order-block/mitigation-retest' },
      { label: 'Real vs Fake OBs', slug: 'real-vs-fake', path: '/order-block/real-vs-fake' },
    ],
  },
  {
    label: '5. SMC',
    prefix: '/smc',
    icon: '🏦',
    items: [
      { label: 'Buy-side / Sell-side Liquidity', slug: 'buyside-sellside-liquidity', path: '/smc/buyside-sellside-liquidity' },
      { label: 'Liquidity Sweep', slug: 'liquidity-sweep', path: '/smc/liquidity-sweep' },
      { label: 'Fair Value Gap (FVG)', slug: 'fvg', path: '/smc/fvg' },
      { label: 'Premium / Discount / EQ', slug: 'premium-discount-eq', path: '/smc/premium-discount-eq' },
    ],
  },
  {
    label: '6. ICT Concepts',
    prefix: '/ict',
    icon: '🎯',
    items: [
      { label: 'Killzones & Sessions', slug: 'killzones-sessions', path: '/ict/killzones-sessions' },
      { label: 'PD Arrays', slug: 'pd-arrays', path: '/ict/pd-arrays' },
      { label: 'Optimal Trade Entry', slug: 'ote', path: '/ict/ote' },
      { label: 'Judas Swing', slug: 'judas-swing', path: '/ict/judas-swing' },
    ],
  },
  {
    label: '7. Confluence',
    prefix: '/confluence',
    icon: '🔗',
    items: [
      { label: 'What Is Confluence', slug: 'what-is-confluence', path: '/confluence/what-is-confluence' },
      { label: 'Stacking Factors', slug: 'stacking-factors', path: '/confluence/stacking-factors' },
      { label: 'Grading Levels', slug: 'grading-levels', path: '/confluence/grading-levels' },
    ],
  },
  {
    label: 'Strategies',
    prefix: '/strategies',
    icon: '📖',
    items: [
      { label: 'Overview: No Universal Best', slug: 'overview-no-universal-best', path: '/strategies/overview-no-universal-best' },
      { label: 'Trend-Following Pullback', slug: 'trend-following-pullback', path: '/strategies/trend-following-pullback' },
      { label: 'Breakout & Retest', slug: 'breakout-retest', path: '/strategies/breakout-retest' },
      { label: 'Momentum Continuation', slug: 'momentum-continuation', path: '/strategies/momentum-continuation' },
      { label: 'Mean Reversion', slug: 'mean-reversion', path: '/strategies/mean-reversion' },
      { label: 'The WAIT Protocol', slug: 'the-wait-protocol', path: '/strategies/the-wait-protocol' },
    ],
  },
  {
    label: 'Putting It Together',
    prefix: '/together',
    icon: '🧩',
    items: [
      { label: 'How Frameworks Relate', slug: 'how-frameworks-relate', path: '/together/how-frameworks-relate' },
      { label: 'HTF→LTF Workflow', slug: 'htf-ltf-workflow', path: '/together/htf-ltf-workflow' },
      { label: 'Glossary', slug: 'glossary', path: '/together/glossary' },
    ],
  },
];

/** Flat list of all routes for search indexing and route generation */
export function flattenNav(): NavItem[] {
  return navigation.flatMap((section) => section.items);
}
