import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from './features/kb/layouts/AppShell';
import { MdxLayout } from './features/kb/layouts/MdxLayout';
import { useLanguage } from './shared/contexts/LanguageContext';

// A wrapper for MDX page lazy imports
function MdxPage({ path }: { path: string }) {
  const { lang } = useLanguage();
  const LazyComponent = lazy(() => 
    import(`./features/kb/content/${path}.${lang}.mdx`)
      .catch(() => import(`./features/kb/content/${path}.en.mdx`))
  );
  return (
    <Suspense fallback={<div className="text-text-muted py-10 text-center animate-pulse">Loading…</div>}>
      <MdxLayout>
        <LazyComponent />
      </MdxLayout>
    </Suspense>
  );
}

// --- Lazy page loaders ---
// Start Here
const Introduction = () => <MdxPage path="start-here/introduction" />;

// Dow Theory
const OriginsHistory = () => <MdxPage path="dow-theory/origins-history" />;
const TheSixTenets = () => <MdxPage path="dow-theory/the-six-tenets" />;
const TrendMechanics = () => <MdxPage path="dow-theory/trend-mechanics" />;
const CriticismsLimitations = () => <MdxPage path="dow-theory/criticisms-limitations" />;
const ConnectionToModernFrameworks = () => <MdxPage path="dow-theory/connection-to-modern-frameworks" />;

// 1. Foundations
const MarketStructure = () => <MdxPage path="foundations/market-structure" />;
const CandlesVolume = () => <MdxPage path="foundations/candles-volume" />;
const TimeframesMtf = () => <MdxPage path="foundations/timeframes-mtf" />;
const LiquidityIntuition = () => <MdxPage path="foundations/liquidity-intuition" />;

// Momentum & EMAs
const WhatIsAnEma = () => <MdxPage path="momentum/what-an-ema-is" />;
const Ema200TheTrendFilter = () => <MdxPage path="momentum/ema-200-the-trend-filter" />;
const Ema50AndTheStack = () => <MdxPage path="momentum/ema-50-and-the-stack" />;
const DynamicSupportResistance = () => <MdxPage path="momentum/dynamic-support-resistance" />;
const GoldenAndDeathCross = () => <MdxPage path="momentum/golden-and-death-cross" />;
const MomentumShift = () => <MdxPage path="momentum/momentum-shift" />;

// 2. Key Levels
const SwingHighLow = () => <MdxPage path="key-levels/swing-high-low" />;
const PdhPdl = () => <MdxPage path="key-levels/pdh-pdl-pwh-pwl" />;
const RoundNumbers = () => <MdxPage path="key-levels/round-numbers" />;
const SessionHighLow = () => <MdxPage path="key-levels/session-high-low" />;

// 3. Price Action
const Bos = () => <MdxPage path="price-action/bos" />;
const Choch = () => <MdxPage path="price-action/choch" />;
const DisplacementImbalance = () => <MdxPage path="price-action/displacement-imbalance" />;
const ReadingWithoutIndicators = () => <MdxPage path="price-action/reading-without-indicators" />;

// 4. Order Block
const WhatIsOb = () => <MdxPage path="order-block/what-is-ob" />;
const IdentifyManually = () => <MdxPage path="order-block/identify-manually" />;
const MitigationRetest = () => <MdxPage path="order-block/mitigation-retest" />;
const RealVsFake = () => <MdxPage path="order-block/real-vs-fake" />;

// Liquidity
const WhatLiquidityIs = () => <MdxPage path="liquidity/what-liquidity-is" />;
const TheLiquidityMap = () => <MdxPage path="liquidity/the-liquidity-map" />;
const BuySideVsSellSide = () => <MdxPage path="liquidity/buy-side-vs-sell-side" />;
const SweepsGrabsAndStopHunts = () => <MdxPage path="liquidity/sweeps-grabs-and-stop-hunts" />;
const InducementAndBecomingLiquidity = () => <MdxPage path="liquidity/inducement-and-becoming-liquidity" />;
const UsingLiquidityAsATarget = () => <MdxPage path="liquidity/using-liquidity-as-a-target" />;

// 5. SMC
const BuysideSellside = () => <MdxPage path="smc/buyside-sellside-liquidity" />;
const LiquiditySweep = () => <MdxPage path="smc/liquidity-sweep" />;
const Fvg = () => <MdxPage path="smc/fvg" />;
const PremiumDiscountEq = () => <MdxPage path="smc/premium-discount-eq" />;

