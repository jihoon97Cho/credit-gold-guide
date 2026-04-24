import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertTriangle, Scale, BookOpen, Zap, TrendingUp, Clock, DollarSign } from "lucide-react";
import logo from "@/assets/logo.png";
import { AnimatedCounter, StackBars, Timeline, DonutChart, CompareCard, StatGrid } from "@/components/Infographics";

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
    {children}
  </div>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 rounded-xl border-l-4 border-primary bg-muted/60 p-6 text-base">
    {children}
  </div>
);

const CtaBlock = ({ heading, sub }: { heading: string; sub: string }) => (
  <div className="my-12 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 p-10 text-center text-white shadow-xl">
    <h3 className="mb-3 text-2xl font-bold">{heading}</h3>
    <p className="mb-6 text-slate-300">{sub}</p>
    <Link to="/book">
      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Book your free 15-min call <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  </div>
);

const CreditBlueprintPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ascend Solutions" className="h-8 w-auto" />
            <span className="text-sm font-bold">Ascend Solutions</span>
          </Link>
          <Link to="/book">
            <Button variant="outline" size="sm">
              Book a Call
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
            Ascend Solutions · Free Playbook
          </div>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            The Credit Repair Playbook
          </h1>
          <p className="mb-8 text-lg text-slate-300 md:text-xl">
            The real rules, the real laws, and the stuff most people get wrong.
          </p>
          <p className="text-sm text-slate-400">
            By <span className="font-semibold text-white">Michael Cho</span> · Founder,
            Ascend Solutions
          </p>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto -mt-10 max-w-3xl rounded-2xl bg-card px-6 py-12 shadow-xl md:px-12 md:py-16">

        {/* ═══════════════ Pull Your Credit First ═══════════════ */}
        <section className="mb-12 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <BookOpen className="h-10 w-10 shrink-0 text-primary mt-1" />
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                Step Zero
              </div>
              <h3 className="text-2xl font-extrabold mb-3">Pull Your Credit Report First</h3>
              <p className="mb-4 text-base leading-relaxed">
                You can't fix what you can't see. Before reading the rest of this guide,
                pull your full 3-bureau report so you know what you're actually dealing
                with. We use <strong>SmartCredit</strong> — pulls all 3 bureaus, shows FICO
                scores, and updates in real time so you can track progress as the rounds go out.
              </p>
              <a
                href="https://www.smartcredit.com/join/?pid=74943"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign up for SmartCredit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Takes 5 minutes. You'll want your report in hand before the rest of this
                guide makes sense.
              </p>
            </div>
          </div>
        </section>

        {/* Before You Start */}
        <section>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Before You Start</h2>
          <p className="mb-4 text-lg leading-relaxed">
            This guide is going to teach you more about credit repair than 95% of the
            people trying to sell it to you.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            That's not a flex — it's a warning. By the time you finish reading, you're going
            to know:
          </p>
          <ul className="mb-4 space-y-2 pl-6 text-lg">
            <li className="list-disc">How your credit score actually gets calculated</li>
            <li className="list-disc">The laws that give you leverage over the bureaus</li>
            <li className="list-disc">
              The 5-round sequence pros use to remove negative items
            </li>
            <li className="list-disc">
              Which account types are easy wins and which take real skill
            </li>
            <li className="list-disc">The 14 mistakes that kill 90% of DIY attempts</li>
          </ul>
          <p className="mb-4 text-lg leading-relaxed">
            Everything here is real. You can take this information and go fix your credit
            yourself. Some people will — and it'll work.
          </p>
          <p className="text-lg leading-relaxed">
            But know up front: knowing what to do and having the time, patience, and craft
            to do it right are two very different things. Let's get into it.
          </p>
        </section>

        {/* ═══════════════ Snapshot Stats ═══════════════ */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Snapshot</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" /> By the Numbers
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Here's the shape of a typical credit repair engagement when it's done right:
          </p>
          <StatGrid
            stats={[
              { prefix: "+", value: 127, label: "Avg score increase" },
              { prefix: "", suffix: " days", value: 90, label: "To see real movement" },
              { prefix: "", suffix: "%", value: 78, label: "Items removed by round 3" },
              { prefix: "", value: 5, label: "Dispute rounds max" },
            ]}
          />
          <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
            These are median outcomes across hundreds of credit repair cases. Results vary
            based on the starting file, furnisher type, and how well the letters are crafted.
          </p>
        </section>

        {/* ═══════════════ FICO Factor Breakdown ═══════════════ */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>FICO Formula</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" /> What Actually Moves Your Score
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            The FICO scoring formula is public. Most people think it's mysterious — it's
            not. It's five inputs with fixed weights:
          </p>
          <DonutChart
            slices={[
              { label: "Payment history", value: 35, color: "text-primary" },
              { label: "Utilization", value: 30, color: "text-blue-500" },
              { label: "Age of credit", value: 15, color: "text-emerald-500" },
              { label: "Credit mix", value: 10, color: "text-amber-500" },
              { label: "New credit / inquiries", value: 10, color: "text-rose-500" },
            ]}
          />
          <Callout>
            <strong>The hidden lever:</strong> 65% of your score is payment history +
            utilization. Fixing one late payment plus dropping utilization from 80% to
            8% can swing a score 80+ points in 30 days. Nothing else in the formula
            moves that fast.
          </Callout>
        </section>

        {/* ═══════════════ Round-by-Round Timeline ═══════════════ */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>The Rounds</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" /> How The 5-Round Sequence Works
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Federal law gives credit bureaus 30 days to investigate each dispute. That's
            why repair happens in rounds, not all at once:
          </p>
          <Timeline
            steps={[
              {
                tag: "Round 1 — Days 1–30",
                title: "The Rubber-Stamp Bait",
                body:
                  "First-dispute letters designed to catch furnishers asleep. Many items get removed here simply because the furnisher doesn't respond in time or their records are a mess. Typical delete rate: 30–40%.",
              },
              {
                tag: "Round 2 — Days 31–60",
                title: "Method of Verification",
                body:
                  "For anything that survived Round 1, we demand proof. Bureaus must disclose the method of verification (MOV) under § 611. Most can't produce it at the depth required. Typical cumulative delete rate: 55–65%.",
              },
              {
                tag: "Round 3 — Days 61–90",
                title: "Direct Furnisher Attack",
                body:
                  "Pivot to § 1681s-2(b) furnisher disputes + FDCPA validation demands. This bypasses the bureau and hits the creditor directly. Typical cumulative delete rate: 70–80%.",
              },
              {
                tag: "Round 4 — Days 91–120",
                title: "Escalation + Case Law",
                body:
                  "Cite specific court precedents (Roberts v. Carter-Young, Saunders v. BB&T, etc.) + willfulness claims. CFPB complaints filed same week. This is where hard-to-remove items fall.",
              },
              {
                tag: "Round 5 — Days 121–150",
                title: "Legal Pressure + CFPB/AG Complaints",
                body:
                  "For the final stragglers: coordinated complaints to CFPB, state Attorney General, and BBB. Reinsertion tracking + Wilson v. TransUnion attack if anything came back. By Round 5 most clients are done.",
              },
            ]}
          />
        </section>

        {/* ═══════════════ Cost of Bad Credit ═══════════════ */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Real Math</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" /> What Bad Credit Actually Costs
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Most people think of their credit score as a number. It's not — it's a tax.
            Here's what a 580 vs 740 score costs on a $300K 30-year mortgage:
          </p>
          <CompareCard
            label="Same loan, different score"
            before={{
              heading: "580 score",
              value: "$612,000",
              sub: "Total interest over 30 years",
            }}
            after={{
              heading: "740 score",
              value: "$248,000",
              sub: "Total interest over 30 years",
            }}
          />
          <p className="mb-4 text-lg leading-relaxed">
            <strong>
              <AnimatedCounter to={364000} prefix="$" />
            </strong>{" "}
            in lifetime savings — on one loan. Add in car loans, credit cards, insurance
            premiums (yes, your score affects those too), and the number easily crosses
            half a million dollars over a lifetime.
          </p>
          <StackBars
            unit=""
            items={[
              { label: "Mortgage APR", sub: "580 score", value: 8.2, color: "bg-rose-500" },
              { label: "Mortgage APR", sub: "740 score", value: 6.1, color: "bg-emerald-500" },
              { label: "Auto APR", sub: "580 score", value: 19.5, color: "bg-rose-500" },
              { label: "Auto APR", sub: "740 score", value: 5.8, color: "bg-emerald-500" },
              { label: "Credit card APR", sub: "580 score", value: 28, color: "bg-rose-500" },
              { label: "Credit card APR", sub: "740 score", value: 18, color: "bg-emerald-500" },
            ]}
          />
        </section>

        {/* Part 1 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 1</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">How Credit Actually Works</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Your FICO score isn't magic. It's a weighted formula. Five inputs:
          </p>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Factor</th>
                  <th className="px-4 py-3 text-sm font-semibold">Weight</th>
                  <th className="px-4 py-3 text-sm font-semibold">What it measures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                <tr>
                  <td className="px-4 py-3 font-semibold">Payment history</td>
                  <td className="px-4 py-3">35%</td>
                  <td className="px-4 py-3">Lates, collections, charge-offs kill this.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Utilization</td>
                  <td className="px-4 py-3">30%</td>
                  <td className="px-4 py-3">% of your revolving limit being used.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Length of history</td>
                  <td className="px-4 py-3">15%</td>
                  <td className="px-4 py-3">Average age of your accounts.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Credit mix</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Revolving + installment balance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">New credit</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Recent hard inquiries + new accounts.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout>
            <strong>If you only remember one thing:</strong> payment history + utilization =
            65% of your score. Fix those two, everything else is noise.
          </Callout>

          <h3 className="mt-10 text-xl font-bold">The 3 bureaus are not the same</h3>
          <ul className="mt-3 space-y-2 pl-6 text-lg">
            <li className="list-disc">
              <strong>Equifax</strong> — most likely to delete without a fight (still
              recovering from the 2017 breach + 2025 CFPB $15M consent order)
            </li>
            <li className="list-disc">
              <strong>Experian</strong> — middle ground; will delete clean claims, pushes
              back on borderline ones
            </li>
            <li className="list-disc">
              <strong>TransUnion</strong> — most aggressive, most likely to send the
              "frivolous" letter
            </li>
          </ul>
          <p className="mt-4 text-lg leading-relaxed">
            An item can be removed at one bureau and still sit on another — which is exactly
            why most DIY attempts fail: people dispute once, get "verified," and quit.
          </p>
        </section>

        {/* Part 2 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 2</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">
            Your Rights — The Laws That Actually Matter
          </h2>
          <p className="mb-8 text-lg leading-relaxed">
            Credit repair isn't about "fighting the bureaus." It's about using the rights
            Congress already gave you.
          </p>

          <div className="space-y-6">
            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">FCRA — 15 U.S.C. § 1681</h3>
              </div>
              <p className="text-base leading-relaxed">
                The big one. Every item must be accurate, complete, and verifiable.
                Bureaus have 30 days to investigate disputes. If they can't verify,{" "}
                <strong>it must be deleted</strong> — not "updated." Reinserted items
                require 5-day written notice.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">FDCPA — 15 U.S.C. § 1692</h3>
              </div>
              <p className="text-base leading-relaxed">
                Applies to debt collectors (not original creditors). They can't report a
                debt without validating if you ask. <strong>Validation letter first,
                dispute letter second</strong> — most debt buyers can't produce the docs.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">FCBA — Billing Errors</h3>
              </div>
              <p className="text-base leading-relaxed">
                Covers open credit card billing errors. 60-day window from statement date.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">CFPB Medical Debt Rule (April 2023)</h3>
              </div>
              <p className="text-base leading-relaxed">
                Medical debts <strong>under $500 cannot be reported</strong>. Period.
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-xl font-bold">Your other rights</h3>
          <ul className="mt-3 space-y-2 pl-6 text-lg">
            <li className="list-disc">One free report per bureau per week at annualcreditreport.com</li>
            <li className="list-disc">Free freezes and unfreezes</li>
            <li className="list-disc">Right to add a 100-word statement to your file</li>
            <li className="list-disc">
              Right to sue for willful or negligent violations ($100–$1,000 per violation)
            </li>
          </ul>
        </section>

        {/* Part 3 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 3</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The 5-Round Dispute Sequence</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Amateurs send one letter and quit. Pros run a sequence — each round hits a
            different legal angle and escalates pressure.
          </p>
          <p className="mb-8 text-base text-muted-foreground">
            <strong>Timeline:</strong> 6–9 months start to finish, results usually start
            landing after Round 2.
          </p>

          {[
            {
              n: "Round 1",
              title: "Initial Dispute",
              body: "Factual challenge under FCRA § 1681i. 30-day response window.",
            },
            {
              n: "Round 2",
              title: "Method of Verification Demand",
              body: "Invoke FCRA § 1681i(a)(6)(B). Bureau must disclose how they verified. Most can't — they use automated e-OSCAR systems. That gap is your leverage.",
            },
            {
              n: "Round 3",
              title: "Furnisher Attack",
              body: "Direct pressure on the creditor under FCRA § 1681s-2(b). Demand account-level evidence. Debt buyers especially can't produce chain of assignment.",
            },
            {
              n: "Round 4",
              title: "Regulatory Complaints",
              body: "CFPB + FTC + state AG, filed in parallel. 15-day CFPB response window. Regulatory pressure works where consumer letters stalled.",
            },
            {
              n: "Round 5",
              title: "Legal Escalation",
              body: "Pre-litigation demand citing specific violations, damages calculation, and deadline. Most surviving items fall here.",
            },
          ].map((r) => (
            <div key={r.n} className="mb-6 rounded-xl border border-border p-6">
              <div className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                {r.n}
              </div>
              <h3 className="mb-2 text-xl font-bold">{r.title}</h3>
              <p className="text-base leading-relaxed">{r.body}</p>
            </div>
          ))}

          <Callout>
            <strong>This is where most DIY attempts break down.</strong> People know "Round
            1" exists but have no idea what a proper Round 2, 3, 4, or 5 letter looks like.
            Sending the same template 5 times doesn't escalate — it gets you flagged as
            frivolous.
          </Callout>

          <CtaBlock
            heading="Want us to run the full sequence for you?"
            sub="5 rounds · 3 bureaus · every letter handcrafted for your file."
          />
        </section>

        {/* Part 4 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 4</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">Attack Guide by Account Type</h2>

          {[
            {
              title: "Collections (3rd-party debt buyers)",
              meta: "Easy–medium · 60–80% deletion odds",
              body: "Midland, Portfolio Recovery, LVNV, Jefferson Capital — almost never have complete docs. Attack: validation → FCRA § 1681e(b) accuracy → CFPB escalation. Leverage: Midland is under a $15M CFPB consent order; PRA got hit with $24M in 2023.",
            },
            {
              title: "Medical Collections",
              meta: "Easy · 85%+",
              body: "Under $500 = illegal to report, straight removal. Over $500 = HIPAA + FDCPA + FCRA combined attack.",
            },
            {
              title: "Charge-Offs",
              meta: "Medium · 50–70%",
              body: "'Charge-off' + 'current' status on same account = FCRA § 1681e(b) violation. Balance updating monthly after charge-off = inaccuracy. Post-settlement balance not zeroed = inaccuracy.",
            },
            {
              title: "Late Payments (Open Accounts)",
              meta: "Hard · 25–40% DIY, 60%+ with proper sequencing",
              body: "Where DIY falls apart. Dispute wrong and the creditor can close your account — you lose the late AND the tradeline. Requires separating bureau dispute from creditor dispute and running a CFPB complaint in parallel.",
            },
            {
              title: "Hard Inquiries",
              meta: "Easy · 60–70%",
              body: "Inquiries without written authorization violate FCRA § 1681b. Demand the permissible purpose in writing.",
            },
            {
              title: "Repos, Bankruptcies, Student Loans",
              meta: "Varies",
              body: "State-specific UCC compliance (repos). MOV demands on court records (bankruptcies). Trust documentation gaps on private student loans. Each has its own playbook.",
            },
            {
              title: "Identity Theft",
              meta: "Easy · 95%+",
              body: "FCRA § 605B requires removal within 4 business days of an FTC identity theft report + police report.",
            },
          ].map((item) => (
            <div key={item.title} className="mb-5 rounded-xl border border-border p-5">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <div className="mb-2 text-sm text-muted-foreground">{item.meta}</div>
              <p className="text-base leading-relaxed">{item.body}</p>
            </div>
          ))}
        </section>

        {/* Part 5 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 5</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The 14 Most Common Mistakes</h2>
          <ol className="space-y-3 pl-6 text-lg">
            {[
              ["Disputing everything at once.", "Looks frivolous. Pick 3–5 per round, max."],
              ["Using online dispute forms.", "You forfeit rights. Always mail certified."],
              ["Copying templates off Reddit.", "Bureaus auto-flag template language."],
              ["Sending from the wrong address.", "Old address on report = dispute ignored."],
              ["Using the word 'unverified.'", "Use 'inaccurate' and 'unable to be verified per 15 U.S.C. § 1681i' instead."],
              ["No certified mail receipts.", "No proof of delivery = no 30-day clock."],
              ["Paying before disputing.", "Payment can reset the clock. Dispute first."],
              ["Pay for delete.", "Bureaus don't honor it. Illegal in most states."],
              ["Closing old accounts.", "Length of history drops. Never close your oldest card."],
              ["Disputing a recent late wrong.", "Creditor may close the account in retaliation."],
              ["Escalating to court too early.", "You need the paper trail from Rounds 2–4."],
              ["Not disputing at all three bureaus.", "Removing from one but not others = item still shows."],
              ["Ignoring 605B for identity theft.", "4-day forced removal, not a regular dispute."],
              ["Giving up after 'verified.'", "Round 1 'verified' is expected, not a stop sign."],
            ].map(([t, body], i) => (
              <li key={i} className="list-decimal">
                <strong>{t}</strong> {body}
              </li>
            ))}
          </ol>
        </section>

        {/* Part 6 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 6</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">Where DIY Gets Stuck</h2>
          <p className="mb-6 text-lg leading-relaxed">
            You can do this yourself. Here's where every DIY attempt hits a wall:
          </p>
          <ul className="space-y-3 pl-6 text-lg">
            <li className="list-disc">
              <strong>Round 2–5 letters.</strong> Round 1 templates are everywhere. Letters
              that cite the right statute for the right attack vector in the right sequence
              for your specific account type? Those aren't.
            </li>
            <li className="list-disc">
              <strong>Knowing when to escalate.</strong> A charge-off gets a different attack
              than a collection, which gets a different attack than a late payment.
            </li>
            <li className="list-disc">
              <strong>Tracking deadlines.</strong> Each round has 30-day windows. Miss one
              and the bureau can call your dispute abandoned.
            </li>
            <li className="list-disc">
              <strong>CFPB narrative structure.</strong> Complaints get auto-routed based on
              how they're written. Most DIY complaints land in a generic bucket.
            </li>
            <li className="list-disc">
              <strong>Case law citations.</strong> <em>Saunders v. BB&T</em>, <em>Roberts v.
              Carter-Young</em> (4th Cir. 2025), <em>Wilson v. TransUnion</em> ($2.5M),{" "}
              <em>CFPB v. Equifax</em> ($15M) — the right cite can 10x your odds. The wrong
              one does nothing.
            </li>
            <li className="list-disc">
              <strong>Managing 3 bureaus in parallel.</strong> What worked at Equifax may
              fail at TransUnion.
            </li>
            <li className="list-disc">
              <strong>Not restarting the 7-year clock.</strong> Some disputes, done wrong,
              reset the clock. Irreversible.
            </li>
          </ul>
          <p className="mt-6 text-lg leading-relaxed">
            This is the craft part. You can learn it — it just takes 2–3 years of making
            every one of these mistakes yourself.
          </p>
        </section>

        {/* Part 7 */}
        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 7</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">DIY vs. Hire a Pro — Honest Take</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">DIY if:</h3>
              </div>
              <ul className="space-y-2 pl-5 text-base">
                <li className="list-disc">You have 1–3 simple negative items</li>
                <li className="list-disc">You have 10+ hours/month for 6–9 months</li>
                <li className="list-disc">You're comfortable writing legal letters</li>
                <li className="list-disc">You're okay with 40–60% success on harder items</li>
              </ul>
            </div>

            <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Hire a pro if:</h3>
              </div>
              <ul className="space-y-2 pl-5 text-base">
                <li className="list-disc">5+ negative items or mix of types</li>
                <li className="list-disc">Time-sensitive goal (mortgage, funding, auto)</li>
                <li className="list-disc">Tried DIY, got "verified" responses</li>
                <li className="list-disc">Want 70–90% success rates on hard items</li>
                <li className="list-disc">Your time is worth more than $30/hour</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-10 text-center text-white md:p-14">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Ready to Get Serious?</h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-300">
            If after reading all this you'd rather just have it handled — that's what Ascend
            Solutions is built for.
          </p>

          <div className="mx-auto mb-8 max-w-lg text-left">
            <p className="mb-3 font-semibold">What we do:</p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                Full 5-round dispute sequence across all 3 bureaus
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                Account-specific letter craft for your exact file
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                CFPB + state AG regulatory pressure in parallel
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                Monthly progress reports — every letter, every response, every deletion
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                Credit building on top of cleanup
              </li>
            </ul>
          </div>

          <Link to="/book">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Book your free 15-min call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
            <AlertTriangle className="h-4 w-4" />
            Not a fit: pay-for-delete schemes, "580→780 in 30 days" expectations, or
            continued missed payments.
          </div>
        </section>
      </article>

      <footer className="py-12 text-center text-sm text-muted-foreground">
        <p>© Ascend Solutions LLC</p>
        <p className="mx-auto mt-2 max-w-lg px-6 text-xs">
          This guide is for educational purposes. Nothing here constitutes legal advice.
          Your results will vary based on the specifics of your credit file, your state of
          residence, and the responsiveness of the creditors and bureaus.
        </p>
      </footer>
    </div>
  );
};

export default CreditBlueprintPage;
