# India Recharge Comparison Platform — Final Master Specification

**Dataset Reference Date:** 27 September 2026
**Operators:** Jio, Airtel, Vi (Vodafone Idea), BSNL
**Platform Type:** Telecom Recharge Comparison & Intelligence Platform

---

# 1. Product Vision

## India Recharge Comparison Engine

Build a production-grade platform that compares prepaid/mobile recharge plans across:

* Reliance Jio
* Airtel
* Vi (Vodafone Idea)
* BSNL

The platform must **not** be a static recharge-list website.

It should be built as:

> **Versioned Telecom Plan Database + Data Ingestion Engine + Comparison Engine + Plan Finder + User Utility Platform**

Users should be able to search, filter, compare and discover plans based on price, validity, data, calling, SMS, 4G/5G, OTT benefits, circle, eligibility and other benefits.

---

# 2. Core Product Capabilities

The platform should support:

* Plan search
* Natural-language plan search
* Advanced filtering
* Side-by-side comparison
* Operator comparison
* Circle/state-specific plans
* Price comparison
* Cost-per-day calculation
* Cost-per-GB calculation
* Total-data comparison
* Validity comparison
* 5G comparison
* Unlimited 5G comparison
* OTT comparison
* Data-only plans
* Voice-only plans
* SMS plans
* Annual plans
* International roaming
* ISD plans
* Gaming plans
* Entertainment plans
* Plan Finder
* Saved plans
* Saved comparisons
* Recharge history
* Plan alerts
* Plan-change history
* Data freshness indicators

---

# 3. Recommended Technology Stack

## Frontend

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
Lucide Icons
```

### Why Next.js?

The platform will contain large numbers of SEO pages such as:

```text
/jio-recharge-plans
/airtel-recharge-plans
/vi-recharge-plans
/bsnl-recharge-plans

/jio-2gb-per-day-plans
/airtel-2gb-per-day-plans

/5g-recharge-plans
/annual-recharge-plans
```

Next.js provides a strong foundation for SEO, server rendering and scalable category pages.

---

# 4. Backend

Recommended:

```text
Node.js
TypeScript
Express
```

Alternative for larger enterprise architecture:

```text
NestJS
```

---

# 5. Database

Primary database:

```text
PostgreSQL
```

Recommended providers:

```text
Supabase
Neon
AWS RDS
```

PostgreSQL is preferred because the data is highly relational:

```text
Operator
   ↓
Circle
   ↓
Plan
   ↓
Benefits
   ↓
Sources
   ↓
Versions
   ↓
Verification
```

---

# 6. Additional Infrastructure

## Cache

```text
Redis
```

## Frontend hosting

```text
Vercel
```

## Backend hosting

```text
Render
Railway
AWS
```

## Scheduled jobs

```text
GitHub Actions
Cron
Serverless scheduled jobs
```

## Analytics

```text
PostHog
Google Analytics 4
```

---

# 7. Overall System Architecture

```text
                  ┌──────────────────────┐
                  │   OFFICIAL SOURCES   │
                  │ Jio/Airtel/Vi/BSNL   │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │   SOURCE ADAPTERS    │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │    RAW DATA STORE    │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │    NORMALIZATION     │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │     VALIDATION       │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │   DEDUPLICATION      │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │  CHANGE DETECTION    │
                  └──────────┬───────────┘
                             ↓
                  ┌──────────────────────┐
                  │    ADMIN REVIEW      │
                  └──────────┬───────────┘
                             ↓
              ┌──────────────────────────────┐
              │         POSTGRESQL           │
              │                              │
              │ Operators                    │
              │ Circles                      │
              │ Plans                        │
              │ Benefits                     │
              │ Sources                      │
              │ Versions                     │
              │ Verification                 │
              │ Eligibility                  │
              └──────────────┬───────────────┘
                             ↓
                    ┌────────────────┐
                    │   API LAYER    │
                    └───────┬────────┘
                            ↓
       ┌────────────────────┼────────────────────┐
       ↓                    ↓                    ↓
    SEARCH              COMPARE             PLAN FINDER
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ↓
                    ┌───────────────┐
                    │    Next.js    │
                    │   Frontend    │
                    └───────┬───────┘
                            ↓
                 ┌─────────────────────┐
                 │       USERS         │
                 └─────────────────────┘
```

---

# 8. Website Navigation

## Desktop Header

```text
LOGO

Compare
Plans
Operators
5G
OTT
Data Packs
Voice & SMS
International
Tools
Offers

                         Search
                         Login