// 6. ICT
const KillzonesSessions = () => <MdxPage path="ict/killzones-sessions" />;
const PdArrays = () => <MdxPage path="ict/pd-arrays" />;
const Ote = () => <MdxPage path="ict/ote" />;
const JudasSwing = () => <MdxPage path="ict/judas-swing" />;

// 7. Confluence
const WhatIsConfluence = () => <MdxPage path="confluence/what-is-confluence" />;
const StackingFactors = () => <MdxPage path="confluence/stacking-factors" />;
const GradingLevels = () => <MdxPage path="confluence/grading-levels" />;

// Putting It Together
const HowFrameworksRelate = () => <MdxPage path="together/how-frameworks-relate" />;
const HtfLtfWorkflow = () => <MdxPage path="together/htf-ltf-workflow" />;
const GlossaryPage = () => <MdxPage path="together/glossary" />;

// Risk Management
const WhyRiskIsEverything = () => <MdxPage path="risk-management/why-risk-is-everything" />;
const PositionSizing = () => <MdxPage path="risk-management/position-sizing" />;
const ScalingIntoAZone = () => <MdxPage path="risk-management/scaling-into-a-zone" />;
const BreakevenMath = () => <MdxPage path="risk-management/breakeven-math" />;
const DrawdownRecovery = () => <MdxPage path="risk-management/drawdown-recovery" />;
const Expectancy = () => <MdxPage path="risk-management/expectancy" />;
const RiskOfRuinAndStreaks = () => <MdxPage path="risk-management/risk-of-ruin-and-streaks" />;
const TradeManagementAndStops = () => <MdxPage path="risk-management/trade-management-and-stops" />;
const TheRiskChecklist = () => <MdxPage path="risk-management/the-risk-checklist" />;

// Strategies
const OverviewNoUniversalBest = () => <MdxPage path="strategies/overview-no-universal-best" />;
const TrendFollowingPullback = () => <MdxPage path="strategies/trend-following-pullback" />;
const BreakoutRetest = () => <MdxPage path="strategies/breakout-retest" />;
const MomentumContinuation = () => <MdxPage path="strategies/momentum-continuation" />;
const MeanReversion = () => <MdxPage path="strategies/mean-reversion" />;
const TheWaitProtocol = () => <MdxPage path="strategies/the-wait-protocol" />;

// Divergence
const WhatDivergenceIs = () => <MdxPage path="divergence/what-divergence-is" />;
const RegularVsHidden = () => <MdxPage path="divergence/regular-vs-hidden" />;
const TradingDivergenceSafely = () => <MdxPage path="divergence/trading-divergence-safely" />;

// Support/Resistance
const SupportAndResistance = () => <MdxPage path="support-resistance/support-and-resistance" />;
const RoleReversalFlip = () => <MdxPage path="support-resistance/role-reversal-flip" />;
const SupplyAndDemandZones = () => <MdxPage path="support-resistance/supply-and-demand-zones" />;
const ZoneQuality = () => <MdxPage path="support-resistance/zone-quality" />;

// Wyckoff
const WhoWasWyckoffAndTheThreeLaws = () => <MdxPage path="wyckoff/who-was-wyckoff-and-the-three-laws" />;
const AccumulationSchematic = () => <MdxPage path="wyckoff/accumulation-schematic" />;
const DistributionSchematic = () => <MdxPage path="wyckoff/distribution-schematic" />;
const TheSpringAndUpthrust = () => <MdxPage path="wyckoff/the-spring-and-upthrust" />;
const PhasesAndEvents = () => <MdxPage path="wyckoff/phases-and-events" />;

// Volatility & ATR
const WhatIsVolatility = () => <MdxPage path="volatility/what-is-volatility" />;
const AtrExplained = () => <MdxPage path="volatility/atr-explained" />;
const AtrBasedStops = () => <MdxPage path="volatility/atr-based-stops" />;
const VolatilityAndPositionSize = () => <MdxPage path="volatility/volatility-and-position-size" />;
const VolatilityRegimes = () => <MdxPage path="volatility/volatility-regimes" />;

// Gold Context
const WhyGoldMoves = () => <MdxPage path="gold-context/why-gold-moves" />;
const TheEconomicCalendar = () => <MdxPage path="gold-context/the-economic-calendar" />;
const TradingAroundNews = () => <MdxPage path="gold-context/trading-around-news" />;
const DxyAndRealYields = () => <MdxPage path="gold-context/dxy-and-real-yields" />;
const RiskOnRiskOff = () => <MdxPage path="gold-context/risk-on-risk-off" />;

