# SLI Project Summary — What Has Been Done & What's Next
*Imported from Claude App — June 2026*

---

## What This Project Is
- Processing Shipper's Letters of Instruction (SLIs) for SA Bullion Investor Services
- Authorises Brink's (SA) to transport precious metal coin/bullion shipments
- Goal: stop building SLIs manually — have a tool that generates them automatically

---

## What Was Analysed
- 35+ historical SLI documents read (GLD10113 through GLD10148, April–May 2026)
- Both .docx and .pdf versions analysed
- Key fields extracted: invoice numbers, dates, values, coin contents, weights, contacts, addresses, payment types
- **Important:** Real PDFs revealed SLIs are formatted TABLE layouts with Brinks logo — NOT plain text

---

## Key Decisions & Discoveries

### Two SLI types identified:
**TYPE A — Standard Retail Delivery (most common)**
- Small-to-medium coin orders, all within Johannesburg
- Collected and delivered at Brinks Paragon (1 Kramer Rd, Bedfordview)
- Contact: Angelique Render or Sophy
- Payment: Brinks=Collect, User=Prepaid (n/a)
- Responsible person: Angelique Render

**TYPE B — Bulk/Inter-branch Movement**
- Large shipments from Cape Town (Brickfield Canvas) or Rand Refinery
- Delivered to Brinks Paragon or SCOIN (Sandown)
- Contact: Gloria/Abdullah (collect) + Sophy/Daniela (deliver)
- Payment: Brinks=Prepaid, User=Collect
- Responsible person: Abdullah Aragoneses

### Fixed constants (never change):
- Shipper: SA BULLION INVESTOR SERVICES, Brinks Account: 57403
- Service type: always "X Door to door"
- Airports: always N/A (all domestic)
- Footer emails: dj.jnb@brinksglobal.com / ops.jnb@brinksglobal.com

### Invoice numbering:
- Sequential, no gaps intended
- Last issued: GLD10148
- **Next: GLD10149**
- Note: GLD10127 appears twice in history, GLD10133/GLD10136 are missing — pre-existing record issue, do NOT replicate

### Additional delivery location (found in PDFs):
- Brinks SEZ, Bonaero Park, Kempton Park, OR Tambo International Airport Special Economic Zone
- Used for GLD10120

### Special case:
- GLD10140 was valued in USD (not ZAR) — USD values do occur

---

## What Was Built
- A comprehensive Markdown knowledge file (SLI_BRAIN.md) to paste into Claude Code
- Node.js script template using `docx` npm library to generate .docx files
- Full address/contact directory, coin weight reference table, invoice counter

---

## ⚠️ What Still Needs To Be Done (Next Steps)

1. **Visual formatting** — current script produces plain text only. Real SLIs are formatted tables with two-column grid layout. Need to build using docx table components.
2. **Brinks logo** — the real SLI has Brinks logo + "B" crest in top-left. Not yet included.
3. **Checkbox formatting** — real SLIs use ☐/X checkbox symbols in a table. Current script uses plain dashes.
4. **End-to-end test** — no new SLI has been generated yet. System was built and exported. Needs to be tested in Claude Code.
5. **The .docx files in the project are text only** — PDFs are the authoritative source for the true visual format.

---

## How To Continue In Claude Code
1. Open Claude Code
2. Paste the contents of `SLI_BRAIN.md` as your first message
3. Say: *"Generate SLI for [your shipment details]"*
4. Claude will auto-assign the next invoice number and produce the document
