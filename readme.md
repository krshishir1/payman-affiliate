# Affiliate Automated Payout API

## About the Project
The Affiliate Automated Payout API enables merchants and affiliate software companies to automate commission payouts. Acting as a middleman, this API allows seamless fund transfers to affiliates based on predefined payout schedules. The system supports various payout frequencies and ensures timely and accurate payments. 

Cron jobs are used to automatically process affiliate payments based on the configured payout schedule. This ensures commissions are disbursed without manual intervention, improving efficiency and reliability.

## Technologies Used
- **Node.js** - Backend server
- **Express.js** - API framework
- **PostgreSQL** - Database for storing merchants, affiliates, and commission data
- **Docusaurus** - Documentation framework
- **Cron Jobs** - Automates scheduled payouts

## API Endpoints

### Merchants
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/merchants/program/list` | GET | Retrieve all affiliate programs |
| `/merchants/program/new` | POST | Create a new affiliate program |
| `/merchants/details` | GET | Retrieve merchant details |

### Affiliates
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/affiliates/new` | POST | Register a new affiliate as a payee |
| `/affiliates` | GET | Get all affiliates in a program |

### Commissions
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/commissions/new` | POST | Register a new commission |
| `/commissions` | PATCH | Update commission status |
| `/commissions` | GET | Retrieve all commissions of an affiliate |

## Getting Started
To integrate with this API, generate an API key from the merchant dashboard and authenticate requests using a `x-api-key` header.

For detailed integration steps, refer to the full documentation.