```

---

# 9. Main Tabs

| Tab           | Purpose                      |
| ------------- | ---------------------------- |
| Home          | Search and plan discovery    |
| Compare       | Side-by-side plan comparison |
| Plans         | Complete plan database       |
| Operators     | Operator-specific plans      |
| 5G            | 5G and unlimited-5G plans    |
| OTT           | OTT-bundled plans            |
| Data Packs    | Data-only plans              |
| Voice & SMS   | Calling and SMS plans        |
| Annual        | Long-validity plans          |
| International | Roaming and ISD              |
| Offers        | Current offers               |
| Tools         | Calculators and utilities    |

---

# 10. Homepage

```text
========================================================
LOGO                         Compare Plans   Search
========================================================

              Find the right recharge.
         Compare major networks in India.

 [ Budget ] [ Operator ] [ Circle ]

                 SEARCH PLANS

Popular Searches:

₹299 Plans
1.5GB/day
2GB/day
Unlimited 5G
Annual Plans
Data Packs
OTT Plans

--------------------------------------------------------

                    OPERATORS

       Airtel      Jio      Vi      BSNL

--------------------------------------------------------

                  POPULAR PLANS

                    Plan Cards

--------------------------------------------------------

                    PLAN FINDER

   Tell us what you need and find matching plans.

--------------------------------------------------------

                       TOOLS

Cost/GB
Cost/Day
Data Calculator
Annual Cost
```

---

# 11. Circle-First Architecture

Plans must be treated as **circle/region-specific** whenever the source or operator requires it.

User flow:

```text
India
 ↓
Select Circle
 ↓
Select Operator
 ↓
Show Applicable Plans
```

Example:

```text
Telangana
 ├── Jio
 ├── Airtel
 ├── Vi
 └── BSNL
```

The selected circle must affect the backend query.

---

# 12. Plan Categories

Controlled plan taxonomy:

```text
COMBO
DATA
VOICE
SMS
TOPUP
5G
OTT
ANNUAL
INTERNATIONAL
ISD
ROAMING
GAMING
ENTERTAINMENT
SPECIAL
```

---

# 13. Compare Page

## URL

```text
/compare
```

## Filters

```text
Circle
[ Telangana ▼ ]

Operators
☑ Airtel
☑ Jio
☑ Vi
☑ BSNL

Budget
₹0 ---------------- ₹5000

Validity
☐ 1 Day
☐ 7 Days
☐ 14 Days
☐ 28 Days
☐ 30 Days
☐ 56 Days
☐ 60 Days
☐ 70 Days
☐ 77 Days
☐ 84 Days
☐ 90 Days
☐ 180 Days
☐ 300 Days
☐ 365 Days

Data
☐ No Data
☐ <1GB/day
☐ 1GB/day
☐ 1.5GB/day
☐ 2GB/day
☐ 2.5GB/day
☐ 3GB/day
☐ 4GB+
☐ Unlimited

Benefits
☐ Unlimited Calling
☐ SMS
☐ 5G
☐ Unlimited 5G
☐ OTT
☐ Weekend Rollover
☐ Night Data
☐ Data Rollover
☐ Data Delight
```

---

# 14. Advanced Filters

## Price

```text
₹0–₹50
₹51–₹100
₹101–₹200
₹201–₹300
₹301–₹500
₹501–₹1000
₹1000+
Custom
```

## Validity

```text
1 day
2 days
3 days
7 days
14 days
15 days
28 days
30 days
56 days
60 days
70 days
77 days
84 days
90 days
180 days
300 days
365 days
Custom
```

## Data

```text
No data
500 MB
1 GB
1.5 GB
2 GB
2.5 GB
3 GB
4 GB+
Unlimited
```

## Total Data

```text
<5 GB
5–10 GB
10–25 GB
25–50 GB
50–100 GB
100GB+
```

## Calling

```text
Unlimited
100 minutes
200 minutes
300 minutes
500 minutes
1000 minutes
Talktime
No calling
```

## SMS

```text
None
50
100/day
1000
3000
Unlimited
```

## Network

```text
4G
5G
4G + 5G
```

## Benefits

```text
Weekend rollover
Night data
Data rollover
Unlimited 5G
OTT
Music
Cloud storage
Gaming
AI subscriptions
Travel
International roaming
ISD
```

---

# 15. OTT Filters

```text
Netflix
Amazon Prime
JioHotstar
SonyLIV
ZEE5
Sun NXT
Disney
Spotify
YouTube Premium
JioSaavn
Airtel Xstream
Canva
Google One
Cloud Storage
Other
```

---

# 16. User Requirement Filters

```text
Normal User
Light Data User
Heavy Data User
5G User
Student
Senior Citizen
Traveler
Business
Gaming
Entertainment
```

---

# 17. Sorting

```text
Recommended
Price: Low → High
Price: High → Low
Validity: Low → High
Validity: High → Low
Data: Low → High
Data: High → Low
₹/GB: Low → High
₹/Day: Low → High
Recently Updated
```

Avoid unexplained "Best Plan" rankings.

Instead show measurable matching factors.

---

# 18. Plan Card

```text
┌──────────────────────────────────────┐
│ JIO                            5G ✓  │
│                                      │
│ ₹349                                 │
│                                      │
│ 2 GB/day                             │
│ 28 Days                              │
│                                      │
│ ✓ Unlimited Calls                   │
│ ✓ 100 SMS/day                       │
│ ✓ 5G Benefit                        │
│ ✓ OTT                               │
│                                      │
│ ₹12.46 / day                        │
│ ₹6.23 / GB                          │
│                                      │
│ ✓ Verified today                    │
│                                      │
│       Compare      Recharge →       │
└──────────────────────────────────────┘
```

---

# 19. Comparison Table

Allow users to select up to four plans.

```text
                 Airtel       Jio        Vi        BSNL

