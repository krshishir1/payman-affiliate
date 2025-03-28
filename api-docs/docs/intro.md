---
title: "Introduction"
description: "Learn how to integrate with the Affiliate Payout API for automating affiliate commission payments."
slug: "/introduction"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Affiliate Payout API

The **Affiliate Payout API** enables merchants to automate affiliate commission payouts seamlessly. This API allows you to:

- **Manage Merchants**: Create and view affiliate programs.
- **Register Affiliates**: Add affiliates as payees and retrieve affiliate lists.
- **Handle Commissions**: Register, update, and retrieve commission details.

## Quickstart

To start using the API, follow these steps:

### 1. Generate Your API Key
Before making any requests, generate an API key by registering as a new merchant. This key is required for all API calls.

> **Note:** Each request must include the API key in the `x-api-key` header as `YOUR_API_KEY`.

### 2. Base URL
All API requests are made to:

```
http://ec2-44-212-56-8.compute-1.amazonaws.com:4000/api
```

### 3. Example Request

Here's a basic example of retrieving all affiliate programs:

<Tabs>
  <TabItem value="curl" label="cURL">

  ```sh
  curl -X GET "{BASE_URL}/merchants/program/list" \
       -H "x-api-key: YOUR_API_KEY"
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">

  ```js
  fetch("{BASE_URL}/merchants/program/list", {
    method: "GET",
    headers: {
      "x-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

## API Overview

### 1. Merchants
Merchants can create and manage affiliate programs.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/merchants/program/list` | `GET` | Retrieve all affiliate programs |
| `/merchants/program/new` | `POST` | Create a new affiliate program |
| `/merchants/details` | `GET` | Retrieve merchant details |

### 2. Affiliates
Manage affiliates and link them to programs.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/affiliates/new` | `POST` | Register a new affiliate as a payee |
| `/affiliates` | `GET` | Get all affiliates in a program |

### 3. Commissions
Track and update commission payouts.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/commissions/new` | `POST` | Register a new commission |
| `/commissions` | `PATCH` | Update commission status |
| `/commissions` | `GET` | Retrieve all commissions of an affiliate |


---

