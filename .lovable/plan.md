

# Updated Redesign Plan — Adding Pricing Section

Everything from the previously approved redesign remains the same (white theme, centered layout, video testimonials, etc.), with one addition:

## New: Pricing Section (`src/components/Pricing.tsx`)

A clean, side-by-side pricing comparison with two cards:

**Card 1 — One-Time Payment**
- Price: **$799**
- "Pay once, done" messaging
- Feature list (full credit repair service, all 3 bureaus, dispute rounds, etc.)
- Gold CTA button: "Get Started"

**Card 2 — Monthly Plan**
- Price: **$125/month**
- "Flexible monthly payments" messaging
- Same feature list
- Gold CTA button: "Get Started"
- Optional "Most Popular" badge

Both CTAs scroll to the lead form (or link to a payment flow if you add Stripe later).

## Page Order Update (`src/pages/Index.tsx`)
1. Header
2. Hero
3. Results
4. Video Testimonials
5. Services (Process)
6. **Pricing** (new)
7. Why Choose Us
8. Testimonials
9. Service Areas
10. FAQ
11. Final CTA
12. Footer / Mobile CTA

## Files
- **Create**: `src/components/Pricing.tsx`
- **Modify**: `src/pages/Index.tsx` (add import + place in order)
- Plus all 13 files from the previous redesign plan (theme, hero, header, results, services, etc.)

Total: 1 new file + 14 modified files.

