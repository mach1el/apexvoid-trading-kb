export interface Point {
  i: number;
  p: number;
}

export interface Annotation {
  t: 'swing' | 'zone' | 'level' | 'arrow' | 'curve' | 'bracket' | 'entries' | 'trend2';
  i?: number;
  p?: number;
  p1?: number;
  p2?: number;
  dir?: 'up' | 'down';
  color?: 'bull' | 'bear' | 'warn' | 'muted' | 'accent' | 'ok' | 'ema' | 'ema50' | 'accent2';
  label?: string;
  dash?: number;
  pts?: Point[];
  i1?: number;
  i2?: number;
  w?: number;
  panel?: 'osc' | 'price';
  a?: { i: number; v: number };
  b?: { i: number; v: number };
}

export interface ChartData {
  id: string;
  title: string;
  sub: string;
  group?: string;
  def: string;
  read: string[];
  trap: string;
  pMin: number;
  pMax: number;
  osc?: number[];
  oscMin?: number;
  oscMax?: number;
  oscLabel?: string;
  c: [number, number, number, number][];
  a?: Annotation[];
}

const CH: ChartData[] = [
 {
  id:"BOS", title:"Break of Structure", sub:"price action · continuation",
  def:"In an uptrend, price closes decisively above the most recent swing high — structure breaks in the trend's direction, confirming continuation.",
  read:[
    "Mark the last <b>swing high (SH)</b> and the <b>higher low (HL)</b> that followed it.",
    "Watch the leg that pushes back up toward the SH.",
    "The <b>close above the SH</b> is the BOS — not the wick. A wick through that closes back under is not a break.",
    "Bias stays bullish; the broken level often becomes support on a retest."
  ],
  trap:"A wick poking above the high is not a BOS. Wait for the candle to <b>close</b> beyond it.",
  pMin:2293,pMax:2333,
  c:[[2302,2304,2298,2300],[2300,2301,2295,2296],[2296,2302,2295,2301],[2301,2309,2300,2308],[2308,2316,2307,2315],[2315,2319,2314,2318],[2318,2319,2312,2313],[2313,2314,2306,2307],[2307,2310,2306,2309],[2309,2315,2308,2314],[2314,2320,2313,2319],[2319,2327,2318,2326],[2326,2329,2323,2327],[2327,2331,2325,2330]],
  a:[
    {t:"swing",i:5,p:2319,dir:"up",label:"SH"},
    {t:"swing",i:7,p:2306,dir:"down",label:"HL"},
    {t:"level",p:2319,dash:1,color:"muted",label:"prior high"},
    {t:"arrow",i:11,p1:2314,p2:2327,color:"bull",label:"BOS"}
  ]
 },
 {
  id:"CHoCH", title:"Change of Character", sub:"price action · reversal warning",
  def:"After a sequence of higher highs and higher lows, price breaks below the last higher low — the first structural sign the uptrend may be turning.",
  read:[
    "Confirm the uptrend: a <b>higher high (HH)</b>, then a <b>higher low (HL)</b>.",
    "The next push up fails to make a new high — a <b>lower high (LH)</b>. First caution flag.",
    "The <b>close below the HL</b> is the CHoCH: character has changed from up to down.",
    "CHoCH signals a possible shift; it is not yet a confirmed downtrend — that needs follow-through."
  ],
  trap:"CHoCH ≠ trade-it-blind reversal. It's an <b>early</b> shift; many resolve back with the trend. Demand confluence.",
  pMin:2296,pMax:2322,
  c:[[2300,2306,2299,2305],[2305,2312,2304,2311],[2311,2319,2310,2318],[2318,2319,2311,2312],[2312,2314,2308,2309],[2309,2316,2308,2315],[2315,2318,2313,2316],[2316,2317,2310,2311],[2311,2312,2306,2307],[2307,2309,2301,2302],[2302,2304,2298,2299]],
  a:[
    {t:"swing",i:2,p:2319,dir:"up",label:"HH"},
    {t:"swing",i:6,p:2318,dir:"up",label:"LH"},
    {t:"level",p:2308,dash:1,color:"warn",label:"last HL"},
    {t:"arrow",i:8,p1:2312,p2:2307,color:"bear",label:"CHoCH"}
  ]
 },
 {
  id:"OB", title:"Order Block", sub:"smart money · demand origin",
  def:"The last opposing (down) candle before a strong bullish displacement that breaks structure. Price often returns to this zone (mitigation) before continuing.",
  read:[
    "Find the <b>displacement</b>: a large bullish candle that breaks structure.",
    "The <b>last bearish candle before it</b> is the order block. Mark its body as the zone.",
    "Wait for price to <b>return and tap the zone</b> — this is mitigation / the retest.",
    "A bullish reaction from the zone is the entry cue; invalidation is a close below the block."
  ],
  trap:"Not every down candle is an OB. It only qualifies if the move out of it was a <b>displacement that broke structure</b>.",
  pMin:2297,pMax:2326,
  c:[[2312,2314,2308,2309],[2309,2311,2304,2305],[2305,2306,2300,2301],[2301,2313,2300,2312],[2312,2317,2311,2316],[2316,2318,2313,2314],[2314,2315,2307,2308],[2308,2309,2303,2305],[2305,2312,2304,2311],[2311,2318,2310,2317],[2317,2323,2316,2322]],
  a:[
    {t:"zone",p1:2306,p2:2301,color:"bull",label:"bullish OB"},
    {t:"arrow",i:3,p1:2301,p2:2312,color:"bull",label:"displacement"},
    {t:"swing",i:7,p:2303,dir:"down",label:"mitigation"}
  ]
 },
 {
  id:"FVG", title:"Fair Value Gap", sub:"smart money · imbalance",
  def:"A three-candle imbalance: when a middle displacement candle is so strong that candle 1's high and candle 3's low don't overlap, leaving a price gap markets tend to revisit.",
  read:[
    "Identify the <b>3-candle sequence</b> around a strong displacement candle.",
    "The <b>gap</b> is the space between candle 1's high and candle 3's low — no trading happened there.",
    "Mark that band as the FVG. Price frequently returns to <b>fill</b> part or all of it.",
    "A reaction from the fill can offer continuation in the displacement's direction."
  ],
  trap:"An FVG is a <b>zone, not a line</b>. Partial fills are common — don't expect the exact edge to hold to the pip.",
  pMin:2295,pMax:2331,
  c:[[2300,2303,2298,2302],[2302,2305,2301,2304],[2304,2318,2303,2317],[2317,2320,2314,2319],[2319,2322,2317,2321],[2321,2323,2315,2316],[2316,2317,2309,2311],[2311,2318,2310,2317],[2317,2324,2316,2323],[2323,2328,2322,2327]],
  a:[
    {t:"zone",p1:2314,p2:2305,color:"warn",label:"FVG (imbalance)"},
    {t:"bracket",i1:1,i2:3,label:"3-candle displacement"},
    {t:"swing",i:6,p:2309,dir:"down",label:"fill"}
  ]
 },
 {
  id:"SWEEP", title:"Liquidity Sweep", sub:"smart money · stop hunt",
  def:"Price spikes just beyond a cluster of resting stops (e.g. equal highs), triggers them, then reverses — liquidity is taken before the real move.",
  read:[
    "Spot the <b>equal highs</b>: two or more highs resting at the same level = pooled stop orders above.",
    "A candle <b>wicks above</b> that level, then <b>closes back below</b> — the sweep.",
    "That failure to hold is the tell: buyers who broke out are trapped.",
    "Reversal down often follows; the sweep high becomes resistance."
  ],
  trap:"A close that <b>holds above</b> the highs is a breakout, not a sweep. The reversal back below is what defines it.",
  pMin:2299,pMax:2329,
  c:[[2310,2316,2309,2315],[2315,2320,2314,2319],[2319,2320,2313,2314],[2314,2316,2311,2312],[2312,2320,2311,2319],[2320,2326,2319,2319],[2319,2320,2312,2313],[2313,2314,2306,2307],[2307,2308,2301,2302]],
  a:[
    {t:"level",p:2320,dash:1,color:"muted",label:"equal highs — liquidity"},
    {t:"arrow",i:5,p1:2320,p2:2326,color:"warn",label:"sweep"},
    {t:"arrow",i:7,p1:2314,p2:2307,color:"bear",label:"reversal"}
  ]
 },
 {
  id:"PD", title:"Premium / Discount / OTE", sub:"smart money · pricing",
  def:"Split a leg in half at equilibrium (EQ). Above EQ is premium (favour selling); below is discount (favour buying). The 62–79% retrace is the Optimal Trade Entry band.",
  read:[
    "Anchor the <b>swing low → swing high</b> of the impulse leg.",
    "<b>EQ = 50%</b>. Upper half is premium, lower half is discount.",
    "For longs, wait for price to retrace into <b>discount</b>, ideally the <b>OTE (62–79%)</b> band.",
    "Entering in discount buys at a better price than chasing in premium — the core of the idea."
  ],
  trap:"Buying in <b>premium</b> (upper half) is the classic mistake — you're paying up right where smart money looks to sell.",
  pMin:2297,pMax:2344,
  c:[[2301,2303,2300,2302],[2302,2309,2301,2308],[2308,2318,2307,2317],[2317,2330,2316,2329],[2329,2340,2328,2339],[2339,2340,2333,2334],[2334,2335,2326,2327],[2327,2328,2318,2319],[2319,2320,2310,2312],[2312,2320,2309,2319],[2319,2329,2318,2328],[2328,2338,2327,2337]],
  a:[
    {t:"zone",p1:2340,p2:2320,color:"bear",label:"premium (sell)"},
    {t:"zone",p1:2320,p2:2300,color:"bull",label:"discount (buy)"},
    {t:"zone",p1:2315,p2:2308,color:"accent2",label:"OTE 62–79%"},
    {t:"level",p:2320,dash:1,color:"muted",label:"EQ 50%"},
    {t:"swing",i:8,p:2310,dir:"down",label:"entry"}
  ]
 },
 {
  id:"PB", title:"Trend-Following Pullback", sub:"strategy · Trend Pullback", group:"Trading strategies · the playbook",
  def:"Buy in the direction of the established trend after a controlled pullback into support — not by chasing the first spike. The strongest long-run evidence base of the common retail strategies.",
  read:[
    "Confirm an <b>uptrend</b> (HH/HL structure, or a rising 20/50 EMA stack).",
    "Wait for a <b>pullback into support</b> — a demand zone, prior level, or the MA band.",
    "Enter only on a <b>confirmation bounce</b>, never on the falling knife.",
    "<b>Stop below the pullback low</b>; trail the winner instead of scalping tiny profit."
  ],
  trap:"Entering mid-pullback with no confirmation. \"Cheap\" is not a signal — let the bounce prove itself.",
  pMin:2296,pMax:2337,
  c:[[2300,2306,2299,2305],[2305,2312,2304,2311],[2311,2319,2310,2318],[2318,2324,2317,2323],[2323,2324,2317,2318],[2318,2319,2312,2313],[2313,2314,2309,2311],[2311,2318,2310,2317],[2317,2323,2316,2322],[2322,2329,2321,2328],[2328,2334,2327,2333]],
  a:[
    {t:"swing",i:3,p:2324,dir:"up",label:"SH"},
    {t:"zone",p1:2314,p2:2309,color:"bull",label:"pullback support"},
    {t:"level",p:2308,dash:1,color:"warn",label:"stop"},
    {t:"arrow",i:7,p1:2311,p2:2317,color:"bull",label:"entry"}
  ]
 },
 {
  id:"BRT", title:"Breakout + Retest", sub:"strategy · Break & Retest",
  def:"Trade only when price closes outside an important range and participation (volume) confirms — then enter on the retest of the broken level as it flips from resistance to support.",
  read:[
    "Define the <b>range</b>: repeated highs form resistance, with orders pooled above.",
    "Require a <b>close outside the range</b> on an expansion candle — ideally rising volume.",
    "Let price return to <b>retest the broken level</b> (now support).",
    "Enter on the hold; stop back inside the range. No close / no volume = no trade."
  ],
  trap:"Chasing the breakout candle itself. The retest gives defined risk; the naked breakout often traps and reverses.",
  pMin:2305,pMax:2337,
  c:[[2308,2316,2307,2315],[2315,2316,2310,2311],[2311,2316,2310,2314],[2314,2316,2311,2312],[2312,2316,2311,2315],[2315,2325,2314,2324],[2324,2326,2320,2321],[2321,2322,2315,2316],[2316,2323,2315,2322],[2322,2329,2321,2328],[2328,2333,2327,2332]],
  a:[
    {t:"level",p:2316,dash:1,color:"muted",label:"range high → flip"},
    {t:"arrow",i:5,p1:2315,p2:2324,color:"bull",label:"breakout"},
    {t:"swing",i:7,p:2315,dir:"down",label:"retest"}
  ]
 },
 {
  id:"MOM", title:"Momentum Continuation", sub:"strategy · Momentum Ride",
  def:"Ride names already showing strong relative strength: after an impulsive leg and a shallow pause (flag), join the continuation rather than trying to call the top.",
  read:[
    "Spot a <b>strong impulse leg</b> — steep, one-sided, high relative strength.",
    "Wait for a <b>shallow, tight consolidation</b> (a flag) that barely gives back ground.",
    "Enter on the <b>break of the flag</b> in the trend direction.",
    "Manage with a trail; exit on a genuine change of character, not the first red candle."
  ],
  trap:"A deep, sloppy pullback is not a flag — it says momentum is fading. Shallow and tight is the tell.",
  pMin:2297,pMax:2345,
  c:[[2300,2304,2299,2303],[2303,2310,2302,2309],[2309,2318,2308,2317],[2317,2326,2316,2325],[2325,2327,2322,2323],[2323,2325,2321,2322],[2322,2324,2320,2323],[2323,2331,2322,2330],[2330,2337,2329,2336],[2336,2342,2335,2341]],
  a:[
    {t:"bracket",i1:0,i2:3,label:"impulse leg"},
    {t:"zone",p1:2327,p2:2320,color:"muted",label:"flag (shallow)"},
    {t:"arrow",i:7,p1:2323,p2:2330,color:"bull",label:"continuation"}
  ]
 },
 {
  id:"MR", title:"Mean Reversion", sub:"strategy · Snap-Back / Fade",
  def:"Fade a stretch to a range extreme back toward the mean. Strong only in clearly range-bound conditions — it degrades fast in trends, so it ranks below the trend strategies for general use.",
  read:[
    "Require a <b>range</b> first: a defined high, low, and a middle (mean / EQ).",
    "Wait for price to <b>overextend to an extreme</b> and show rejection.",
    "<b>Fade</b> back toward the mean; target the middle, not the opposite extreme.",
    "Invalidate fast: a decisive break of the range means the range is over — stand down."
  ],
  trap:"Fading a trend. In a strong trend the \"extreme\" keeps extending — this only works when range is confirmed.",
  pMin:2302,pMax:2325,
  c:[[2312,2314,2308,2309],[2309,2311,2305,2306],[2306,2312,2305,2311],[2311,2317,2310,2316],[2316,2321,2315,2320],[2320,2322,2318,2319],[2319,2320,2313,2314],[2314,2315,2310,2312],[2312,2313,2307,2308]],
  a:[
    {t:"zone",p1:2322,p2:2319,color:"warn",label:"overextension"},
    {t:"level",p:2312,dash:1,color:"ok",label:"mean / EQ"},
    {t:"level",p:2305,dash:1,color:"muted",label:"range low"},
    {t:"arrow",i:5,p1:2319,p2:2314,color:"bear",label:"fade"}
  ]
 },
 {
  id:"SCALE", title:"Scaling Into a Zone", sub:"execution · laddered entry / zone-DCA",
  def:"Split one planned position across a zone instead of firing at a single price. Cap total risk with one stop beyond the zone; ladder the fills to improve the average entry, survive being early, and make partial profit-taking natural. This is planned scale-in — not averaging down.",
  read:[
    "Treat the entry as a <b>zone, not a line</b>. Here: supply 4174–4180, one stop above at 4184.",
    "Decide <b>total size</b> so risk from the avg entry to the stop = your cap (0.20 lot ≈ 2%).",
    "<b>Ladder the fills</b>: 0.05 at 4174/4176/4178/4180 → avg ≈ 4177. Early reversal? already filled. Runs the zone? better average + full size.",
    "On reversal, <b>scale out</b>: bank partial at TP1, push stop to breakeven, let the rest run."
  ],
  trap:"This is NOT martingale. Legit scale-in has a <b>hard stop</b> and a <b>fixed total size set up front</b>. Adding to a loser with no stop to \"lower the average\" is how accounts blow up.",
  pMin:4148,pMax:4186,
  c:[[4162,4166,4160,4165],[4165,4170,4164,4169],[4169,4174,4168,4173],[4173,4176,4172,4176],[4176,4178,4175,4178],[4178,4181,4177,4180],[4180,4182,4176,4177],[4177,4178,4170,4171],[4171,4172,4164,4165],[4165,4166,4158,4160],[4160,4162,4154,4156],[4156,4158,4150,4152]],
  a:[
    {t:"zone",p1:4180,p2:4174,color:"bear",label:"supply · sell zone"},
    {t:"level",p:4184,dash:1,color:"ema",label:"stop 4184 · risk cap 2%"},
    {t:"level",p:4177,dash:1,color:"accent2",label:""},
    {t:"entries",pts:[{i:2,p:4174},{i:3,p:4176},{i:4,p:4178},{i:5,p:4180}],label:"0.05 ×4 → avg 4177"},
    {t:"level",p:4165,dash:1,color:"ok",label:"TP1 · scale out"},
    {t:"arrow",i:7,p1:4178,p2:4171,color:"bear",label:"reversal"}
  ]
 },
 {
  id:"EMA", title:"EMA 50 / 200 — trend filter & dynamic S/R", sub:"momentum · moving averages", group:"Momentum & moving averages",
  def:"The 200 EMA is the regime filter (above = bullish context, below = bearish); the 50 EMA is the intermediate trend and acts as dynamic support/resistance. Price > EMA50 > EMA200 is a clean bullish stack — pullbacks into the 50 are classic continuation spots.",
  read:[
    "Check the <b>EMA 200</b> first: price above it → only hunt longs; below → only shorts. It filters the whole session.",
    "Read the <b>stack</b>: price &gt; EMA50 &gt; EMA200, both sloping up, = healthy uptrend.",
    "In that trend, a <b>pullback into the EMA 50</b> often holds as dynamic support — a lower-risk continuation entry.",
    "Enter on the reaction off the EMA, not on the touch alone; stop below the EMA / pullback low."
  ],
  trap:"EMAs lag and only shine in trends. In a range price chops back and forth across them — the \"bounce\" fails repeatedly. Confirm trend before trusting the touch.",
  pMin:2294,pMax:2349,
  c:[[2302,2306,2300,2305],[2305,2310,2304,2309],[2309,2315,2308,2314],[2314,2320,2313,2319],[2319,2324,2318,2323],[2323,2326,2320,2321],[2321,2322,2315,2316],[2316,2318,2313,2317],[2317,2323,2316,2322],[2322,2328,2321,2327],[2327,2333,2326,2332],[2332,2338,2331,2337],[2337,2342,2336,2341],[2341,2346,2340,2345]],
  a:[
    {t:"curve",color:"ema",pts:[{i:0,p:2297},{i:5,p:2305},{i:9,p:2312},{i:13,p:2317}],label:"EMA 200"},
    {t:"curve",color:"ema50",pts:[{i:0,p:2304},{i:4,p:2314},{i:7,p:2316},{i:10,p:2325},{i:13,p:2334}],label:"EMA 50"},
    {t:"arrow",i:7,p1:2313,p2:2322,color:"bull",label:"bounce off EMA50"}
  ]
 },
 {
  id:"CROSS", title:"Golden / Death Cross + Momentum Shift", sub:"momentum · regime change",
  def:"When the 50 EMA crosses above the 200 it's a golden cross (bullish regime); below is a death cross (bearish). Price reclaiming the 200 and the EMAs turning up signals the momentum shift earlier — the cross confirms it late.",
  read:[
    "Downtrend: price below both EMAs, 50 under 200. Bearish regime.",
    "<b>Momentum shifts first</b>: price reclaims the EMA 200 and the 50's slope flattens then turns up.",
    "The <b>golden cross</b> (50 crossing above 200) confirms the new regime — but it lags the actual low.",
    "Use crosses as <b>bias/context</b>, not entry triggers; combine with a structure shift (CHoCH) for timing."
  ],
  trap:"Trading the cross itself. It fires well after the turn and whipsaws badly in ranges — it's a regime label, not a signal.",
  pMin:2308,pMax:2346,
  c:[[2330,2332,2325,2326],[2326,2328,2320,2321],[2321,2323,2315,2316],[2316,2318,2311,2312],[2312,2316,2310,2315],[2315,2319,2313,2318],[2318,2324,2317,2323],[2323,2329,2322,2328],[2328,2334,2327,2333],[2333,2339,2332,2338],[2338,2343,2337,2342]],
  a:[
    {t:"curve",color:"ema",pts:[{i:0,p:2329},{i:5,p:2324},{i:10,p:2327}],label:"EMA 200"},
    {t:"curve",color:"ema50",pts:[{i:0,p:2326},{i:3,p:2319},{i:6,p:2321},{i:8,p:2327},{i:10,p:2333}],label:"EMA 50"},
    {t:"arrow",i:6,p1:2317,p2:2323,color:"bull",label:"reclaim 200 · shift"},
    {t:"swing",i:8,p:2327,dir:"up",label:"golden cross"}
  ]
 },
 {
  id:"WYCK", title:"Wyckoff Accumulation", sub:"structure · smart-money range", group:"Classical structure & confirmation",
  def:"A bottoming range where large players absorb supply before markup. The sequence — Selling Climax, Automatic Rally, Secondary Test, Spring, Sign of Strength — is the missing link between Dow's accumulation phase and SMC's accumulation language.",
  read:[
    "<b>SC</b> (selling climax) + <b>AR</b> (automatic rally) set the range floor and ceiling after a downtrend.",
    "<b>ST</b> retests the low on lighter selling — supply is drying up.",
    "The <b>Spring</b> — a false break below support that snaps back — is the highest-odds long trigger (it sweeps stops, then reverses).",
    "<b>SOS</b> (sign of strength) confirms demand has won; the higher low after it (LPS) precedes markup."
  ],
  trap:"Not every range is accumulation. Without a Spring + SOS confirming demand, a range can just as easily break down. Wait for the confirmation, don't front-run it.",
  pMin:2290,pMax:2331,
  c:[[2320,2322,2314,2315],[2315,2317,2306,2307],[2307,2309,2296,2298],[2298,2310,2297,2309],[2309,2312,2305,2306],[2306,2308,2299,2301],[2301,2307,2300,2306],[2306,2310,2304,2305],[2305,2308,2301,2303],[2303,2305,2294,2296],[2296,2306,2295,2305],[2305,2309,2303,2308],[2308,2316,2307,2315],[2315,2318,2311,2313],[2313,2322,2312,2321],[2321,2328,2320,2327]],
  a:[
    {t:"level",p:2296,dash:1,color:"muted",label:"support (SC/ST/Spring)"},
    {t:"level",p:2310,dash:1,color:"muted",label:"AR high"},
    {t:"swing",i:2,p:2296,dir:"down",label:"SC"},
    {t:"swing",i:5,p:2299,dir:"down",label:"ST"},
    {t:"swing",i:9,p:2294,dir:"down",label:"Spring"},
    {t:"swing",i:12,p:2316,dir:"up",label:"SOS"},
    {t:"arrow",i:14,p1:2313,p2:2321,color:"bull",label:"markup"}
  ]
 },
 {
  id:"WYCKD", title:"Wyckoff Distribution", sub:"structure · smart-money range", group:"Classical structure & confirmation",
  def:"A topping range where large players offload into strength before markdown. The mirror of accumulation — Buying Climax, Automatic Reaction, Secondary Test, Upthrust (UTAD), Sign of Weakness — is the distribution counterpart of Dow's distribution phase and SMC's distribution language.",
  read:[
    "<b>BC</b> (buying climax) + <b>AR</b> (automatic reaction) set the range ceiling and floor after an uptrend.",
    "<b>ST</b> retests the high on lighter buying — demand is drying up.",
    "The <b>UTAD</b> — a false break above resistance that fails back — is the highest-odds short trigger (it sweeps stops, then reverses).",
    "<b>SOW</b> (sign of weakness) confirms supply has won; the lower high after it (LPSY) precedes markdown."
  ],
  trap:"Not every range at the top is distribution. Without a UTAD + SOW confirming supply, a range can just as easily break up. Wait for the confirmation, don't front-run it.",
  pMin:2308,pMax:2352,
  c:[[2315,2320,2314,2319],[2319,2326,2318,2325],[2325,2333,2324,2332],[2332,2344,2331,2343],[2343,2344,2336,2337],[2337,2338,2328,2329],[2329,2330,2321,2322],[2322,2331,2321,2330],[2330,2338,2329,2337],[2337,2341,2336,2339],[2339,2340,2333,2334],[2334,2341,2333,2340],[2340,2348,2339,2341],[2341,2342,2331,2332],[2332,2333,2322,2323],[2323,2324,2313,2314]],
  a:[
    {t:"level",p:2344,dash:1,color:"muted",label:"resistance (BC / UTAD)"},
    {t:"level",p:2322,dash:1,color:"muted",label:"support (AR / ice)"},
    {t:"swing",i:3,p:2344,dir:"up",label:"BC"},
    {t:"swing",i:6,p:2321,dir:"down",label:"AR"},
    {t:"swing",i:9,p:2341,dir:"up",label:"ST"},
    {t:"swing",i:12,p:2348,dir:"up",label:"UTAD"},
    {t:"swing",i:13,p:2331,dir:"down",label:"SOW"},
    {t:"arrow",i:14,p1:2333,p2:2323,color:"bear",label:"markdown"}
  ]
 },
 {
  id:"SR", title:"Support / Resistance Flip", sub:"classical · role reversal",
  def:"Price remembers levels. A level tested repeatedly is significant; when it finally breaks, it flips role — old resistance becomes support (and vice versa). This is the classical, pre-SMC framing of what order blocks and flip zones formalise.",
  read:[
    "Mark the level the market keeps <b>rejecting</b> — here resistance is tested twice.",
    "A <b>decisive break and close</b> beyond it changes the level's meaning.",
    "Wait for the <b>retest from the other side</b>: broken resistance should now hold as support.",
    "Trade the hold, not the break — the retest gives you defined risk against the level."
  ],
  trap:"A level tested too many times often breaks — each touch spends the orders defending it. Many rejections isn't 'stronger', it's liquidity building for the break.",
  pMin:2297,pMax:2328,
  c:[[2300,2308,2299,2307],[2307,2312,2306,2310],[2310,2312,2305,2306],[2306,2308,2301,2302],[2302,2307,2301,2306],[2306,2312,2305,2308],[2308,2313,2307,2309],[2309,2311,2304,2305],[2305,2310,2304,2309],[2309,2318,2308,2317],[2317,2320,2314,2315],[2315,2316,2311,2313],[2313,2320,2312,2319],[2319,2325,2318,2324]],
  a:[
    {t:"level",p:2312,color:"muted",label:"resistance → support (flip)"},
    {t:"bracket",i1:1,i2:6,label:"tested ×2"},
    {t:"arrow",i:9,p1:2308,p2:2317,color:"bull",label:"break"},
    {t:"swing",i:11,p:2311,dir:"down",label:"retest holds"}
  ]
 },
 {
  id:"SD", title:"Supply & Demand Zones", sub:"classical · institutional order flow",
  def:"A zone is the base (consolidation) a strong move left behind — the footprint of unfilled institutional orders. Unlike a single S/R line, a zone is a price band: when price returns, it reacts to the whole area as remaining orders fill. Demand launches rallies; supply launches drops.",
  read:[
    "<b>Demand</b> = a base that launched a rally (drop-base-rally); <b>supply</b> = a base that launched a drop (rally-base-drop).",
    "Mark the base as a <b>band</b>, not a line — from the body cluster to the wick extreme of the launch.",
    "The <b>freshest, untested</b> zone is the strongest; each retest consumes the orders resting there.",
    "Trade the <b>reaction on the first retest</b>, stop just beyond the far edge — not a naked limit into the zone."
  ],
  trap:"A zone tapped several times is <b>spent</b>, not stronger. Fresh, untouched bases hold best — the more often price revisits, the weaker the bounce.",
  pMin:2300,pMax:2327,
  c:[[2324,2326,2320,2321],[2321,2322,2313,2314],[2314,2315,2306,2307],[2307,2309,2305,2306],[2306,2308,2304,2307],[2307,2316,2306,2315],[2315,2321,2314,2320],[2320,2323,2319,2321],[2321,2322,2315,2316],[2316,2317,2309,2310],[2310,2311,2306,2308],[2308,2315,2307,2314],[2314,2320,2313,2319]],
  a:[
    {t:"zone",p1:2309,p2:2305,color:"bull",label:"demand zone (fresh)"},
    {t:"zone",p1:2323,p2:2320,color:"bear",label:"supply zone"},
    {t:"arrow",i:5,p1:2307,p2:2315,color:"bull",label:"departure (rally)"},
    {t:"swing",i:10,p:2306,dir:"down",label:"retest"},
    {t:"arrow",i:11,p1:2308,p2:2314,color:"bull",label:"bounce"}
  ]
 },
 {
  id:"ATR", title:"ATR / Volatility-Based Stops", sub:"volatility · risk sizing",
  def:"Volatility isn't constant, so a fixed pip-stop is arbitrary. Average True Range measures the instrument's current wiggle; place the stop a multiple of ATR beyond structure so normal noise can't shake you out — then size the position off that distance.",
  read:[
    "Read current <b>ATR</b> — the average range of recent candles.",
    "A stop just under the entry candle is often <b>inside the noise</b> and gets tagged on a random wiggle.",
    "Place the stop <b>N×ATR</b> beyond the level (here 2×ATR) so ordinary movement survives.",
    "A wider stop is not more risk — it means a <b>smaller position</b>; size down so % risk stays fixed (see Risk module)."
  ],
  trap:"Copying a fixed 'X-pip stop' across instruments and regimes. In high volatility that stop is noise-level; the market takes it before the idea plays out.",
  pMin:2308,pMax:2337,
  c:[[2310,2316,2309,2315],[2315,2320,2313,2319],[2319,2324,2318,2323],[2323,2324,2316,2317],[2317,2319,2312,2314],[2314,2321,2313,2320],[2320,2322,2314,2316],[2316,2323,2315,2322],[2322,2329,2321,2328],[2328,2333,2327,2332]],
  a:[
    {t:"level",p:2320,dash:1,color:"accent2",label:"entry"},
    {t:"level",p:2315,dash:1,color:"warn",label:"naive stop (too tight) ✗"},
    {t:"level",p:2312,dash:1,color:"ok",label:"ATR stop 2×ATR ✓"},
    {t:"swing",i:6,p:2314,dir:"down",label:"noise dip"}
  ]
 },
 {
  id:"DIV", title:"Divergence (price vs momentum)", sub:"momentum · confirmation",
  def:"Divergence is price and momentum disagreeing. Regular bearish: price prints a higher high while the oscillator prints a lower high — the up-move is running on fumes. It's a warning the trend is weakening, best paired with a structure break for timing.",
  read:[
    "Mark two swing <b>highs on price</b> — here the second is higher.",
    "Check the <b>oscillator</b> at those same highs — the second peak is lower.",
    "Price up + momentum down = <b>regular bearish divergence</b> → reversal risk.",
    "Confirm with a CHoCH / EMA loss before acting — divergence alone can persist for a long time."
  ],
  trap:"Shorting divergence in a strong trend. Divergence is not a signal until structure actually breaks — until then the trend can keep diverging and running.",
  pMin:2298,pMax:2326,
  osc:[52,60,72,58,60,66,67,52,42,35], oscMin:20, oscMax:80, oscLabel:"RSI",
  c:[[2300,2306,2299,2305],[2305,2311,2304,2310],[2310,2316,2309,2315],[2315,2317,2309,2310],[2310,2313,2307,2312],[2312,2318,2311,2317],[2317,2322,2316,2321],[2321,2322,2314,2315],[2315,2316,2308,2309],[2309,2310,2302,2303]],
  a:[
    {t:"trend2",panel:"price",a:{i:2,v:2316},b:{i:6,v:2322},color:"muted",label:"price: higher high"},
    {t:"trend2",panel:"osc",a:{i:2,v:72},b:{i:6,v:67},color:"warn",label:"RSI: lower high"},
    {t:"arrow",i:7,p1:2321,p2:2314,color:"bear",label:"divergence → reversal"}
  ]
 },
 {
  id:"NEWS", title:"XAU News Spike & DXY Context", sub:"gold · events / intermarket",
  def:"High-impact USD data (NFP, CPI, FOMC) detonates gold volatility: spreads widen, both sides' stops get hunted, and the first move often fakes out. Gold also tracks the US dollar inversely — DXY up tends to press gold down — so the dollar's reaction frames the trade.",
  read:[
    "Before the release, price <b>coils</b> and liquidity thins — do not pre-position blind.",
    "The <b>event candle</b> whipsaws both directions; the first spike frequently reverses.",
    "<b>Stand aside through the release</b> (WAIT). Let the dust settle and structure re-form.",
    "Trade the <b>reaction</b>, cross-checked against DXY: a dollar that keeps falling supports the long."
  ],
  trap:"Trading the spike itself. The initial burst is a liquidity grab — chasing it is how the event eats retail stops on both sides.",
  pMin:2322,pMax:2356,
  c:[[2338,2340,2336,2339],[2339,2341,2337,2338],[2338,2340,2336,2339],[2339,2341,2337,2340],[2340,2352,2330,2334],[2334,2338,2326,2328],[2328,2331,2325,2330],[2330,2336,2329,2335],[2335,2342,2334,2341],[2341,2347,2340,2346]],
  a:[
    {t:"zone",p1:2341,p2:2336,color:"muted",label:"pre-news coil"},
    {t:"swing",i:4,p:2352,dir:"up",label:"news spike (fakeout)"},
    {t:"arrow",i:7,p1:2329,p2:2335,color:"bull",label:"trade the reaction"}
  ]
 },
 {
  id:"GYLD", title:"Gold vs Real Yields (opportunity cost)", sub:"gold · macro drivers",
  def:"Gold pays no yield, so its biggest structural driver is the real interest rate — the opportunity cost of holding it. Here gold rallies on low real yields, then rolls over as real yields climb (lower panel), even while inflation stays high. The dollar and safe-haven demand layer on top.",
  read:[
    "Gold rode a <b>weak-dollar / low-yield</b> backdrop higher — the classic tailwind.",
    "Watch the lower panel: <b>real yields turn up</b>. Every percent of real yield is opportunity cost for a non-yielding asset.",
    "As yields climb the <b>bid for gold fades</b> — price stalls at the highs even with inflation still elevated.",
    "The rollover comes not from the chart pattern alone but from the <b>macro tide</b> turning against it."
  ],
  trap:"\"Inflation is high, so gold must go up\" is false. If the central bank hikes faster than inflation, <b>real yields rise and gold sells off</b> regardless of the headline CPI print.",
  pMin:2310,pMax:2358,
  osc:[0.6,0.7,0.8,0.9,1.1,1.3,1.6,1.9,2.1,2.3,2.5,2.7], oscMin:0, oscMax:3, oscLabel:"Real yield %",
  c:[[2312,2318,2311,2317],[2317,2325,2316,2324],[2324,2333,2323,2332],[2332,2341,2331,2340],[2340,2348,2339,2347],[2347,2353,2346,2352],[2352,2355,2348,2349],[2349,2350,2342,2343],[2343,2344,2334,2335],[2335,2336,2327,2328],[2328,2329,2320,2321],[2321,2323,2316,2318]],
  a:[
    {t:"trend2",panel:"osc",a:{i:1,v:0.7},b:{i:10,v:2.5},color:"warn",label:"real yields rising"},
    {t:"level",p:2353,dash:1,color:"muted",label:"gold tops as yields climb"},
    {t:"arrow",i:7,p1:2350,p2:2343,color:"bear",label:"opportunity cost bites"}
  ]
 },
 {
  id:"RORO", title:"Risk-On / Risk-Off & the Safe-Haven Bid", sub:"gold · sentiment & flows",
  def:"Markets swing between risk-on (chasing yield, selling safety) and risk-off (fleeing to safety). Gold is the ultimate safe haven: range-bound and unloved in risk-on, then bid aggressively — often parabolically, ignoring resistance — the moment fear (a VIX spike, equity selloff) takes over.",
  read:[
    "During <b>risk-on</b>, gold chops in a range — equities absorb the capital, gold has no urgent bid.",
    "Watch the lower panel: a <b>VIX spike</b> marks the regime flip to risk-off (fear).",
    "Capital flees to safety and gold catches an <b>aggressive safe-haven bid</b> that runs through technical resistance.",
    "In genuine panic, fundamentals override the chart — standard resistance levels simply don't hold."
  ],
  trap:"Shorting gold at 'resistance' during a real risk-off panic is one of the most dangerous trades there is. A VIX spike + equity selloff means the safe-haven bid can steamroll every level.",
  pMin:2318,pMax:2374,
  osc:[14,15,14,16,15,22,28,33,36,34,33,32], oscMin:10, oscMax:40, oscLabel:"VIX",
  c:[[2326,2329,2323,2324],[2324,2328,2322,2327],[2327,2329,2323,2324],[2324,2327,2321,2322],[2322,2326,2321,2325],[2325,2333,2324,2332],[2332,2342,2331,2341],[2341,2351,2340,2350],[2350,2359,2349,2358],[2358,2366,2357,2365],[2365,2369,2361,2363],[2363,2367,2360,2366]],
  a:[
    {t:"level",p:2329,dash:1,color:"muted",label:"resistance (risk-on cap)"},
    {t:"bracket",i1:0,i2:4,label:"risk-on range"},
    {t:"arrow",i:5,p1:2324,p2:2333,color:"bull",label:"risk-off trigger"},
    {t:"swing",i:9,p:2366,dir:"up",label:"parabolic safe-haven bid"}
  ]
 }
];

export const chartRegistry: Record<string, ChartData> = CH.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as Record<string, ChartData>);
