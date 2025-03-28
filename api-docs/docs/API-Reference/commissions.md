---
title: "Commissions API"
description: "Endpoints for registering, updating, and retrieving affiliate commissions."
slug: "/api/commissions"
sidebar_label: "commissions"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Commissions API

The **Commissions API** allows merchants to register new commissions, update commission status, and retrieve commissions based on an affiliate ID. All requests require an API key in the `Authorization` header.

> **Base URL:** `https://api.affiliatesoftware.com/v1`

## 1. Register New Commission

Register a new commission for an affiliate in a specific program.

### **Endpoint**

```http
POST /commissions/new
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| Authorization | `Bearer YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "affiliate_id": "aff123-uuid",
  "program_id": "prog456-uuid",
  "amount": 100.50,
  "status": "pending"
}
```

### **Response**

```json
{
  "commission": {
    "id": "comm789",
    "affiliate_id": "aff123-uuid",
    "program_id": "prog456-uuid",
    "amount": 100.50,
    "status": "pending"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X POST "https://api.affiliatesoftware.com/v1/commissions/new" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"affiliate_id": "aff123-uuid", "program_id": "prog456-uuid", "amount": 100.50, "status": "pending"}'
  ```
  </TabItem>
</Tabs>

---

## 2. Update Commission Status

Update the status of a commission by its ID.

### **Endpoint**

```http
PATCH /commissions
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| Authorization | `Bearer YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "commissionId": "comm789",
  "status": "approved"
}
```

### **Response**

```json
{
  "commission": {
    "id": "comm789",
    "status": "approved"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X PATCH "https://api.affiliatesoftware.com/v1/commissions" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"commissionId": "comm789", "status": "approved"}'
  ```
  </TabItem>
</Tabs>

---

## 3. Get Commissions by Affiliate ID

Retrieve all commissions linked to a specific affiliate and program.

### **Endpoint**

```http
GET /commissions?affiliate_id={affiliate_id}&program_id={program_id}
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| Authorization | `Bearer YOUR_API_KEY` | ✅        |

### **Query Parameters**

| Parameter     | Type   | Description                      | Required |
|--------------|--------|----------------------------------|----------|
| affiliate_id | string | The UUID of the affiliate       | ✅        |
| program_id   | string | The UUID of the affiliate program | ✅        |

### **Response**

```json
{
  "commissions": [
    {
      "id": "comm789",
      "affiliate_id": "aff123-uuid",
      "program_id": "prog456-uuid",
      "amount": 100.50,
      "status": "approved"
    },
    {
      "id": "comm790",
      "affiliate_id": "aff123-uuid",
      "program_id": "prog456-uuid",
      "amount": 75.25,
      "status": "pending"
    }
  ]
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X GET "https://api.affiliatesoftware.com/v1/commissions?affiliate_id=aff123-uuid&program_id=prog456-uuid" \
       -H "Authorization: Bearer YOUR_API_KEY"
  ```
  </TabItem>
</Tabs>

---

📌 **Next Steps**
- Learn how to **[authenticate API requests](./authentication)**.
- Explore other endpoints in the **[API Reference](./api-reference)**.
- Start integrating your commission tracking today!