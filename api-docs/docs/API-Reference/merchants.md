---
title: "Merchants"
description: "Endpoints for managing merchant details and affiliate programs."
slug: "/api/merchants"
sidebar_label: "merchants"
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Merchants API

The **Merchants API** allows you to manage merchant details and affiliate programs. All requests require an API key in the `x-api-key` header.

> **Base URL:** `http://ec2-44-212-56-8.compute-1.amazonaws.com:4000/api`

## 1. Get Merchant Details

Retrieve details of the authenticated merchant.

### **Endpoint**

```http
GET /merchants/details
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| x-api-key | `YOUR_API_KEY` | ✅        |

### **Response**

```json
{
  "merchant": {
    "id": "custom-merchant-id",
    "name": "John Doe",
    "email": "john@example.com",
    "company_name": "Doe Enterprises"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X GET "{BASE_URL}/merchants/details" \
       -H "x-api-key: YOUR_API_KEY"
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("{BASE_URL}/merchants/details", {
    method: "GET",
    headers: {
      "x-api-key": "YOUR_API_KEY"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

---

## 2. Add New Affiliate Program

Create a new affiliate program under the authenticated merchant.

### **Endpoint**

```http
POST /merchants/program/new
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| x-api-key | `YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "name": "Gold Affiliate Program",
  "structure": {
    "commission_type": "percentage",
    "payout_threshold": 50,
    "payout_frequency": "monthly",
    "commission_rate": 10
  }
}
```

### **Response**

```json
{
  "program": {
    "id": "456",
    "merchant_id": "123",
    "name": "Gold Affiliate Program",
    "structure": {
      "commission_type": "percentage",
      "payout_threshold": 50,
      "payout_frequency": "monthly",
      "commission_rate": 10
    }
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X POST "{BASE_URL}/merchants/program/new" \
       -H "x-api-key: YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"name": "Gold Affiliate Program", "structure": {"commission_type": "percentage", "payout_threshold": 50, "payout_frequency": "monthly", "commission_rate": 10}}'
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("{BASE_URL}/merchants/program/new", {
    method: "POST",
    headers: {
      "x-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Gold Affiliate Program",
      structure: {
        commission_type: "percentage",
        payout_threshold: 50,
        payout_frequency: "monthly",
        commission_rate: 10
      }
    })
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

---

## 3. List All Affiliate Programs

Retrieve all affiliate programs associated with the authenticated merchant.

### **Endpoint**

```http
GET /merchants/program/list
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| x-api-key | `YOUR_API_KEY` | ✅        |

### **Response**

```json
{
  "programs": [
    {
      "id": "456",
      "name": "Gold Affiliate Program",
      "structure": {
        "commission_type": "percentage",
        "payout_threshold": 50,
        "payout_frequency": "monthly",
        "commission_rate": 10
      }
    },
    {
      "id": "789",
      "name": "Silver Affiliate Program",
      "structure": {
        "commission_type": "flat",
        "payout_threshold": 100,
        "payout_frequency": "weekly",
        "commission_rate": 25
      }
    }
  ]
}
```

### **Example Request**

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
      "x-api-key": "YOUR_API_KEY"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

---
