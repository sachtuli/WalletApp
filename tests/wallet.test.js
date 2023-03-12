const request = require('supertest')
const app = require('../src/app')
const Wallet = require('../src/models/createWallet')
const jwt = require('jsonwebtoken')

const { walletOneId, walletOne, walletTwo, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

const invalidWallet = {
  _id: walletOneId,
  name: 'Gpay',
  balance: "balance in string",
  walletId: "abc",
  tokens: [{
    token: jwt.sign({ _id: walletOneId }, 'dummy')
  }]
}

test('Should create a new Wallet', async () => {
  const res = await request(app)
    .post('/wallet')
    .send({
      name: 'Savings Pot',
      balance: 1000
    })
    .expect(201)
  const wallet = await Wallet.findOne({ walletId: walletTwo.walletId })
  expect(wallet).not.toBeNull()
})

test('Should Not create a wallet', async () => {
  await request(app)
    .post('/wallet')
    .send({
      name: invalidWallet.name,
      balance: invalidWallet.balance
    })
    .expect(400)
})

test('Should fetch details for a wallet', async () => {
  const response = await request(app)
    .get(`/wallet/${walletOne.walletId}`)
    .set('Authorization', `Bearer ${walletOne.tokens[0].token}`)
    .send()
    .expect(200)
  expect(response.body.data.walletId).toBe('digi1')
  expect(response.body.data.balance).toBe(990)
})

test('Should throw error for invalid walletId', async () => {
  const response = await request(app)
    .get(`/wallet/${invalidWallet.walletId}`)
    .set('Authorization', `Bearer ${walletOne.tokens[0].token}`)
    .send()
    .expect(404)
    expect(response.text).toBe("\"Wallet not found\"")
})