Price             ₹349        ₹349       ₹349       ₹347
Validity          28d         28d        28d        30d

Daily Data        1.5GB       2GB        1.5GB      2GB
Total Data        42GB        56GB       42GB       60GB

Calls             UL          UL         UL         UL
SMS               100/day     100/day    100/day    100/day

5G                ✓           ✓          ✓          -
Unlimited 5G      ✓           ✓          ✓          -

OTT               -           ✓          ✓          -
Rollover          -           -          ✓          -

₹/day             12.46       12.46      12.46      11.57
₹/GB              8.31        6.23       8.31       5.78

Verified          Date        Date       Date       Date

Recharge          Button      Button     Button     Button
```

Exact plan values must come from the current database and selected circle.

---

# 20. Plan Finder

```text
PLAN FINDER

What do you need?

○ Maximum data
○ Cheapest recharge
○ Long validity
○ 5G
○ OTT
○ Calling
○ Travel
○ Gaming
○ Student
○ Emergency data

Monthly budget
₹ _______

Circle
[ Telangana ▼ ]

Current operator
[ Jio ▼ ]

Daily data requirement
[ 2GB ▼ ]

             FIND PLANS
```

Results should explain matching criteria:

```text
Matches your requirements:

✓ Under ₹400
✓ 2GB/day
✓ 28-day validity
✓ 5G
✓ Unlimited calling
```

---

# 21. Natural-Language Search

The search engine should understand requests such as:

```text
2GB per day under 400 for 28 days
```

Convert into:

```json
{
  "data_per_day": 2,
  "max_price": 400,
  "validity": 28
}
```

Example:

```text
cheapest 5G plan
```

Convert into:

```json
{
  "five_g": true,
  "sort": "price_asc"
}
```

Example:

```text
annual jio plan with ott
```

Convert into:

```json
{
  "operator": "jio",
  "validity": 365,
  "ott": true
}
```

---

# 22. Database Architecture

## operators

```text
id
name
slug
display_name
logo
primary_color
website
recharge_url
status
created_at
updated_at
```

---

## circles

```text
id
name
slug
state
region
status
```

---

## plans

```text
id
operator_id
circle_id

plan_name
price

plan_type
category
subcategory

validity_value
validity_unit

data_type
data_total
data_per_day
data_unit

voice_minutes
voice_type

sms_total
sms_per_day

network_type
five_g
unlimited_5g

ott_available
ott_details

weekend_rollover
night_data
data_rollover
data_delight

benefits_json
eligibility_json

source_url
source_type

effective_from
effective_until

last_verified_at

status
created_at
updated_at
```

---

# 23. Plan Status

Use controlled status values:

```text
DRAFT
PENDING_VERIFICATION
ACTIVE
TEMPORARILY_UNAVAILABLE
DISCONTINUED
EXPIRED
REJECTED
```

---

# 24. Plan Eligibility

Plans may have restrictions based on:

```text
Circle
Customer type
Existing/new customer
5G device
5G coverage
Prepaid/Postpaid
Specific account
Specific recharge type
```

Store this using:

```text
eligibility_json
```

or structured relational eligibility tables when complexity increases.

---

# 25. Plan Versioning

Never delete historical plan information.

Create:

```text
plan_versions
```

Example:

```text
Airtel ₹299