// Scalping Masterclass
const TheScalperMindset = () => <MdxPage path="scalping-masterclass/the-scalper-mindset" />;
const PriceActionAndStructure = () => <MdxPage path="scalping-masterclass/price-action-and-structure" />;
const ChartPatternsForScalping = () => <MdxPage path="scalping-masterclass/chart-patterns-for-scalping" />;
const IndicatorConfluenceSystem = () => <MdxPage path="scalping-masterclass/indicator-confluence-system" />;

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Introduction />} />

        {/* Dow Theory */}
        <Route path="/dow-theory/origins-history" element={<OriginsHistory />} />
        <Route path="/dow-theory/the-six-tenets" element={<TheSixTenets />} />
        <Route path="/dow-theory/trend-mechanics" element={<TrendMechanics />} />
        <Route path="/dow-theory/criticisms-limitations" element={<CriticismsLimitations />} />
        <Route path="/dow-theory/connection-to-modern-frameworks" element={<ConnectionToModernFrameworks />} />

        {/* 1. Foundations */}
        <Route path="/foundations/market-structure" element={<MarketStructure />} />
        <Route path="/foundations/candles-volume" element={<CandlesVolume />} />
        <Route path="/foundations/timeframes-mtf" element={<TimeframesMtf />} />
        <Route path="/foundations/liquidity-intuition" element={<LiquidityIntuition />} />

        {/* Momentum & EMAs */}
        <Route path="/momentum/what-an-ema-is" element={<WhatIsAnEma />} />
        <Route path="/momentum/ema-200-the-trend-filter" element={<Ema200TheTrendFilter />} />
        <Route path="/momentum/ema-50-and-the-stack" element={<Ema50AndTheStack />} />
        <Route path="/momentum/dynamic-support-resistance" element={<DynamicSupportResistance />} />
        <Route path="/momentum/golden-and-death-cross" element={<GoldenAndDeathCross />} />
        <Route path="/momentum/momentum-shift" element={<MomentumShift />} />

        {/* Divergence */}
        <Route path="/divergence/what-divergence-is" element={<WhatDivergenceIs />} />
        <Route path="/divergence/regular-vs-hidden" element={<RegularVsHidden />} />
        <Route path="/divergence/trading-divergence-safely" element={<TradingDivergenceSafely />} />

        {/* 2. Key Levels */}
        <Route path="/key-levels/swing-high-low" element={<SwingHighLow />} />
        <Route path="/key-levels/pdh-pdl-pwh-pwl" element={<PdhPdl />} />
        <Route path="/key-levels/round-numbers" element={<RoundNumbers />} />
        <Route path="/key-levels/session-high-low" element={<SessionHighLow />} />

        {/* Support/Resistance */}
        <Route path="/support-resistance/support-and-resistance" element={<SupportAndResistance />} />
        <Route path="/support-resistance/role-reversal-flip" element={<RoleReversalFlip />} />
        <Route path="/support-resistance/supply-and-demand-zones" element={<SupplyAndDemandZones />} />
        <Route path="/support-resistance/zone-quality" element={<ZoneQuality />} />

        {/* 3. Price Action */}
        <Route path="/price-action/bos" element={<Bos />} />
        <Route path="/price-action/choch" element={<Choch />} />
        <Route path="/price-action/displacement-imbalance" element={<DisplacementImbalance />} />
        <Route path="/price-action/reading-without-indicators" element={<ReadingWithoutIndicators />} />

        {/* 4. Order Block */}
        <Route path="/order-block/what-is-ob" element={<WhatIsOb />} />
        <Route path="/order-block/identify-manually" element={<IdentifyManually />} />
        <Route path="/order-block/mitigation-retest" element={<MitigationRetest />} />
        <Route path="/order-block/real-vs-fake" element={<RealVsFake />} />

        {/* Liquidity */}
        <Route path="/liquidity/what-liquidity-is" element={<WhatLiquidityIs />} />
        <Route path="/liquidity/the-liquidity-map" element={<TheLiquidityMap />} />
        <Route path="/liquidity/buy-side-vs-sell-side" element={<BuySideVsSellSide />} />
        <Route path="/liquidity/sweeps-grabs-and-stop-hunts" element={<SweepsGrabsAndStopHunts />} />
        <Route path="/liquidity/inducement-and-becoming-liquidity" element={<InducementAndBecomingLiquidity />} />
        <Route path="/liquidity/using-liquidity-as-a-target" element={<UsingLiquidityAsATarget />} />

        {/* Wyckoff */}
        <Route path="/wyckoff/who-was-wyckoff-and-the-three-laws" element={<WhoWasWyckoffAndTheThreeLaws />} />
        <Route path="/wyckoff/accumulation-schematic" element={<AccumulationSchematic />} />
        <Route path="/wyckoff/distribution-schematic" element={<DistributionSchematic />} />
        <Route path="/wyckoff/the-spring-and-upthrust" element={<TheSpringAndUpthrust />} />
        <Route path="/wyckoff/phases-and-events" element={<PhasesAndEvents />} />

        {/* 5. SMC */}
        <Route path="/smc/buyside-sellside-liquidity" element={<BuysideSellside />} />
        <Route path="/smc/liquidity-sweep" element={<LiquiditySweep />} />
        <Route path="/smc/fvg" element={<Fvg />} />
        <Route path="/smc/premium-discount-eq" element={<PremiumDiscountEq />} />

        {/* 6. ICT */}
        <Route path="/ict/killzones-sessions" element={<KillzonesSessions />} />
        <Route path="/ict/pd-arrays" element={<PdArrays />} />
        <Route path="/ict/ote" element={<Ote />} />
        <Route path="/ict/judas-swing" element={<JudasSwing />} />

        {/* 7. Confluence */}
        <Route path="/confluence/what-is-confluence" element={<WhatIsConfluence />} />
        <Route path="/confluence/stacking-factors" element={<StackingFactors />} />
        <Route path="/confluence/grading-levels" element={<GradingLevels />} />

        {/* Putting It Together */}
        <Route path="/together/how-frameworks-relate" element={<HowFrameworksRelate />} />
        <Route path="/together/htf-ltf-workflow" element={<HtfLtfWorkflow />} />
        <Route path="/together/glossary" element={<GlossaryPage />} />

        {/* Strategies */}
        <Route path="/strategies/overview-no-universal-best" element={<OverviewNoUniversalBest />} />
        <Route path="/strategies/trend-following-pullback" element={<TrendFollowingPullback />} />
        <Route path="/strategies/breakout-retest" element={<BreakoutRetest />} />
        <Route path="/strategies/momentum-continuation" element={<MomentumContinuation />} />
        <Route path="/strategies/mean-reversion" element={<MeanReversion />} />
        <Route path="/strategies/the-wait-protocol" element={<TheWaitProtocol />} />

        {/* Volatility & ATR */}
        <Route path="/volatility/what-is-volatility" element={<WhatIsVolatility />} />
        <Route path="/volatility/atr-explained" element={<AtrExplained />} />
        <Route path="/volatility/atr-based-stops" element={<AtrBasedStops />} />
        <Route path="/volatility/volatility-and-position-size" element={<VolatilityAndPositionSize />} />
        <Route path="/volatility/volatility-regimes" element={<VolatilityRegimes />} />

        {/* Risk Management */}
        <Route path="/risk-management/why-risk-is-everything" element={<WhyRiskIsEverything />} />
        <Route path="/risk-management/position-sizing" element={<PositionSizing />} />
        <Route path="/risk-management/scaling-into-a-zone" element={<ScalingIntoAZone />} />
        <Route path="/risk-management/breakeven-math" element={<BreakevenMath />} />
        <Route path="/risk-management/drawdown-recovery" element={<DrawdownRecovery />} />
        <Route path="/risk-management/expectancy" element={<Expectancy />} />
        <Route path="/risk-management/risk-of-ruin-and-streaks" element={<RiskOfRuinAndStreaks />} />
        <Route path="/risk-management/trade-management-and-stops" element={<TradeManagementAndStops />} />
        <Route path="/risk-management/the-risk-checklist" element={<TheRiskChecklist />} />

        {/* Gold Context */}
        <Route path="/gold-context/why-gold-moves" element={<WhyGoldMoves />} />
        <Route path="/gold-context/the-economic-calendar" element={<TheEconomicCalendar />} />
        <Route path="/gold-context/trading-around-news" element={<TradingAroundNews />} />
        <Route path="/gold-context/dxy-and-real-yields" element={<DxyAndRealYields />} />
        <Route path="/gold-context/risk-on-risk-off" element={<RiskOnRiskOff />} />

        {/* Scalping Masterclass */}
        <Route path="/scalping-masterclass/the-scalper-mindset" element={<TheScalperMindset />} />
        <Route path="/scalping-masterclass/price-action-and-structure" element={<PriceActionAndStructure />} />
        <Route path="/scalping-masterclass/chart-patterns-for-scalping" element={<ChartPatternsForScalping />} />
        <Route path="/scalping-masterclass/indicator-confluence-system" element={<IndicatorConfluenceSystem />} />

        {/* 404 */}
        <Route path="*" element={
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-text mb-4">404</h1>
            <p className="text-text-muted">Page not found.</p>
          </div>
        } />
      </Routes>
    </AppShell>
  );
}
