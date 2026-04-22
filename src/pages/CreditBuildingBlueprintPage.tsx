import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Target, Layers } from "lucide-react";
import logo from "@/assets/logo.png";

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

const CreditBuildingBlueprintPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ascend Solutions" className="h-8 w-auto" />
            <span className="text-sm font-bold">Ascend Solutions</span>
          </Link>
          <Link to="/book">
            <Button variant="outline" size="sm">Book a Call</Button>
          </Link>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
            Ascend Solutions · Free Playbook
          </div>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            The Credit Building Blueprint
          </h1>
          <p className="mb-8 text-lg text-slate-300 md:text-xl">
            How real scores get built — the tradelines, the timing, and the traps most people
            fall into.
          </p>
          <p className="text-sm text-slate-400">
            By <span className="font-semibold text-white">Michael Cho</span> · Founder, Ascend Solutions
          </p>
        </div>
      </header>

      <article className="mx-auto -mt-10 max-w-3xl rounded-2xl bg-card px-6 py-12 shadow-xl md:px-12 md:py-16">
        {/* Intro */}
        <section>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Read This First</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Credit repair removes the bad. Credit <em>building</em> creates the good. Most
            people do the first part, ignore the second, and wonder why their score plateaus
            in the mid-600s.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            This blueprint walks through how real credit profiles get stacked — what matters,
            in what order, and how banks actually evaluate you. It's the framework. The exact
            card order, the exact banks, and the exact timing windows we use for clients are
            proprietary. But if you understand the framework, you'll already be ahead of 95%
            of people.
          </p>
          <Callout>
            <strong>Reality check:</strong> A clean file with no positive tradelines is
            almost as useless as a file with derogatories. Clean + empty = invisible to
            lenders.
          </Callout>
        </section>

        {/* Part 1 */}
        <section className="mt-16">
          <SectionTag>Part 1</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" /> What Actually Moves a Score
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            FICO is 5 factors, weighted:
          </p>
          <ul className="mb-6 space-y-2 pl-6 text-lg list-disc">
            <li><strong>Payment history</strong> — 35%</li>
            <li><strong>Utilization</strong> — 30%</li>
            <li><strong>Age of credit</strong> — 15%</li>
            <li><strong>Credit mix</strong> — 10%</li>
            <li><strong>New credit / inquiries</strong> — 10%</li>
          </ul>
          <p className="mb-4 text-lg leading-relaxed">
            Most DIY advice obsesses over utilization while ignoring mix and age. Real
            building balances all five. You can't fix age — but you can manufacture mix,
            pin utilization to the exact number FICO rewards, and protect inquiries so new
            accounts don't cannibalize your gains.
          </p>
          <Callout>
            <strong>The number most people get wrong:</strong> utilization. There's a
            specific percentage FICO rewards. Most DIY guides tell you "under 30%" — that's
            the floor, not the target. The target is much tighter, and timing it to report
            on the right day is how you squeeze the last 40+ points out of a file.
          </Callout>
        </section>

        {/* Part 2 */}
        <section className="mt-16">
          <SectionTag>Part 2</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl flex items-center gap-3">
            <Layers className="h-8 w-8 text-primary" /> The Stack: Revolving + Installment
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            A credit profile isn't one tradeline. It's a stack. Lenders look at depth,
            variety, and history — all together.
          </p>
          <p className="mb-4 text-lg leading-relaxed">The ideal stack looks something like this:</p>
          <ul className="mb-6 space-y-2 pl-6 text-lg list-disc">
            <li><strong>2–3 revolving accounts</strong> (credit cards) — reporting different utilization levels</li>
            <li><strong>2–3 installment accounts</strong> (loans) — one active, others paid down or closed in good standing</li>
            <li><strong>At least one account 2+ years old</strong> — for the age factor</li>
            <li><strong>No more than 1–2 inquiries in the last 6 months</strong></li>
          </ul>
          <p className="mb-4 text-lg leading-relaxed">
            Building this from nothing takes a specific sequence. Build in the wrong order
            and you either get denied, stall your score, or worse — get flagged for
            "seeking credit" and lose your existing approvals.
          </p>
        </section>

        {/* Part 3 */}
        <section className="mt-16">
          <SectionTag>Part 3</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" /> The Three Starter Paths
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Where you start depends on your file. Most people fall into one of three camps:
          </p>
          <h3 className="mt-6 mb-3 text-2xl font-bold">1. Invisible File (No Credit History)</h3>
          <p className="mb-4 text-lg leading-relaxed">
            You've never had credit. Lenders have nothing to score. Starting point is a
            relationship-based lender — specifically a credit union that will approve you on
            membership rather than score. Open a secured installment product first, not a
            credit card. Why? Because an installment anchor builds mix AND age simultaneously
            while you wait on your first revolving approval.
          </p>

          <h3 className="mt-6 mb-3 text-2xl font-bold">2. Thin File (1–2 Accounts, Short History)</h3>
          <p className="mb-4 text-lg leading-relaxed">
            You have a card or two but nothing else. The move is adding diversity without
            triggering inquiries that spook lenders. There's a specific technique for getting
            aged positive tradelines onto a thin file that adds years of history overnight —
            but it has to be done correctly, with the right person, at the right bank, or it
            won't stick to your report.
          </p>

          <h3 className="mt-6 mb-3 text-2xl font-bold">3. Rebuilding File (Post-Repair)</h3>
          <p className="mb-4 text-lg leading-relaxed">
            You've cleaned up negatives. Now the file is thin and clean but dormant. Scores
            here stall unless you reactivate the file with new positive reporting. The biggest
            mistake post-repair clients make is assuming the score will keep climbing on its
            own. It won't. Without new tradelines, the score gains from repair stop within
            60–90 days.
          </p>
          <Callout>
            <strong>Why order matters:</strong> Open the wrong bank first and you'll get
            approved for a toy limit that caps your whole profile for 2 years. Open the
            right one first and your second, third, and fourth approvals come in at 5–10x
            the limit. This is the part nobody tells you.
          </Callout>
        </section>

        <CtaBlock
          heading="Want the exact sequence?"
          sub="Book a free 15-minute call and I'll map your starter path based on your current file."
        />

        {/* Part 4 */}
        <section className="mt-16">
          <SectionTag>Part 4</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Utilization: The Hidden Lever</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Utilization is reported once a month — on the statement date. Not the due date.
            This distinction is worth tens of points.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            The standard advice is "pay it off before the due date." That's how you avoid
            interest. It is <strong>not</strong> how you optimize your score. To optimize
            score, you pay down <em>before</em> the statement closes, so the card reports
            a specific utilization number to the bureaus.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            There's a protocol for this — a specific day window, a specific amount to leave
            reporting, and a specific rotation pattern across multiple cards so only one
            ever shows a balance. Applied correctly, this single lever is worth 20–50 points
            depending on the file.
          </p>
          <Callout>
            <strong>Common trap:</strong> Paying every card to $0 every month sounds smart
            but actually <em>hurts</em> your score. FICO needs to see activity. The trick is
            letting one card report a tiny, deliberate balance while the rest stay at $0.
            The exact amount matters.
          </Callout>
        </section>

        {/* Part 5 */}
        <section className="mt-16">
          <SectionTag>Part 5</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Which Banks Matter (And Which Kill You)</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Not all approvals are equal. Some banks issue "starter" products that permanently
            anchor your profile down. Others recognize your file aggressively and set the
            ceiling for every future approval.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            The hierarchy roughly looks like this:
          </p>
          <ul className="mb-6 space-y-2 pl-6 text-lg list-disc">
            <li><strong>Top tier</strong> — relationship banks. Approve on deposit + tenure. Limits scale with history.</li>
            <li><strong>Growth tier</strong> — mainstream issuers that reward a clean profile with aggressive limit increases and soft-pull data mining.</li>
            <li><strong>Bridge tier</strong> — cards you take only because they report and build history, then pay off or close once you've graduated.</li>
            <li><strong>Avoid tier</strong> — subprime and "credit builder" products that permanently cap your profile, charge fees, and signal risk to future lenders.</li>
          </ul>
          <p className="mb-4 text-lg leading-relaxed">
            Knowing which bucket each bank falls into — and which banks quietly pull from
            which bureau — is the difference between a stack that compounds and one that
            stalls.
          </p>
        </section>

        {/* Part 6 */}
        <section className="mt-16">
          <SectionTag>Part 6</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Common Mistakes That Stall Files</h2>
          <ul className="mb-6 space-y-4 pl-6 text-lg list-decimal">
            <li><strong>Applying for too much, too fast.</strong> Every inquiry compounds. 3+ in 90 days triggers risk models across every major issuer.</li>
            <li><strong>Closing old accounts.</strong> Age is 15% of your score. An old card paid off and ignored is still working for you.</li>
            <li><strong>Paying to $0 on everything.</strong> Kills your activity signal.</li>
            <li><strong>Starting with the wrong bank.</strong> Toy limits permanently anchor approvals.</li>
            <li><strong>Ignoring credit mix.</strong> 5 credit cards is not a profile. It's a category.</li>
            <li><strong>Using "credit builder" apps.</strong> Most report as fringe products. Some don't report at all.</li>
            <li><strong>Letting utilization rotate randomly.</strong> No control = no optimization.</li>
            <li><strong>Chasing pre-approvals.</strong> Pre-approvals are marketing, not underwriting. Half turn into denials on hard pull.</li>
            <li><strong>Adding authorized users carelessly.</strong> Wrong AU can tank your score instead of boost it.</li>
            <li><strong>Not monitoring which bureau each lender pulls.</strong> You can get denied for "too many inquiries" on one bureau while the other two are clean — if you'd applied there, you'd have been approved.</li>
          </ul>
        </section>

        {/* Part 7 */}
        <section className="mt-16">
          <SectionTag>Part 7</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Timing: The Part Nobody Talks About</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Credit building runs on cycles. Statement dates, reporting dates, inquiry decay,
            account seasoning windows. Get the cycle wrong and your 6-month plan becomes an
            18-month plan.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            There's a specific window after a new account opens — a few weeks long — where
            it's reporting but hasn't seasoned. Applying during that window looks reckless
            to algorithms. Waiting past it, but before the next seasoning milestone, is
            optimal. This window shifts depending on the product type.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            Similarly, there's a specific month-range after repair completion where a file
            is maximally receptive to new tradelines. Miss it and approvals get harder, not
            easier, over time.
          </p>
          <Callout>
            <strong>The cost of bad timing:</strong> A denial hurts for 24 months. A missed
            seasoning window costs you an entire re-application cycle. One mistake can push
            a 6-month plan into a 2-year plan.
          </Callout>
        </section>

        {/* Part 8 */}
        <section className="mt-16">
          <SectionTag>Part 8</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" /> Where DIY Gets Stuck
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Most people can get their score from 550 to 680 on their own if they're
            disciplined. Past 680, it's not about discipline anymore — it's about access.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            The 680→780 jump requires:
          </p>
          <ul className="mb-6 space-y-2 pl-6 text-lg list-disc">
            <li>Knowing which bank to apply to first (and which to never touch)</li>
            <li>Timing applications to reporting cycles, not calendar months</li>
            <li>Manufacturing age and mix through specific, reversible techniques</li>
            <li>Identifying which bureau each issuer pulls from — and which one your file looks best on</li>
            <li>Protecting inquiries while still adding tradelines</li>
          </ul>
          <p className="mb-4 text-lg leading-relaxed">
            This is the part that takes a practitioner, not a blog post. The game is
            information and sequencing — both of which change every time a major issuer
            updates their underwriting.
          </p>
        </section>

        {/* Part 9 */}
        <section className="mt-16">
          <SectionTag>Part 9</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-primary" /> DIY vs Hire a Pro
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            <strong>DIY if:</strong> you have a simple file, no urgency, and want to learn
            the system. You can get to 680–700 in 6–12 months with patience and reading.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            <strong>Hire a pro if:</strong> you need to break 720+, you're applying for a
            mortgage/business loan in under 12 months, or you've already made 2–3 of the
            mistakes above and need someone to un-stall your file.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            The math is simple: a 40-point score bump on a $300K mortgage saves you roughly
            $60,000 over the life of the loan. The cost of doing it right is a fraction of
            that.
          </p>
        </section>

        <CtaBlock
          heading="Ready to build a real profile?"
          sub="Book a free 15-minute call. I'll review your file and map the exact sequence to get you to your target score."
        />

        <div className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
          <p className="italic">
            This blueprint is educational and does not constitute financial, legal, or credit
            advice. Results vary by individual file. No lender, scoring model, or outcome is
            guaranteed. Ascend Solutions complies with the Credit Repair Organizations Act.
          </p>
        </div>
      </article>
    </div>
  );
};

export default CreditBuildingBlueprintPage;