01 Jul 2026
₹299 → 1GB/day

15 Aug 2026
₹299 → discontinued

20 Aug 2026
₹299 → removed
```

---

# 26. Sources Table

```text
sources

id
operator_id
source_type
source_url
source_name
last_fetched_at
last_success_at
status
created_at
updated_at
```

Supported source types:

```text
OFFICIAL_API
OFFICIAL_PAGE
OFFICIAL_PDF
OFFICIAL_TNC
MANUAL_ADMIN
LICENSED_PROVIDER
SECONDARY_VERIFICATION
```

---

# 27. Plan Sources

```text
plan_sources

id
plan_id
source_id
source_plan_id
retrieved_at
content_hash
created_at
```

This connects a normalized plan to the original source record.

---

# 28. Verification Table

```text
plan_verifications

id
plan_id
verified_by
verification_type
verified_at
status
notes
```

Verification statuses:

```text
VERIFIED
PENDING
FAILED
REQUIRES_REVIEW
```

---

# 29. Raw Data Architecture

Never overwrite extracted source data.

Use:

```text
RAW SOURCE DATA
       ↓
NORMALIZED PLAN
       ↓
VALIDATED PLAN
       ↓
PUBLISHED PLAN
```

Raw source data should be retained for debugging, auditing and change detection.

---

# 30. Data Ingestion Architecture

```text
OFFICIAL / LICENSED / VERIFIED SOURCES
                ↓
          SOURCE ADAPTERS
                ↓
          RAW DATA STORE
                ↓
           NORMALIZATION
                ↓
            VALIDATION
                ↓
          DEDUPLICATION
                ↓
          CHANGE DETECTION
                ↓
           ADMIN REVIEW
                ↓
             PUBLISH
                ↓
            PostgreSQL
```

Do not assume that every operator exposes data in the same format.

Each operator should have its own source adapter.

---

# 31. Data Source Priority

## Level 1

Official operator sources:

```text
Jio
Airtel
Vi
BSNL
```

## Level 2

Official:

```text
Terms & Conditions
Official PDFs
Official press releases
Official recharge pages
Official APIs
```

## Level 3

Secondary verification:

```text
Gadgets 360
TelecomTalk
Indian Express
Moneycontrol
Other reputable telecom sources
```

Official sources should take priority when sources conflict.

Only collect data through sources/methods that are legally and technically permitted.

---

# 32. Validation Engine

Every incoming plan should be checked for:

```text
Price validity
Currency
Validity format
Data units
Daily vs total data
Voice units
SMS units
5G requirements
OTT names
Circle
Eligibility
Source availability
Duplicate plan
Discontinued status
Effective dates
```

---

# 33. Deduplication

Potential duplicates should be detected using:

```text
Operator
Circle
Price
Validity
Data
Voice
SMS
Major Benefits
```

Do not automatically merge conflicting records.

Send conflicts to admin review.

---

# 34. Change Detection

Scheduled process:

```text
CRON JOB
   ↓
Fetch source
   ↓
Extract plans
   ↓
Normalize
   ↓
Compare with current database
   ↓
Change detected?
   |
   +---- NO → Finish
   |
   +---- YES
           ↓
       Create change
           ↓
       Admin review
           ↓
      +----+----+
      |         |
    Approve   Reject
      |
      ↓
    Publish
```

Example:

```text
PLAN CHANGE DETECTED

Jio ₹3599

OLD
365 days
2GB/day

NEW
365 days
2GB/day
+ 120GB bonus 5G data

[Approve]
[Reject]
```

---

# 35. Data Freshness

Every plan should visibly show its verification freshness.

Examples:

```text
✓ Verified today
```

```text
✓ Verified 2 hours ago
```

```text
⚠ Last verified 3 days ago
```

This is preferable to simply showing a generic "Updated" date.

---

# 36. Comparison Engine

```text
                COMPARISON ENGINE
                        |
       +----------------+----------------+
       |                |                |
       v                v                v
 FILTER ENGINE    NORMALIZATION      COST CALCULATOR
       |                |                |
       +----------------+----------------+
                        |
                        v
                  BENEFIT MATCHER
                        |
                        v
                    RESULT SET
```

---

# 37. Cost Calculations

Calculate automatically:

```text
cost_per_day
cost_per_GB
total_data
data_per_day
monthly_equivalent
annual_equivalent
cost_per_100GB
```

Example:

```text
₹349 / 28 days
= ₹12.46/day

