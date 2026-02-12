

# Ascend Solutions LLC — Premium Landing Page

## Overview
A high-converting, mobile-first landing page for credit repair and business funding, designed for paid traffic from Meta, TikTok, and Google Ads. Dark navy + gold premium theme matching the brand logo.

---

## Brand Theme
- **Colors**: Dark navy (#1a1f2e) background, gold (#c5a44e) accents, white text
- **Logo**: Uploaded Ascend Solutions chevron logo used throughout
- **Typography**: Bold, clean, professional — large headlines, easy to skim
- **Style**: Rounded buttons, soft shadows, premium depth, strong contrast

---

## Page Sections (Top to Bottom)

### 1. Sticky Header
- Logo on left, "Ascend Solutions LLC" text
- Clickable phone number (tel: link)
- Minimal nav links: Home, Services, Testimonials, FAQ, Contact (smooth scroll)
- Gold CTA button: **"Get Your Free Credit Strategy Call"**
- On mobile: sticky bottom CTA bar with phone + strategy call button

### 2. Hero Section
- Dark navy background with subtle animated gradient (CSS animation)
- **Headline**: Bold promise about taking control of credit and unlocking funding
- **Subheadline**: Fast results, money-back guarantee, nationwide
- Trust badges: ✅ Money Back Guarantee · ✅ We Work With Bankruptcies · ✅ Nationwide Service
- Two CTA buttons: "Get Your Free Credit Strategy Call" (gold) + "Call Now" (outline)
- **3-Step Lead Capture Form** on the right (stacked below on mobile):
  - Progress indicator (Step 1/2/3)
  - **Step 1**: Name, Phone, Email
  - **Step 2**: Credit score range (dropdown), collections/charge-offs/bankruptcies (yes/no), interested in business funding (yes/no)
  - **Step 3**: "What is your biggest credit goal?" (text area)
  - Consent checkbox, hidden UTM fields (captured from URL params)
  - Submit: **"Schedule My Free Strategy Call"**
  - Submits to GoHighLevel webhook (configurable URL)

### 3. Results / Social Proof Section
- Display the uploaded credit score improvement screenshots as proof of results
- Show key stats: "130+ point increases", "23 negative items deleted", etc.
- Clean card layout showcasing real client improvements

### 4. Services Section (Grid with Icons)
- **Credit Repair**: Collections, charge-offs, late payments, inaccurate reporting, bankruptcies
- **Bankruptcy Assistance**: Active & discharged bankruptcies, strategic rebuilding
- **Credit Building Strategy**: Personalized roadmap, utilization optimization, profile strengthening
- **Business Funding**: Access capital, 0% interest options, structured funding strategy

### 5. Why Choose Us Section
- 3x2 grid of trust bullets with icons:
  - ⚡ Fast Action Plan (24–48 hours)
  - 💰 Money Back Guarantee
  - 💬 Direct Communication
  - ✅ Proven Process
  - 📋 Transparent Pricing
  - 🇺🇸 Nationwide Service

### 6. Testimonials Section
- Card layout with 4-5 testimonials
- Name, location, before/after scores, short result quote, star ratings
- Visually trustworthy design with gold star accents

### 7. Service Areas Section
- "Serving Clients Nationwide" headline
- Short text about remote service anywhere in the US
- Stylized US map SVG with coverage highlight

### 8. FAQ Section (Accordion)
- How fast will I see results?
- What if nothing gets removed?
- Do you work with bankruptcies?
- Is this legal?
- How much does it cost?
- Can you help me get business funding?

### 9. Final CTA Section
- Dark navy background, large gold headline: **"Ready to Fix Your Credit?"**
- Benefit statement
- Repeat the 3-step lead capture form
- Large gold CTA button

### 10. Footer
- Logo, phone, email, service area
- Privacy Policy & Terms links (placeholder pages)
- Legal disclaimer about credit repair services

---

## Technical Details
- Single-page React app with smooth scroll navigation
- UTM parameter capture from URL (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
- Form submissions POST to a GoHighLevel webhook URL (stored as a constant, easily configurable)
- Mobile-first responsive design throughout
- CSS animations for hero gradient motion
- All uploaded images embedded for social proof sections
- No backend required — pure frontend with webhook integration

