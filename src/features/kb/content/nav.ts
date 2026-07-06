export interface NavItem {
  label: { en: string, vi: string };
  slug: string;
  path: string;
  children?: NavItem[];
}

export interface NavSection {
  label: { en: string, vi: string };
  prefix: string;
  icon: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    label: { en: 'Start Here', vi: 'Bắt Đầu' },
    prefix: '/',
    icon: '🚀',
    items: [
      { label: { en: 'Introduction', vi: 'Giới Thiệu' }, slug: 'introduction', path: '/' },
    ],
  },
  {
    label: { en: 'Risk Management', vi: 'Quản Lý Rủi Ro' },
    prefix: '/risk-management',
    icon: '🛡️',
    items: [
      { label: { en: 'Why Risk is Everything', vi: 'Tại Sao Rủi Ro Là Tất Cả' }, slug: 'why-risk-is-everything', path: '/risk-management/why-risk-is-everything' },
      { label: { en: 'Position Sizing', vi: 'Kích Thước Vị Thế' }, slug: 'position-sizing', path: '/risk-management/position-sizing' },
      { label: { en: 'Scaling Into a Zone', vi: 'Vào Lệnh Từng Phần (Scaling In)' }, slug: 'scaling-into-a-zone', path: '/risk-management/scaling-into-a-zone' },
      { label: { en: 'Breakeven Math', vi: 'Toán Học Hòa Vốn' }, slug: 'breakeven-math', path: '/risk-management/breakeven-math' },
      { label: { en: 'Drawdown Recovery', vi: 'Phục Hồi Sụt Giảm' }, slug: 'drawdown-recovery', path: '/risk-management/drawdown-recovery' },
      { label: { en: 'Expectancy', vi: 'Kỳ Vọng' }, slug: 'expectancy', path: '/risk-management/expectancy' },
      { label: { en: 'Risk of Ruin & Streaks', vi: 'Rủi Ro Cháy Tài Khoản & Chuỗi Thua' }, slug: 'risk-of-ruin-and-streaks', path: '/risk-management/risk-of-ruin-and-streaks' },
      { label: { en: 'Trade Management & Stops', vi: 'Quản Lý Giao Dịch & Dừng Lỗ' }, slug: 'trade-management-and-stops', path: '/risk-management/trade-management-and-stops' },
      { label: { en: 'The Risk Checklist', vi: 'Danh Sách Kiểm Tra Rủi Ro' }, slug: 'the-risk-checklist', path: '/risk-management/the-risk-checklist' },
    ],
  },
  {
    label: { en: 'Gold Context', vi: 'Bối Cảnh Vàng' },
    prefix: '/gold-context',
    icon: '🥇',
    items: [
      { label: { en: 'Why Gold Moves', vi: 'Tại Sao Vàng Biến Động' }, slug: 'why-gold-moves', path: '/gold-context/why-gold-moves' },
      { label: { en: 'The Economic Calendar', vi: 'Lịch Kinh Tế' }, slug: 'the-economic-calendar', path: '/gold-context/the-economic-calendar' },
      { label: { en: 'Trading Around News', vi: 'Giao Dịch Quanh Tin Tức' }, slug: 'trading-around-news', path: '/gold-context/trading-around-news' },
      { label: { en: 'DXY and Real Yields', vi: 'DXY Và Lợi Suất Thực' }, slug: 'dxy-and-real-yields', path: '/gold-context/dxy-and-real-yields' },
      { label: { en: 'Risk On Risk Off', vi: 'Khẩu Vị Rủi Ro (Risk On/Off)' }, slug: 'risk-on-risk-off', path: '/gold-context/risk-on-risk-off' },
    ],
  },
  {
    label: { en: 'Dow Theory', vi: 'Lý Thuyết Dow' },
    prefix: '/dow-theory',
    icon: '🏛️',
    items: [
      { label: { en: 'Origins & History', vi: 'Nguồn Gốc & Lịch Sử' }, slug: 'origins-history', path: '/dow-theory/origins-history' },
      { label: { en: 'The Six Tenets', vi: 'Sáu Nguyên Lý' }, slug: 'the-six-tenets', path: '/dow-theory/the-six-tenets' },
      { label: { en: 'Trend Mechanics', vi: 'Cơ Chế Xu Hướng' }, slug: 'trend-mechanics', path: '/dow-theory/trend-mechanics' },
      { label: { en: 'Criticisms & Limitations', vi: 'Những Lời Chỉ Trích & Hạn Chế' }, slug: 'criticisms-limitations', path: '/dow-theory/criticisms-limitations' },
      { label: { en: 'Connection to Modern Frameworks', vi: 'Kết Nối Với Các Phương Pháp Hiện Đại' }, slug: 'connection-to-modern-frameworks', path: '/dow-theory/connection-to-modern-frameworks' },
    ],
  },
  {
    label: { en: '1. Foundations', vi: '1. Nền Tảng' },
    prefix: '/foundations',
    icon: '🏗️',
    items: [
      { label: { en: 'Market Structure', vi: 'Cấu Trúc Thị Trường' }, slug: 'market-structure', path: '/foundations/market-structure' },
      { label: { en: 'Candles & Volume', vi: 'Nến & Khối Lượng' }, slug: 'candles-volume', path: '/foundations/candles-volume' },
      { label: { en: 'Timeframes & MTF', vi: 'Khung Thời Gian & MTF' }, slug: 'timeframes-mtf', path: '/foundations/timeframes-mtf' },
      { label: { en: 'Liquidity Intuition', vi: 'Trực Giác Thanh Khoản' }, slug: 'liquidity-intuition', path: '/foundations/liquidity-intuition' },
    ],
  },
  {
    label: { en: 'Momentum & EMAs', vi: 'Động Lượng & EMA' },
    prefix: '/momentum',
    icon: '🌊',
    items: [
      { label: { en: 'What is an EMA?', vi: 'EMA Là Gì?' }, slug: 'what-an-ema-is', path: '/momentum/what-an-ema-is' },
      { label: { en: 'EMA 200: The Trend Filter', vi: 'EMA 200: Bộ Lọc Xu Hướng' }, slug: 'ema-200-the-trend-filter', path: '/momentum/ema-200-the-trend-filter' },
      { label: { en: 'EMA 50 & The Stack', vi: 'EMA 50 & Xếp Chồng (The Stack)' }, slug: 'ema-50-and-the-stack', path: '/momentum/ema-50-and-the-stack' },
      { label: { en: 'Dynamic Support & Resistance', vi: 'Hỗ Trợ & Kháng Cự Động' }, slug: 'dynamic-support-resistance', path: '/momentum/dynamic-support-resistance' },
      { label: { en: 'Golden & Death Cross', vi: 'Giao Cắt Vàng & Giao Cắt Tử Thần' }, slug: 'golden-and-death-cross', path: '/momentum/golden-and-death-cross' },
      { label: { en: 'Momentum Shift', vi: 'Sự Dịch Chuyển Động Lượng' }, slug: 'momentum-shift', path: '/momentum/momentum-shift' },
    ],
  },
  {
    label: { en: 'Divergence', vi: 'Phân Kỳ' },
    prefix: '/divergence',
    icon: '🔍',
    items: [
      { label: { en: 'What Divergence Is', vi: 'Phân Kỳ Là Gì' }, slug: 'what-divergence-is', path: '/divergence/what-divergence-is' },
      { label: { en: 'Regular vs Hidden', vi: 'Phân Kỳ Thường và Kín' }, slug: 'regular-vs-hidden', path: '/divergence/regular-vs-hidden' },
      { label: { en: 'Trading Divergence Safely', vi: 'Giao Dịch Phân Kỳ An Toàn' }, slug: 'trading-divergence-safely', path: '/divergence/trading-divergence-safely' },
    ],
  },
  {
    label: { en: '2. Key Levels', vi: '2. Các Mức Quan Trọng' },
    prefix: '/key-levels',
    icon: '📍',
    items: [
      { label: { en: 'Swing High / Low', vi: 'Đỉnh / Đáy (Swing)' }, slug: 'swing-high-low', path: '/key-levels/swing-high-low' },
      { label: { en: 'PDH/PDL & PWH/PWL', vi: 'PDH/PDL & PWH/PWL' }, slug: 'pdh-pdl-pwh-pwl', path: '/key-levels/pdh-pdl-pwh-pwl' },
      { label: { en: 'Round Numbers', vi: 'Số Tròn' }, slug: 'round-numbers', path: '/key-levels/round-numbers' },
      { label: { en: 'Session Highs & Lows', vi: 'Đỉnh & Đáy Phiên' }, slug: 'session-high-low', path: '/key-levels/session-high-low' },
    ],
  },
  {
    label: { en: 'Support/Resistance', vi: 'Hỗ Trợ/Kháng Cự' },
    prefix: '/support-resistance',
    icon: '🚧',
    items: [
      { label: { en: 'Support and Resistance', vi: 'Hỗ Trợ và Kháng Cự' }, slug: 'support-and-resistance', path: '/support-resistance/support-and-resistance' },
      { label: { en: 'Role Reversal Flip', vi: 'Đảo Vai Trò (Flip)' }, slug: 'role-reversal-flip', path: '/support-resistance/role-reversal-flip' },
      { label: { en: 'Supply and Demand Zones', vi: 'Vùng Cung & Cầu' }, slug: 'supply-and-demand-zones', path: '/support-resistance/supply-and-demand-zones' },
      { label: { en: 'Zone Quality', vi: 'Chất Lượng Vùng' }, slug: 'zone-quality', path: '/support-resistance/zone-quality' },
    ],
  },
  {
    label: { en: '3. Pure Price Action', vi: '3. Hành Động Giá Thuần Túy' },
    prefix: '/price-action',
    icon: '📈',
    items: [
      { label: { en: 'BOS', vi: 'BOS' }, slug: 'bos', path: '/price-action/bos' },
      { label: { en: 'CHoCH', vi: 'CHoCH' }, slug: 'choch', path: '/price-action/choch' },
      { label: { en: 'Displacement & Imbalance', vi: 'Sự Dịch Chuyển & Mất Cân Bằng (Imbalance)' }, slug: 'displacement-imbalance', path: '/price-action/displacement-imbalance' },
      { label: { en: 'Reading Without Indicators', vi: 'Đọc Biểu Đồ Không Cần Chỉ Báo' }, slug: 'reading-without-indicators', path: '/price-action/reading-without-indicators' },
    ],
  },
  {
    label: { en: 'Liquidity', vi: 'Thanh Khoản' },
    prefix: '/liquidity',
    icon: '💧',
    items: [
      { label: { en: 'What Liquidity Is', vi: 'Thanh Khoản Là Gì' }, slug: 'what-liquidity-is', path: '/liquidity/what-liquidity-is' },
      { label: { en: 'The Liquidity Map', vi: 'Bản Đồ Thanh Khoản' }, slug: 'the-liquidity-map', path: '/liquidity/the-liquidity-map' },
      { label: { en: 'Buy-side vs Sell-side', vi: 'Buy-side vs Sell-side' }, slug: 'buy-side-vs-sell-side', path: '/liquidity/buy-side-vs-sell-side' },
      { label: { en: 'Sweeps, Grabs & Stop Hunts', vi: 'Quét, Lấy & Săn Dừng Lỗ' }, slug: 'sweeps-grabs-and-stop-hunts', path: '/liquidity/sweeps-grabs-and-stop-hunts' },
      { label: { en: 'Inducement & Becoming Liquidity', vi: 'Dụ Dỗ & Trở Thành Thanh Khoản' }, slug: 'inducement-and-becoming-liquidity', path: '/liquidity/inducement-and-becoming-liquidity' },
      { label: { en: 'Using Liquidity as a Target', vi: 'Dùng Thanh Khoản Làm Mục Tiêu' }, slug: 'using-liquidity-as-a-target', path: '/liquidity/using-liquidity-as-a-target' },
    ],
  },
  {
    label: { en: '4. Order Block', vi: '4. Khối Lệnh (Order Block)' },
    prefix: '/order-block',
    icon: '🧱',
    items: [
      { label: { en: 'What Is an OB', vi: 'OB Là Gì' }, slug: 'what-is-ob', path: '/order-block/what-is-ob' },
      { label: { en: 'Identify Manually', vi: 'Xác Định Thủ Công' }, slug: 'identify-manually', path: '/order-block/identify-manually' },
      { label: { en: 'Mitigation & Retest', vi: 'Giảm Nhẹ (Mitigation) & Chạm Lại (Retest)' }, slug: 'mitigation-retest', path: '/order-block/mitigation-retest' },
      { label: { en: 'Real vs Fake OBs', vi: 'OB Thật vs Giả' }, slug: 'real-vs-fake', path: '/order-block/real-vs-fake' },
    ],
  },
  {
    label: { en: 'Wyckoff', vi: 'Wyckoff' },
    prefix: '/wyckoff',
    icon: '⚖️',
    items: [
      { label: { en: 'Who Was Wyckoff and the Three Laws', vi: 'Wyckoff Là Ai và Ba Quy Luật' }, slug: 'who-was-wyckoff-and-the-three-laws', path: '/wyckoff/who-was-wyckoff-and-the-three-laws' },
      { label: { en: 'Accumulation Schematic', vi: 'Mô Hình Tích Lũy' }, slug: 'accumulation-schematic', path: '/wyckoff/accumulation-schematic' },
      { label: { en: 'Distribution Schematic', vi: 'Mô Hình Phân Phối' }, slug: 'distribution-schematic', path: '/wyckoff/distribution-schematic' },
      { label: { en: 'The Spring and Upthrust', vi: 'Spring (Rũ Bỏ) & Upthrust (Tăng Giả)' }, slug: 'the-spring-and-upthrust', path: '/wyckoff/the-spring-and-upthrust' },
      { label: { en: 'Phases and Events', vi: 'Các Giai Đoạn & Sự Kiện' }, slug: 'phases-and-events', path: '/wyckoff/phases-and-events' },
    ],
  },
  {
    label: { en: '5. SMC', vi: '5. SMC' },
    prefix: '/smc',
    icon: '🏦',
    items: [
      { label: { en: 'Buy-side / Sell-side Liquidity', vi: 'Buy-side / Sell-side Liquidity' }, slug: 'buyside-sellside-liquidity', path: '/smc/buyside-sellside-liquidity' },
      { label: { en: 'Liquidity Sweep', vi: 'Quét Thanh Khoản' }, slug: 'liquidity-sweep', path: '/smc/liquidity-sweep' },
      { label: { en: 'Fair Value Gap (FVG)', vi: 'Khoảng Trống Giá Trị Hợp Lý (FVG)' }, slug: 'fvg', path: '/smc/fvg' },
      { label: { en: 'Premium / Discount / EQ', vi: 'Premium / Discount / EQ' }, slug: 'premium-discount-eq', path: '/smc/premium-discount-eq' },
    ],
  },
  {
    label: { en: '6. ICT Concepts', vi: '6. Khái Niệm ICT' },
    prefix: '/ict',
    icon: '🎯',
    items: [
      { label: { en: 'Killzones & Sessions', vi: 'Killzones & Các Phiên' }, slug: 'killzones-sessions', path: '/ict/killzones-sessions' },
      { label: { en: 'PD Arrays', vi: 'PD Arrays' }, slug: 'pd-arrays', path: '/ict/pd-arrays' },
      { label: { en: 'Optimal Trade Entry', vi: 'Điểm Vào Lệnh Tối Ưu (OTE)' }, slug: 'ote', path: '/ict/ote' },
      { label: { en: 'Judas Swing', vi: 'Cú Lừa Judas Swing' }, slug: 'judas-swing', path: '/ict/judas-swing' },
    ],
  },
  {
    label: { en: '7. Confluence', vi: '7. Hội Tụ (Confluence)' },
    prefix: '/confluence',
    icon: '🔗',
    items: [
      { label: { en: 'What Is Confluence', vi: 'Hội Tụ Là Gì' }, slug: 'what-is-confluence', path: '/confluence/what-is-confluence' },
      { label: { en: 'Stacking Factors', vi: 'Xếp Chồng Các Yếu Tố' }, slug: 'stacking-factors', path: '/confluence/stacking-factors' },
      { label: { en: 'Grading Levels', vi: 'Chấm Điểm Các Mức Giá' }, slug: 'grading-levels', path: '/confluence/grading-levels' },
    ],
  },
  {
    label: { en: 'Strategies', vi: 'Chiến Lược' },
    prefix: '/strategies',
    icon: '📖',
    items: [
      { label: { en: 'Overview: No Universal Best', vi: 'Tổng Quan: Không Có Gì Là Tuyệt Đối' }, slug: 'overview-no-universal-best', path: '/strategies/overview-no-universal-best' },
      { label: { en: 'Trend-Following Pullback', vi: 'Hồi Giá Theo Xu Hướng' }, slug: 'trend-following-pullback', path: '/strategies/trend-following-pullback' },
      { label: { en: 'Breakout & Retest', vi: 'Phá Vỡ & Chạm Lại' }, slug: 'breakout-retest', path: '/strategies/breakout-retest' },
      { label: { en: 'Momentum Continuation', vi: 'Tiếp Diễn Động Lượng' }, slug: 'momentum-continuation', path: '/strategies/momentum-continuation' },
      { label: { en: 'Mean Reversion', vi: 'Hoàn Khôi Về Mức Trung Bình' }, slug: 'mean-reversion', path: '/strategies/mean-reversion' },
      { label: { en: 'The WAIT Protocol', vi: 'Giao Thức WAIT' }, slug: 'the-wait-protocol', path: '/strategies/the-wait-protocol' },
    ],
  },
  {
    label: { en: 'Volatility & ATR', vi: 'Biến Động & ATR' },
    prefix: '/volatility',
    icon: '📈',
    items: [
      { label: { en: 'What is Volatility', vi: 'Biến Động Là Gì' }, slug: 'what-is-volatility', path: '/volatility/what-is-volatility' },
      { label: { en: 'ATR Explained', vi: 'Giải Thích ATR' }, slug: 'atr-explained', path: '/volatility/atr-explained' },
      { label: { en: 'ATR Based Stops', vi: 'Dừng Lỗ Dựa Trên ATR' }, slug: 'atr-based-stops', path: '/volatility/atr-based-stops' },
      { label: { en: 'Volatility and Position Size', vi: 'Biến Động Và Kích Thước Vị Thế' }, slug: 'volatility-and-position-size', path: '/volatility/volatility-and-position-size' },
      { label: { en: 'Volatility Regimes', vi: 'Các Chế Độ Biến Động' }, slug: 'volatility-regimes', path: '/volatility/volatility-regimes' },
    ],
  },
  {
    label: { en: 'Putting It Together', vi: 'Kết Hợp Lại' },
    prefix: '/together',
    icon: '🧩',
    items: [
      { label: { en: 'How Frameworks Relate', vi: 'Sự Liên Kết Các Phương Pháp' }, slug: 'how-frameworks-relate', path: '/together/how-frameworks-relate' },
      { label: { en: 'HTF→LTF Workflow', vi: 'Quy Trình HTF→LTF' }, slug: 'htf-ltf-workflow', path: '/together/htf-ltf-workflow' },
      { label: { en: 'Glossary', vi: 'Thuật Ngữ' }, slug: 'glossary', path: '/together/glossary' },
    ],
  },
  {
    label: { en: 'Scalping Masterclass', vi: 'Khóa Học Scalping' },
    prefix: '/scalping-masterclass',
    icon: '⚡',
    items: [
      { label: { en: 'The Scalper Mindset', vi: 'Tư Duy Scalper' }, slug: 'the-scalper-mindset', path: '/scalping-masterclass/the-scalper-mindset' },
      { label: { en: 'Price Action & Structure', vi: 'Hành Động Giá & Cấu Trúc' }, slug: 'price-action-and-structure', path: '/scalping-masterclass/price-action-and-structure' },
      { label: { en: 'Chart Patterns', vi: 'Các Mô Hình Biểu Đồ' }, slug: 'chart-patterns-for-scalping', path: '/scalping-masterclass/chart-patterns-for-scalping' },
      { label: { en: 'Indicator Confluence', vi: 'Hội Tụ Chỉ Báo' }, slug: 'indicator-confluence-system', path: '/scalping-masterclass/indicator-confluence-system' },
    ],
  },
];

/** Flat list of all routes for search indexing and route generation */
export function flattenNav(): NavItem[] {
  return navigation.flatMap((section) => section.items);
}