₹349 / 42GB
= ₹8.31/GB
```

---

# 38. Unlimited Data Model

Do not represent all unlimited plans as numeric data.

Use:

```text
FIXED
DAILY
UNLIMITED
NIGHT_UNLIMITED
5G_UNLIMITED
ADDON
```

Example:

```json
{
  "data_type": "DAILY",
  "daily_data_gb": 2
}
```

Unlimited:

```json
{
  "data_type": "UNLIMITED",
  "fair_usage_policy": true
}
```

Unlimited 5G:

```json
{
  "data_type": "5G_UNLIMITED",
  "requires_eligible_device": true
}
```

---

# 39. Current Dataset Snapshot

**Reference date: 27 September 2026**

The current public plan inventories are circle/region-dependent and change frequently.

| Operator | Current indexed count found | Scope                  |
| -------- | --------------------------: | ---------------------- |
| Airtel   |                          56 | Andhra Pradesh example |
| Jio      |     Dynamic/circle-specific | Multiple categories    |
| Vi       |                         117 | Prepaid                |
| BSNL     |                         109 | Prepaid                |

These numbers are a snapshot, not permanent nationwide counts.

---

# 40. Airtel Current Extracted Examples

Current indexed Airtel Andhra Pradesh examples:

| Price |      Data | Validity |
| ----: | --------: | -------: |
|   ₹22 |      1 GB |    1 day |
|   ₹26 |    1.5 GB |    1 day |
|   ₹33 |      2 GB |    1 day |
|   ₹39 |  3 GB/day |   3 days |
|   ₹49 | Unlimited |    1 day |
|   ₹77 |      5 GB |   7 days |
|   ₹99 | Unlimited |   2 days |
|  ₹100 |      6 GB |  30 days |
|  ₹200 |     30 GB |  28 days |
|  ₹219 |      3 GB |  28 days |
|  ₹279 |     30 GB |  1 month |

These are an Andhra Pradesh indexed snapshot and must not automatically be treated as nationwide plans.

---

# 41. Vi Current Extracted Examples

Current indexed Vi prepaid database:

**117 prepaid plans** in the referenced database.

Examples:

| Price |  Data | Context   |
| ----: | ----: | --------- |
|   ₹22 |  1 GB | Data pack |
|   ₹48 |  6 GB | Data pack |
|   ₹33 |  2 GB | Data pack |
|  ₹139 | 12 GB | Data pack |

Vi also has OTT and other plan categories.

---

# 42. BSNL Current Extracted Examples

Current indexed BSNL database:

**109 prepaid plans** in the referenced database.

Examples:

|  Price |       Data | Validity |
| -----: | ---------: | -------: |
|    ₹49 |      10 GB |  30 days |
|   ₹141 | 1.5 GB/day |  30 days |
| ₹1,551 |   2 GB/day | 365 days |
| ₹1,499 |      32 GB | 300 days |

---

# 43. Jio Current Extracted Examples

Current indexed data-pack examples:

| Price |        Data |             Validity |
| ----: | ----------: | -------------------: |
|   ₹19 |        1 GB |             24 hours |
|   ₹29 |        2 GB |             48 hours |
|   ₹49 |       25 GB |             24 hours |
|  ₹175 | 10 GB + OTT |              28 days |
|  ₹219 |       30 GB |              30 days |
|  ₹289 |       40 GB | Current indexed pack |
|  ₹359 |       50 GB |              30 days |

Jio categories include:

```text
OTT
Annual
International Roaming
In-flight
Data Add-ons
Voice/SMS
```

Current plan benefits must always be reverified before publication.

---

# 44. Operator Pages

```text
/operators/airtel
/operators/jio
/operators/vi
/operators/bsnl
```

Layout:

```text
Operator Recharge Plans

[Search Plans]

Popular
Data
Unlimited
5G
OTT
Annual
Voice
SMS
International

Filters

Plan Cards
```

---

# 45. Category Pages

```text
/plans/5g
/plans/unlimited
/plans/1gb-day
/plans/1-5gb-day
/plans/2gb-day
/plans/3gb-day

/plans/28-days
/plans/56-days
/plans/84-days
/plans/365-days

/plans/data-only
/plans/voice-only
/plans/ott
/plans/annual
/plans/international-roaming
```

---

# 46. SEO Architecture

Important SEO pages:

```text
/jio-recharge-plans
/airtel-recharge-plans
/vi-recharge-plans
/bsnl-recharge-plans

