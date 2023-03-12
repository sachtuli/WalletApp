# Digital Wallet Application
This is a back-end REST API code that applies the functionality to create digital wallets and doing Transactions.
- This is a full featured Digital Wallet REST API back-end built with Javascript,Node.js,MongoDB and Mongoose.
- Application endpoint : localhost:3000

 ## Features include:

- Authentication with JWT tokens.  
- Access to CRUD operations based on JWT tokens.
- Ability to do a debit/credit transaction.
- Fetch the Wallet details for a particular walletId.
- Fetch the Transaction details for a particular walletId.

### SETUP INSTRUCTIONS

- Node.js and npm (Latest version) must be installed on your machine.
- To run the Local MongoDB server follow link: https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/
- Run npm install to install all dependencies.

## Run the app
```
npm run dev
```

## Run the tests

```
npm run test
```

# REST API

These endpoints allow for various operations that can be performed to create Digital Wallet and do Transactions.

## Create a new Wallet 

### Request: `POST /wallet`

<br>

> **Note: This request will create authToken cookie in Headers. So, this cookie can be used as Bearer Token for other requests related   to this WalletId.** 

<br> 

 ```json
{
    "name": "PhonePe",
    "balance": 1000.00
}
```

### Response

```json
{
    "message": "Wallet has been created",
    "data": {
        "walletId": "0GqI9LbW",
        "name": "PhonePe",
        "balance": 1000,
        "createdAt": "2023-01-21T16:06:06.033Z"
    }
}
```

## Get Wallet Details Based on WalletId

### Request :  `GET /wallet/:walletId` 
<br>

> **Note: authToken Required in Header** 

<br>

### Response : 

```json
{
    "message": "The wallet was fetched successfully",
    "data": {
        "walletId": "0GqI9LbW",
        "name": "PhonePe",
        "balance": 1000,
        "createdAt": "2023-01-21T16:06:06.033Z"
    }
}
```
## To Create a Transction Entry for a WalletId

### Request: `POST /wallet/:walletId/transactions`
 
 <br>

> **Note: authToken Required in Header** 

<br>

 ```json
{
    "amount": 5000,
    "reason": "Salary"
}
 ```

### Response

```json
{
    "message": "Transaction has been created",
    "data": {
        "amount": 5000,
        "walletId": "0GqI9LbW",
        "id": "ca4f64a6-02c9-4831-b2bd-a1eff36dbf79",
        "balance": 6000,
        "createdAt": "2023-01-21T16:09:29.103Z"
    }
}
```
## To Get all Transactions for a  Wallet

### Request: `GET /wallet/:walletId/transactions`

<br>

> **Note: authToken Required in Header** 

<br>

### Response

```json
{
    "message": "The transactions have been successfully fetched for the wallet.",
    "data": [
        {
            "amount": 5000,
            "walletId": "0GqI9LbW",
            "id": "ca4f64a6-02c9-4831-b2bd-a1eff36dbf79",
            "balance": 6000,
            "createdAt": "2023-01-21T16:09:29.103Z"
        },
        {
            "amount": -500,
            "walletId": "0GqI9LbW",
            "id": "5d46ad69-cf95-4a83-addc-8eefd79722a0",
            "balance": 5500,
            "createdAt": "2023-01-21T16:10:17.440Z"
        },
        {
            "amount": -1000,
            "walletId": "0GqI9LbW",
            "id": "55337971-d68b-492f-a0d4-70fa5fa10294",
            "balance": 4500,
            "createdAt": "2023-01-21T16:10:31.854Z"
        },
        {
            "amount": -800,
            "walletId": "0GqI9LbW",
            "id": "951dff6e-3d48-4a21-a344-0b1a7782a93f",
            "balance": 3700,
            "createdAt": "2023-01-21T16:10:47.305Z"
        }
    ]
}
```
