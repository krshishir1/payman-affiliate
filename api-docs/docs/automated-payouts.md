---
title: "Automated Payouts"
description: "How cron jobs automate affiliate payouts using Payman AI agents."
slug: "/api/automated-payouts"
sidebar_position: 4
---

# Automated Payouts

Affiliate commissions often require scheduled payouts based on predefined payout frequencies. This document explains how our **automated payout system** leverages **cron jobs** and **Payman AI agents** to handle these transactions seamlessly.

## Use Case: Automating Affiliate Payouts

Merchants using our platform can set **payout frequencies** for their affiliate programs. The system periodically checks for due payouts and automates fund transfers through **Payman AI**.

### **How It Works**

1. **Scheduled Cron Jobs**:
   - A **cron job** runs daily to check all **approved** commissions that meet the payout criteria.
   - The system filters commissions based on their **payout frequency** (weekly/monthly) and **payout threshold**.
   
2. **Processing Due Payouts**:
   - The cron job fetches affiliates with **due payouts**.
   - It aggregates the amounts per affiliate and prepares payout requests.
   
3. **Payman AI Integration**:
   - The system sends payout requests to **Payman AI**.
   - Payman AI agents process the payouts via **ACH or Crypto** depending on the affiliate's preference.
   
4. **Updating Payout Status**:
   - Once payouts are successfully processed, the system updates the **commission status** to `paid`.
   - If a payout fails, it is flagged for **manual review**.