/jio-2gb-per-day-plans
/airtel-2gb-per-day-plans
/vi-2gb-per-day-plans

/jio-28-day-plans
/airtel-28-day-plans

/5g-recharge-plans
/5g-recharge-plans-under-500

/jio-telangana
/airtel-telangana
/vi-telangana
/bsnl-telangana
```

All SEO pages must be dynamically generated from current verified database information.

Avoid creating thousands of thin pages with no meaningful differences.

---

# 47. API Architecture

```text
/api/v1/operators
/api/v1/circles

/api/v1/plans
/api/v1/plans/search
/api/v1/plans/compare
/api/v1/plans/recommended
/api/v1/plans/categories

/api/v1/operators/:operator/plans
/api/v1/circles/:circle/plans

/api/v1/ott
/api/v1/5g
/api/v1/history

/api/v1/sources
/api/v1/verification
```

Example:

```http
GET /api/v1/plans?operator=jio&circle=telangana&maxPrice=500&validity=28&dataPerDay=2&fiveG=true
```

---

# 48. Frontend Folder Structure

```text
src/
|
+-- app/
|   +-- page.tsx
|   +-- compare/
|   +-- plans/
|   +-- operators/
|   +-- data/
|   +-- 5g/
|   +-- ott/
|   +-- annual/
|   +-- international/
|   +-- tools/
|
+-- components/
|   +-- navbar/
|   +-- footer/
|   +-- plan-card/
|   +-- comparison-table/
|   +-- filters/
|   +-- operator-card/
|   +-- search/
|   +-- badges/
|   +-- charts/
|
+-- lib/
|   +-- api/
|   +-- calculations/
|   +-- filters/
|   +-- formatting/
|
+-- hooks/
|
+-- types/
|
+-- styles/
```

---

# 49. Backend Folder Structure

```text
server/
|
+-- src/
|
+-- modules/
|   +-- operators/
|   +-- circles/
|   +-- plans/
|   +-- comparison/
|   +-- recommendations/
|   +-- ott/
|   +-- sources/
|   +-- ingestion/
|   +-- verification/
|   +-- users/
|
+-- jobs/
|   +-- airtel-sync
|   +-- jio-sync
|   +-- vi-sync
|   +-- bsnl-sync
|   +-- change-detection
|
+-- database/
+-- middleware/
+-- utils/
```

---

# 50. Mobile Navigation

```text
┌──────────────────────────────────┐
│          PAGE CONTENT            │
├──────────────────────────────────┤
│ Home │ Compare │ Plans │ Tools │ More │
└──────────────────────────────────┘
```

---

# 51. Mobile Filter UX

Use a bottom-sheet filter.

```text
FILTER

Operator       >
Price           >
Data            >
Validity        >
Benefits        >
Network         >
OTT             >

          APPLY FILTERS
```

---

# 52. Visual Design

## Primary Colors

```text
Midnight Navy     #0B1020
Background        #F7F8FC
Card              #FFFFFF
Electric Blue     #2563EB
Indigo            #6366F1
Success           #16A34A
Warning           #F59E0B
Danger            #DC2626
```

## Operator Accents

```text
Jio       → Blue
Airtel    → Red
Vi        → Magenta/Purple
BSNL      → Orange
```

Operator colors should mainly identify operators rather than dominate the entire UI.

---

# 53. Typography

```text
Headings → Manrope
Body → Inter
Numbers → Inter
Tables → Inter
```

Large numeric typography should be used for:

```text
₹349
2GB/day
28 Days
₹8.31/GB
```

---

# 54. UI Style

```text
Border radius: 12–16px
Buttons: 10–12px
Inputs: 10–12px
```

Cards:

```text
White
Thin border
Subtle shadow
```

Tables:

```text
Minimal borders
High readability
Sticky comparison headers where useful
```

Icons:

```text
Lucide
```

Avoid:

```text
Excessive gradients
Excessive neon
Heavy glassmorphism
Large glowing effects
Unnecessary animations
```

---

# 55. Performance Requirements

The platform should prioritize:

```text
Fast initial load
Server-side rendering
Image optimization
Code splitting
Lazy loading
Caching
Database indexes
API pagination
Virtualized large tables where required
Minimal client-side JavaScript
```

Targets:

```text
Fast mobile loading
Core Web Vitals optimized
Responsive at all breakpoints
Accessible keyboard navigation
```

---

# 56. User Accounts

Do not force users to log in for basic comparison.

Anonymous users:

```text
Search
Filter
Compare
Plan Finder
Calculators
```

Logged-in users:

```text
Saved plans
Saved comparisons
Recharge history
Alerts
Preferences
```

Design authentication into the architecture from the beginning even if it is implemented later.

---

# 57. Dual-SIM Feature

Future utility:

```text
SIM 1
Jio
₹349

