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

The **Commissions API** allows merchants to register new commissions, update commission status, and retrieve commissions based on an affiliate ID. All requests require an API key in the `x-api-key` header.

> **Base URL:** `http://ec2-44-212-56-8.compute-1.amazonaws.com:4000/api`

## 1. Register New Commission

Register a new commission for an affiliate in a specific program.

### **Endpoint**

```http
POST /commissions/new
```

### **Headers**

| Key            | Value                 | Required |
|---------------|----------------------|----------|
| x-api-key | `YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "affiliate_id": "affiliate-uuid",
  "program_id": "program-uuid",
  "amount": 100.50,
  "status": "pending"
}
```

### **Response**

```json
{
  "commission": {
    "id": "commission-uuid",
    "affiliate_id": "affiliate-uuid",
    "program_id": "program-uuid",
    "amount": 100.50,
    "status": "pending"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X POST "{BASE_URL}/commissions/new" \
       -H "x-api-key: YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"affiliate_id": "affiliate-uuid", "program_id": "program-uuid", "amount": 100.50, "status": "pending"}'
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
| x-api-key | `YOUR_API_KEY` | ✅        |
| Content-Type  | `application/json`    | ✅        |

### **Request Body**

```json
{
  "commissionId": "commission-uuid",
  "status": "approved"
}
```

### **Response**

```json
{
  "commission": {
    "id": "commission-uuid",
    "status": "approved"
  }
}
```

### **Example Request**

<Tabs>
  <TabItem value="curl" label="cURL">
  
  ```sh
  curl -X PATCH "{BASE_URL}/commissions" \
       -H "x-api-key: YOUR_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"commissionId": "commission-uuid", "status": "approved"}'
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
| x-api-key | `YOUR_API_KEY` | ✅        |

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
      "id": "commission-uuid-1",
      "affiliate_id": "affiliate-uuid",
      "program_id": "program-uuid",
      "amount": 100.50,
      "status": "approved"
    },
    {
      "id": "commission-uuid-2",
      "affiliate_id": "affiliate-uuid",
      "program_id": "program-uuid",
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
  curl -X GET "{BASE_URL}/commissions?affiliate_id=aff123-uuid&program_id=prog456-uuid" \
       -H "x-api-key: YOUR_API_KEY"
  ```
  </TabItem>
</Tabs>

---
