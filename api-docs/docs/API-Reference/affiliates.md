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

The **Affiliates API** allows merchants to register new affiliates and retrieve affiliates linked to an affiliate program. All requests require an API key in the `x-api-key` header.

> **Base URL:** `http://ec2-44-212-56-8.compute-1.amazonaws.com:4000/api`

## 1. Register New Affiliate

Register a new affiliate under a specific program. The new affiliate must provide payment details, that will be used for payouts. The affiliate will be registed as a payee in the Payman platform.

### **Endpoint**

```http
POST /affiliates/new
```

### **Headers**

| Key          | Value              | Required |
| ------------ | ------------------ | -------- |
| x-api-key    | `YOUR_API_KEY`     | ✅       |
| Content-Type | `application/json` | ✅       |

### **Request Body**

```json
{
  "program_id": "program-uuid",
  "new_affiliate": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "payment_details": {
      "accountHolderName": "John Doe",
      "accountHolderType": "individual",
      "accountNumber": "1234567890",
      "routingNumber": "011000138",
      "accountType": "checking",
      "contactDetails": {
        "email": "john@example.com"
      }
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
    "id": "affiliate-uuid",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "program_id": "program-uuid",
    "payout_method": "ACH",
    "payee_id": "payman-payee-id"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X POST "{BASE_URL}/affiliates/new" \
       -H "x-api-key: YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"program_id": "program-uuid", "new_affiliate": {"name": "Jane Doe", "email": "jane@example.com", "payment_details": {"account_number": "12345678", "routing_number": "87654321"}, "payout_method": "ACH"}}'
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("{BASE_URL}/affiliates/new", {
    method: "POST",
    headers: {
      "x-api-key": "YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      program_id: "abc123-uuid",
      new_affiliate: {
        name: "Jane Doe",
        email: "jane@example.com",
        payment_details: {
      accountHolderName: "Jane Doe",
      accountHolderType: "individual",
      accountNumber: "1234567890",
      routingNumber: "011000138",
      accountType: "checking",
      contactDetails: {
        "email": "john@example.com"
      }
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

| Key       | Value          | Required |
| --------- | -------------- | -------- |
| x-api-key | `YOUR_API_KEY` | ✅       |

### **Query Parameters**

| Parameter  | Type   | Description                       | Required |
| ---------- | ------ | --------------------------------- | -------- |
| program_id | string | The UUID of the affiliate program | ✅       |

### **Response**

```json
{
  "affiliates": [
    {
      "id": "affiliate-uuid-1",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "program_id": "program-uuid",
      "payout_method": "ACH"
    },
    {
      "id": "affiliate-uuid-2",
      "name": "John Smith",
      "email": "john@example.com",
      "program_id": "program-uuid",
      "payout_method": "CRYPTO"
    }
  ]
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X GET "{BASE_URL}/affiliates?program_id=program-uuid" \
       -H "x-api-key: YOUR_API_KEY"
  ```
  </TabItem>

  <TabItem value="javascript" label="JavaScript (fetch)">
  
  ```js
  fetch("{BASE_URL}/affiliates?program_id=program-uuid", {
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