SIM 2
BSNL
₹199

Estimated monthly cost
₹548
```

Support:

```text
Primary SIM
Secondary SIM
Data SIM
```

---

# 58. Recharge History

Logged-in users can view:

```text
MY RECHARGES

Jio
₹349
28 days

Airtel
₹199
28 days

Total spent this month
₹548
```

The system can calculate alternative costs based on transparent user-selected requirements.

---

# 59. Plan Alerts

Example:

```text
ALERT

Operator: Jio
Data: 2GB/day
Maximum Price: ₹400
Minimum Validity: 28 days

[CREATE ALERT]
```

Alerts should trigger when verified database information satisfies the user's criteria.

---

# 60. Tools

Create a dedicated Tools section:

```text
Cost per GB Calculator
Cost per Day Calculator
Annual Cost Calculator
Data Requirement Calculator
Recharge Cost Calculator
Dual SIM Cost Calculator
Plan Finder
Plan Change History
```

---

# 61. Data Requirement Calculator

Inputs:

```text
YouTube
Instagram
WhatsApp
Music Streaming
Gaming
Browsing
Video Calls
```

Outputs:

```text
Estimated daily usage
Estimated monthly usage
Recommended data tier
Matching plans
```

---

# 62. Admin Dashboard

```text
ADMIN

Dashboard
|
+-- Plans
|   +-- All Plans
|   +-- Add Plan
|   +-- Edit Plan
|   +-- Expired Plans
|   +-- Pending Verification
|
+-- Operators
+-- Circles
+-- Categories
+-- OTT Services
|
+-- Sources
|
+-- Change Detection
|
+-- Verification
|
+-- Reports
|
+-- Users
|
+-- Alerts
|
+-- System
```

Dashboard metrics:

```text
TOTAL PLANS
ACTIVE
EXPIRED
CHANGED TODAY
PENDING VERIFY
SOURCE FAILURES
```

---

# 63. Admin Change Workflow

```text
Source Change
      ↓
Detected
      ↓
Difference Report
      ↓
Admin Review
      ↓
Approve / Reject
      ↓
Version Created
      ↓
Published
```

Never silently overwrite verified production data.

---

# 64. Security

Implement:

```text
JWT/session authentication
Role-based access control
Admin MFA where possible
Rate limiting
Input validation
SQL injection protection
CSRF protection where applicable
Secure secrets management
Audit logging
API authentication
Admin activity logging
```

Roles:

```text
SUPER_ADMIN
ADMIN
DATA_EDITOR
VERIFIER
ANALYST
USER
```

---

# 65. Audit Logs

Record administrative actions:

```text
user_id
action
entity_type
entity_id
old_value
new_value
timestamp
IP/session metadata where legally appropriate
```

Examples:

```text
PLAN_CREATED
PLAN_UPDATED
PLAN_APPROVED
PLAN_REJECTED
PLAN_DELETED
PLAN_RESTORED
SOURCE_UPDATED
VERIFICATION_COMPLETED
```

---

# 66. Caching Strategy

Use caching for:

```text
Operator lists
Circle lists
Popular plans
Category pages
Frequently searched plans
Comparison results
```

Do not cache indefinitely.

Use appropriate TTLs because telecom plans can change.

---

# 67. Database Indexing

Important indexes:

```text
operator_id
circle_id
price
validity_value
plan_type
category
data_type
five_g
unlimited_5g
status
last_verified_at
effective_from
```

Composite indexes should be created based on actual query patterns.

Example:

```text
(operator_id, circle_id, status)
```

and:

```text
(circle_id, category, status)
```

---

# 68. Pagination

Never return thousands of plans in one API response.

Use:

```text
page
limit
cursor
```

Prefer cursor pagination for large datasets.

---

# 69. Current Source References

Primary/reference sources used for the current snapshot:

* Jio official recharge system:
  https://www.jio.com/selfcare/recharge/

* Vi official website:
  https://www.myvi.in/

* Airtel official terms/source documentation:
  https://assets.airtel.in/static-assets/online-recharge-ui/assets/pdf/tnc.pdf

* Multi-operator plan database:
  https://www.gadgets360.com/mobile-recharge-plans

* Airtel Andhra Pradesh plans:
  https://www.gadgets360.com/mobile-recharge-plans/airtel-prepaid-andhra-pradesh

* Vi prepaid plans:
  https://www.gadgets360.com/mobile-recharge-plans/vi-prepaid

* BSNL prepaid plans:
  https://www.gadgets360.com/mobile-recharge-plans/bsnl-prepaid

---

# 70. MVP Build Order

## Phase 0 — Architecture & Data Foundation

```text
1. Next.js
2. TypeScript
3. Tailwind
4. PostgreSQL
5. Database migrations
6. Operators
7. Circles
8. Plan taxonomy
9. Sources
10. Raw plan storage
11. Plan schema
12. Plan versioning
13. Verification
14. Eligibility
15. Status system
```

---

## Phase 1 — Core Product

```text
16. Home
17. Plans page
18. Operator pages
19. Circle selection
20. Filters
21. Sorting
22. Search
23. Plan cards
24. Comparison table
25. Cost calculations
```

---

## Phase 2 — Data Engine

```text
26. Source adapters
27. Data extraction
28. Normalization
29. Validation
30. Deduplication
31. Change detection
32. Admin review
33. Publishing workflow
34. Data freshness system
```

---

## Phase 3 — Intelligence

```text
35. Natural-language search
36. Plan Finder
37. Cost/GB
38. Cost/day
39. Data calculator
40. Requirement matching
41. Saved comparisons
```

---

## Phase 4 — Growth

```text
42. SEO pages
43. User accounts
44. Saved plans
45. Recharge history
46. Price/plan alerts
47. Analytics
48. Admin reports
49. Performance optimization
50. Advanced recommendation system
```

---

# 71. Development Principle

The application must be **data-driven**.

Do not hard-code plans into React components.

Bad:

```text
const plans = [...]
```

Good:

```text
Frontend
   ↓
