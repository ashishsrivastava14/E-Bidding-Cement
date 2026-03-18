# E-Bidding Cement Platform — User Guide

## Application Overview

This is a **cement freight e-bidding platform**. The core workflow: a cement plant creates dispatch orders → transport vendors bid to fulfill those orders → the lowest bid (L1) wins the freight contract. Four roles participate in this process.

---

## How to Log In

1. Open the app — you land on the **Login page**
2. Select your role tab: **Vendor | Admin | Customer | Super Admin**
3. Log in with either:
   - **Password** — enter username/mobile + password
   - **OTP** — enter username/mobile, click "Send OTP", wait for the code (30-second resend cooldown)
4. You are taken directly to your role's dashboard

---

## Role 1: Vendor

**Purpose:** Browse open tenders, place freight bids, and track bid outcomes.

**Navigation:** Dashboard · Live Bidding · Bid History

### Dashboard (`/vendor/dashboard`)
- See KPIs at a glance: Active Tenders, My Active Bids, Bids Won this month, Total Savings
- View a 7-day line chart of your bidding activity (bids placed vs. won)
- Review recent bid activity in a summary table

### Live Bidding (`/vendor/bidding`) — *Main screen*
- Use the **FilterBar** (toggled via "Show/Hide Search" in the navbar) to filter by depot, order type, pack type, or date
- Use the **text search** box to find specific orders by Club ID or destination
- The **Countdown Timer** shows how much time remains in the current bidding session
- **Enter your bid amount** in the editable "Bid Amount" column for each order you want to bid on
- Watch your **Bid Rank** update in real-time as competitors place bids
- Click **Save** to submit all your entered bids before the timer expires
- When the timer hits zero, inputs are locked and a **"BIDDING CLOSED"** overlay appears

### Bid History (`/vendor/history`)
- Filter past bids by status (WON / LOST / ACTIVE) or by date range or by text search
- **Export CSV** to download your filtered bid history as a `.csv` file

---

## Role 2: Admin

**Purpose:** Manage tenders and vendors, monitor live bidding sessions, and generate reports.

**Navigation:** Dashboard · Tenders · Live Monitor · Vendors · Reports

### Dashboard (`/admin/dashboard`)
- KPIs: Total Active Tenders, Total Bids Today, Vendors Online, Tenders Closing Soon
- Bar chart showing bid volume per depot
- Donut chart showing Customer Orders vs. Transfer Orders split
- Live activity feed with timestamped events (vendor bids, logins, tender changes)

### Tender Management (`/admin/tenders`)
- **Create a Tender** — fill in Plant, Depot, Route, Order Type, Quantity, Base Freight, Start/End Time, and assign vendors (only Active vendors are selectable)
- **Per-tender actions:** View details | Edit | Delete | **Start/Stop Bidding** (toggles status ACTIVE ↔ CLOSED)
- Tender statuses: `DRAFT` → `ACTIVE` → `CLOSED`

### Live Monitor (`/admin/live`)
- **Read-only** view of all live orders and current bid rankings (updates in real-time)
- **Extend +5 min** — adds 5 minutes to the bidding timer
- **Stop Bidding** — immediately closes the session (resets timer to 0)

### Vendor Management (`/admin/vendors`)
- View all vendors with their assigned depots, status, and last bid timestamp
- **Add Vendor** — enter name, contact number, and assign depots
- **Toggle Active/Inactive** — inactive vendors cannot be assigned to new tenders

### Reports (`/admin/reports`)
- Filter bid history by date range, depot, or tender ID
- See dynamic KPI cards: Total Orders, L1 Savings vs. Base Freight, Average Bid Count
- **Export Excel / Export PDF** buttons for reporting

---

## Role 3: Customer

**Purpose:** View the status of their own cement orders and see which vendors bid and at what prices.

**Navigation:** Dashboard · My Orders

> Customers have **read-only** access — no actions that modify data.

### Dashboard (`/customer/dashboard`)
- KPIs: Orders Placed, Bids Received, Orders Allocated, Pending
- Line chart showing order trend over the last 7 days

### My Orders (`/customer/orders`)
- Table of all orders with status (BIDDING / ALLOCATED / PENDING), L1 Bid amount, and Assigned Vendor
- **Click any row** to open a detail modal showing:
  - Full order metadata
  - A sub-table of the top 5 vendor bids (with rank, amount, date) — the winning L1 bid is highlighted

---

## Role 4: Super Admin

**Purpose:** Manage the platform at the tenant level — onboard companies and oversee subscriptions/revenue.

**Navigation:** Dashboard · Companies · Subscriptions

### Dashboard (`/superadmin/dashboard`)
- KPIs: Total Companies, Active Subscriptions, Revenue This Month, Total Platform-wide Bids
- Area chart showing platform growth trend (bids & active companies over time)

### Companies (`/superadmin/companies`)
- Table of all registered companies showing their plan tier (Basic / Professional / Enterprise), user count, and status
- **Add Company** — enter company name, select a plan, and set number of users

### Subscriptions (`/superadmin/subscriptions`)
- View the three plan tiers side by side:

| Plan | Price | Highlights |
|---|---|---|
| Basic | ₹9,999/mo | 5 users, 50 bids/month |
| Professional | ₹24,999/mo | 20 users, unlimited bids, API access |
| Enterprise | ₹49,999/mo | Unlimited users & bids, white-label, dedicated manager |

- See how many companies are active on each plan
- Select or change a company's plan

---

## Key Notes

- The **theme** (dark/light) can be toggled from the top-right corner of any screen and persists across pages
- **Bid ranks are live** — both vendors and admins see ranks recalculate in real-time as competitor bids come in
- The **timer is shared conceptually** between the vendor's Live Bidding screen and the admin's Live Monitor — the admin controls it (extend/stop), and the vendor's Save button is disabled once time runs out
