# 📦 CREATOR MARKETPLACE — MASTER PROJECT STATE (v1.0)

Last Updated: May 2026  
Status: MVP Complete (Frontend + Mock Backend + File DB)

---

# 🧠 1. PROJECT OVERVIEW

Creator Marketplace is a feed-driven platform connecting:
- Brands posting opportunities
- Creators discovering and applying
- Match system ranking relevance

Core flow:
Feed → Card → Apply → API → JSON DB → Brand Dashboard

---

# 🏗️ 2. ARCHITECTURE

## Frontend (Next.js App Router)

- /app/page.tsx
  - Main marketplace feed
  - Uses buildFeedV2()

- /app/brand/dashboard/page.tsx
  - Brand proposal inbox
  - Filters proposals by brandId

---

## UI Components

- /app/components/ui/MarketplaceCard.tsx
  - Core reusable card
  - Handles:
    - Apply button
    - loading state
    - applied state
    - hover animation

---

## Backend (API Routes)

- /app/api/proposals/route.ts
  - GET → returns all proposals
  - POST → creates proposal
  - Writes to proposals.json

---

## Data Storage

- proposals.json (temporary database)

Structure:
[
  {
    id,
    creatorId,
    brandId,
    message,
    status,
    createdAt
  }
]

---

# 🔄 3. DATA FLOW

User clicks Apply
→ MarketplaceCard
→ POST /api/proposals
→ proposals.json updated
→ dashboard fetches GET /api/proposals
→ filters by brandId
→ renders proposals

---

# ⚙️ 4. CORE SYSTEMS

## Feed Engine
- buildFeedV2()
- Combines:
  - creators
  - brands
  - match signals
- Sorted by score

## Match Engine
- boosts relevant creator-brand pairings

## Proposal System
- file-based persistence
- no database yet

---

# 🧪 5. CURRENT LIMITATIONS

- ❌ No database (using JSON file)
- ❌ No authentication system
- ❌ No real-time updates
- ❌ No user roles
- ❌ Hardcoded creatorId

---

# 🚀 6. WHAT WORKS NOW

✔ Feed renders correctly  
✔ Apply button creates proposals  
✔ API writes to JSON file  
✔ Dashboard reads + filters proposals  
✔ GitHub repo fully synced  
✔ UI animations restored  

---

# 🧭 7. NEXT PHASE ROADMAP

## Phase 2 — Database Upgrade
- Prisma + Postgres
- Replace JSON storage

## Phase 3 — Auth System
- Creator accounts
- Brand accounts
- Role-based dashboards

## Phase 4 — Real-Time Updates
- live proposal updates
- no refresh needed

## Phase 5 — Intelligence Layer
- improved match scoring
- ranking improvements

---

# 🧠 SYSTEM RULE

This file defines the current system truth.

If code conflicts with this document:
→ this file wins