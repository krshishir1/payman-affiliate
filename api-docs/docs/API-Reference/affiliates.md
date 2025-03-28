---
title: "Affiliates API"
description: "Endpoints for managing affiliates and retrieving affiliate data."
slug: "/api/affiliates"
sidebar_label: "affiliates"
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Affiliates API

The **Affiliates API** allows merchants to register new affiliates and retrieve affiliates linked to an affiliate program. All requests require an API key in the `Authorization` header.

> **Base URL:** `https://api.affiliatesoftware.com/v1`

## 1. Register New Affiliate

Register a new affiliate under a specific program.

### **Endpoint**

```http
POST /affiliates/new
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| Authorization | `Bearer YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "program_id": "abc123-uuid",
  "new_affiliate": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "payment_details": {
      "account_number": "12345678",
      "routing_number": "87654321"
    },
    "payout_method": "ACH"
  }
}
```

### **Response**

```json
{
  "message": "Affiliate added successfully",
  "affiliate": {
    "id": "aff123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "program_id": "abc123-uuid",
    "payout_method": "ACH",
    "payee_id": "payee789"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X POST "https://api.affiliatesoftware.com/v1/affiliates/new" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"program_id": "abc123-uuid", "new_affiliate": {"name": "Jane Doe", "email": "jane@example.com", "payment_details": {"account_number": "12345678", "routing_number": "87654321"}, "payout_method": "ACH"}}'
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("https://api.affiliatesoftware.com/v1/affiliates/new", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      program_id: "abc123-uuid",
      new_affiliate: {
        name: "Jane Doe",
        email: "jane@example.com",
        payment_details: {
          account_number: "12345678",
          routing_number: "87654321"
        },
        payout_method: "ACH"
      }
    })
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

---

## 2. Get All Affiliates by Program ID

Retrieve all affiliates linked to a specific program.

### **Endpoint**

```http
GET /affiliates?program_id={program_id}
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| Authorization | `Bearer YOUR_API_KEY` | ✅        |

### **Query Parameters**

| Parameter   | Type   | Description                   | Required |
|------------|--------|-------------------------------|----------|
| program_id | string | The UUID of the affiliate program | ✅        |

### **Response**

```json
{
  "affiliates": [
    {
      "id": "aff123",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "program_id": "abc123-uuid",
      "payout_method": "ACH"
    },
    {
      "id": "aff456",
      "name": "John Smith",
      "email": "john@example.com",
      "program_id": "abc123-uuid",
      "payout_method": "CRYPTO"
    }
  ]
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X GET "https://api.affiliatesoftware.com/v1/affiliates?program_id=abc123-uuid" \
       -H "Authorization: Bearer YOUR_API_KEY"
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("https://api.affiliatesoftware.com/v1/affiliates?program_id=abc123-uuid", {
    method: "GET",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
  ```
  </TabItem>
</Tabs>

---

📌 **Next Steps**
- Learn how to **[authenticate API requests](./authentication)**.
- Explore other endpoints in the **[API Reference](./api-reference)**.
- Start integrating your affiliate program automation today!
