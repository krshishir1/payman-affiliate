---
title: "Generate API Key"
description: "How to generate an API key for the API."
slug: "/api/generate-api-key"
sidebar_position: 2
---

<!-- import GenerateApiKey from '../src/components/GenerateApiKey.tsx'; -->

# Generate API Key

To access the API, merchants must first register and generate an API key. Fill out the form below to receive your unique API key.

<!-- <GenerateApiKey /> -->

Alternatively, you can register a new merchant and generate an API key using the following endpoint:

## Endpoint
**`POST /merchants/new`**  
Registers a new merchant and generates an API key.

## Request Body

| Field           | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `name`         | string  | ✅ Yes    | Merchant's name (3-50 chars) |
| `email`        | string  | ✅ Yes    | Merchant's email (valid format) |
| `company_name` | string  | ✅ Yes    | Merchant's company name (3-50 chars) |

### **Example Request**
```http
POST /merchants/new
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company_name": "Acme Inc."
}

### **Response**

```json
{
  "message": "Merchant registered successfully",
  "apiKey": "your-generated-api-key"
}
```