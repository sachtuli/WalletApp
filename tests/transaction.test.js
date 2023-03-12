const request = require('supertest')
const app = require('../src/app')
const Transaction = require('../src/models/createWallet')
const jwt = require('jsonwebtoken')

const { transactionOne, setupDatabase, walletOne } = require('./fixtures/db')

beforeEach(setupDatabase)

const invalidTransactionReq = {
    _id: transactionOne._id,
    amount: "dummy",
    reason: 'invalid txn',
    tokens: [{
        token: jwt.sign({ _id: transactionOne._id }, 'dummy')
    }]
}

test('Should create a new Transaction', async () => {
    const res = await request(app)
        .post(`/wallet/${transactionOne.walletId}/transactions`)
        .set('Authorization', `Bearer ${walletOne.tokens[0].token}`)
        .send({
            amount: 100,
            reason: 'Bonus'
        })
        .expect(201)
    const transaction = await Transaction.findOne({ id: transactionOne.id })
    expect(transaction).not.toBeNull()
    expect(transaction.balance).toBe(1090)
    expect(transaction.name).toBe('paytm')
    expect(transaction.walletId).toBe('digi1')

})

test('Should Not create a Transaction', async () => {
    await request(app)
        .post(`/wallet/${transactionOne.walletId}/transactions`)
        .send({
            amount: invalidTransactionReq.amount,
            reason: invalidTransactionReq.reason
        })
        .expect(404)
})

test('Should fetch all transactions for a wallet', async () => {
    const response = await request(app)
        .get(`/wallet/${transactionOne.walletId}/transactions`)
        .set('Authorization', `Bearer ${walletOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.data.length).toEqual(3)
})

test('Should throw error for invalid walletId', async () => {
    const response = await request(app)
        .get(`/wallet/abc/transactions`)
        .set('Authorization', `Bearer ${walletOne.tokens[0].token}`)
        .send()
        .expect(404)
    expect(response.text).toBe("\"Wallet not found\"")
})