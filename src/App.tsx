import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from './features/kb/layouts/AppShell';
import { MdxLayout } from './features/kb/layouts/MdxLayout';

// A wrapper for MDX page lazy imports
function MdxPage({ loader }: { loader: () => Promise<{ default: React.ComponentType }> }) {
  const LazyComponent = lazy(loader);
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
const Introduction = () => <MdxPage loader={() => import('./features/kb/content/start-here/introduction.mdx')} />;

// Dow Theory
const OriginsHistory = () => <MdxPage loader={() => import('./features/kb/content/dow-theory/origins-history.mdx')} />;
const TheSixTenets = () => <MdxPage loader={() => import('./features/kb/content/dow-theory/the-six-tenets.mdx')} />;
const TrendMechanics = () => <MdxPage loader={() => import('./features/kb/content/dow-theory/trend-mechanics.mdx')} />;
const CriticismsLimitations = () => <MdxPage loader={() => import('./features/kb/content/dow-theory/criticisms-limitations.mdx')} />;
const ConnectionToModernFrameworks = () => <MdxPage loader={() => import('./features/kb/content/dow-theory/connection-to-modern-frameworks.mdx')} />;

// 1. Foundations
const MarketStructure = () => <MdxPage loader={() => import('./features/kb/content/foundations/market-structure.mdx')} />;
const CandlesVolume = () => <MdxPage loader={() => import('./features/kb/content/foundations/candles-volume.mdx')} />;
const TimeframesMtf = () => <MdxPage loader={() => import('./features/kb/content/foundations/timeframes-mtf.mdx')} />;
const LiquidityIntuition = () => <MdxPage loader={() => import('./features/kb/content/foundations/liquidity-intuition.mdx')} />;

// 2. Key Levels
const SwingHighLow = () => <MdxPage loader={() => import('./features/kb/content/key-levels/swing-high-low.mdx')} />;
const PdhPdl = () => <MdxPage loader={() => import('./features/kb/content/key-levels/pdh-pdl-pwh-pwl.mdx')} />;
const RoundNumbers = () => <MdxPage loader={() => import('./features/kb/content/key-levels/round-numbers.mdx')} />;
const SessionHighLow = () => <MdxPage loader={() => import('./features/kb/content/key-levels/session-high-low.mdx')} />;

// 3. Price Action
const Bos = () => <MdxPage loader={() => import('./features/kb/content/price-action/bos.mdx')} />;
const Choch = () => <MdxPage loader={() => import('./features/kb/content/price-action/choch.mdx')} />;
const DisplacementImbalance = () => <MdxPage loader={() => import('./features/kb/content/price-action/displacement-imbalance.mdx')} />;
const ReadingWithoutIndicators = () => <MdxPage loader={() => import('./features/kb/content/price-action/reading-without-indicators.mdx')} />;

// 4. Order Block
const WhatIsOb = () => <MdxPage loader={() => import('./features/kb/content/order-block/what-is-ob.mdx')} />;
const IdentifyManually = () => <MdxPage loader={() => import('./features/kb/content/order-block/identify-manually.mdx')} />;
const MitigationRetest = () => <MdxPage loader={() => import('./features/kb/content/order-block/mitigation-retest.mdx')} />;
const RealVsFake = () => <MdxPage loader={() => import('./features/kb/content/order-block/real-vs-fake.mdx')} />;

// 5. SMC
const BuysideSellside = () => <MdxPage loader={() => import('./features/kb/content/smc/buyside-sellside-liquidity.mdx')} />;
const LiquiditySweep = () => <MdxPage loader={() => import('./features/kb/content/smc/liquidity-sweep.mdx')} />;
const Fvg = () => <MdxPage loader={() => import('./features/kb/content/smc/fvg.mdx')} />;
const PremiumDiscountEq = () => <MdxPage loader={() => import('./features/kb/content/smc/premium-discount-eq.mdx')} />;

// 6. ICT
const KillzonesSessions = () => <MdxPage loader={() => import('./features/kb/content/ict/killzones-sessions.mdx')} />;
const PdArrays = () => <MdxPage loader={() => import('./features/kb/content/ict/pd-arrays.mdx')} />;
const Ote = () => <MdxPage loader={() => import('./features/kb/content/ict/ote.mdx')} />;
const JudasSwing = () => <MdxPage loader={() => import('./features/kb/content/ict/judas-swing.mdx')} />;

// 7. Confluence
const WhatIsConfluence = () => <MdxPage loader={() => import('./features/kb/content/confluence/what-is-confluence.mdx')} />;
const StackingFactors = () => <MdxPage loader={() => import('./features/kb/content/confluence/stacking-factors.mdx')} />;
const GradingLevels = () => <MdxPage loader={() => import('./features/kb/content/confluence/grading-levels.mdx')} />;

// Putting It Together
const HowFrameworksRelate = () => <MdxPage loader={() => import('./features/kb/content/together/how-frameworks-relate.mdx')} />;
const HtfLtfWorkflow = () => <MdxPage loader={() => import('./features/kb/content/together/htf-ltf-workflow.mdx')} />;
const GlossaryPage = () => <MdxPage loader={() => import('./features/kb/content/together/glossary.mdx')} />;

// Risk Management
const WhyRiskIsEverything = () => <MdxPage loader={() => import('./features/kb/content/risk-management/why-risk-is-everything.mdx')} />;
const PositionSizing = () => <MdxPage loader={() => import('./features/kb/content/risk-management/position-sizing.mdx')} />;
const ScalingIntoAZone = () => <MdxPage loader={() => import('./features/kb/content/risk-management/scaling-into-a-zone.mdx')} />;
const BreakevenMath = () => <MdxPage loader={() => import('./features/kb/content/risk-management/breakeven-math.mdx')} />;
const DrawdownRecovery = () => <MdxPage loader={() => import('./features/kb/content/risk-management/drawdown-recovery.mdx')} />;
const Expectancy = () => <MdxPage loader={() => import('./features/kb/content/risk-management/expectancy.mdx')} />;
const RiskOfRuinAndStreaks = () => <MdxPage loader={() => import('./features/kb/content/risk-management/risk-of-ruin-and-streaks.mdx')} />;
const TradeManagementAndStops = () => <MdxPage loader={() => import('./features/kb/content/risk-management/trade-management-and-stops.mdx')} />;
const TheRiskChecklist = () => <MdxPage loader={() => import('./features/kb/content/risk-management/the-risk-checklist.mdx')} />;

// Strategies
const OverviewNoUniversalBest = () => <MdxPage loader={() => import('./features/kb/content/strategies/overview-no-universal-best.mdx')} />;
const TrendFollowingPullback = () => <MdxPage loader={() => import('./features/kb/content/strategies/trend-following-pullback.mdx')} />;
const BreakoutRetest = () => <MdxPage loader={() => import('./features/kb/content/strategies/breakout-retest.mdx')} />;
const MomentumContinuation = () => <MdxPage loader={() => import('./features/kb/content/strategies/momentum-continuation.mdx')} />;
const MeanReversion = () => <MdxPage loader={() => import('./features/kb/content/strategies/mean-reversion.mdx')} />;
const TheWaitProtocol = () => <MdxPage loader={() => import('./features/kb/content/strategies/the-wait-protocol.mdx')} />;

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

        {/* 2. Key Levels */}
        <Route path="/key-levels/swing-high-low" element={<SwingHighLow />} />
        <Route path="/key-levels/pdh-pdl-pwh-pwl" element={<PdhPdl />} />
        <Route path="/key-levels/round-numbers" element={<RoundNumbers />} />
        <Route path="/key-levels/session-high-low" element={<SessionHighLow />} />

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