API
   ↓
PostgreSQL
   ↓
Verified Plan Data
```

The UI should render whatever plans are currently active and verified in the database.

---

# 72. Production Data Flow

```text
Operator Source
      ↓
Source Adapter
      ↓
Raw Data
      ↓
Normalize
      ↓
Validate
      ↓
Deduplicate
      ↓
Compare Against Current Version
      ↓
Change?
  ┌───┴───┐
 NO      YES
  │        │
  │    Admin Review
  │        │
  │    Approve
  │        │
  └────┬───┘
       ↓
PostgreSQL
       ↓
API
       ↓
Cache
       ↓
Next.js
       ↓
User
```

---

# 73. Final Product Structure

```text
                    INDIA RECHARGE PLATFORM
                              |
        +---------------------+---------------------+
        |                     |                     |
        v                     v                     v
      SEARCH               COMPARE             PLAN FINDER
        |                     |                     |
        +---------------------+---------------------+
                              |
                              v
                      VERIFIED PLANS
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
           JIO             AIRTEL             VI
             |                |                |
             +----------------+----------------+
                              |
                            BSNL
                              |
                              v
                    VERSIONED DATABASE
                              |
                              v
                    DATA INTELLIGENCE
```

---

# 74. Final Architecture Decision

This specification should be treated as the **master technical/product blueprint**.

The most important design decisions are:

1. **PostgreSQL as the source of truth**
2. **Circle-aware plan architecture**
3. **Source adapters instead of one generic scraper**
4. **Raw data retained separately**
5. **Normalized plan records**
6. **Plan versioning**
7. **Verification workflow**
8. **Eligibility support**
9. **Automatic change detection**
10. **Admin approval before publishing changes**
11. **Data freshness displayed to users**
12. **Comparison engine separated from UI**
13. **Natural-language Plan Finder**
14. **SEO-generated category/operator/circle pages**
15. **Anonymous comparison + optional user accounts**
16. **Transparent calculations rather than unexplained rankings**
17. **Performance-first frontend**
18. **Audit logging for administrative changes**

---

# 75. Important Data Disclaimer

The plan examples and indexed plan counts in this document represent a **27 September 2026 snapshot** of publicly available/indexed information.

Telecom plans can change at any time and may vary by:

* Circle
* Customer eligibility
* Account
* Device
* Network availability
* Recharge type
* Operator policy
* Promotional period

Therefore, the production platform must verify plan availability against the applicable current source before displaying a plan as currently available.

---

# 76. Product Goal

The final platform should become:

> **A trusted, searchable, circle-aware and continuously updated database for comparing India's mobile recharge plans.**

The website should not merely answer:

> "Which recharge is cheaper?"

It should allow the user to define exactly what they need and transparently compare the available plans using current verified data.
