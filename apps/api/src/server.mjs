import express from 'express'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../data')
const dataFile = path.join(dataDir, 'store.json')
const port = Number(process.env.PORT || 3001)
const host = process.env.HOST || '0.0.0.0'
const ROLES = ['org-admin', 'customer', 'guardian-admin', 'entrepreneur']

const products = [
  ['friendship-bracelets', 'Handmade Friendship Bracelets', 'Arts & Crafts', 'arts-crafts', 12.99, 'Emma'],
  ['rainbow-cookies', 'Rainbow Sprinkle Cookies', 'Baked Goods', 'baked-goods', 8.5, 'Noah'],
  ['ocean-necklace', 'Ocean Wave Beaded Necklace', 'Jewelry', 'jewelry', 15, 'Ava'],
  ['splatter-canvas', 'Splatter Art Canvas Print', 'Art & Paintings', 'art-paintings', 20, 'Leo'],
  ['polymer-earrings', 'Mini Polymer Clay Earrings', 'Jewelry', 'jewelry', 9, 'Maya'],
  ['choc-chip-blondies', 'Chocolate Chip Blondies', 'Baked Goods', 'baked-goods', 10, 'Jonah'],
  ['watercolor-cards', 'Watercolor Greeting Cards (Set of 5)', 'Art & Paintings', 'art-paintings', 14, 'Sofia'],
  ['macrame-keychain', 'Macrame Keychains', 'Arts & Crafts', 'arts-crafts', 6.5, 'Ruby'],
].map(([id, title, category, categorySlug, price, seller]) => ({ id, title, category, categorySlug, price, seller }))

const seed = {
  joinRequests: [],
  applications: [],
  quoteRequests: [],
  orders: [
    { id: 'KOYA-1042', productId: 'friendship-bracelets', status: 'Delivered', date: '2026-06-12' },
    { id: 'KOYA-1039', productId: 'ocean-necklace', status: 'Shipped', date: '2026-06-03' },
    { id: 'KOYA-1021', productId: 'choc-chip-blondies', status: 'Delivered', date: '2026-05-20' },
  ],
  favorites: ['rainbow-cookies', 'splatter-canvas', 'watercolor-cards'],
  profile: { name: 'Sara Tapusoa', email: 'sara.tapusoa@domo.com', role: 'org-admin' },
}

async function loadStore() {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'))
  } catch {
    await mkdir(dataDir, { recursive: true })
    await writeFile(dataFile, JSON.stringify(seed, null, 2))
    return structuredClone(seed)
  }
}

let store = await loadStore()
store.applications ||= store.joinRequests || []
store.profile.role ||= 'org-admin'
const saveStore = () => writeFile(dataFile, JSON.stringify(store, null, 2))
const byId = (id) => products.find((product) => product.id === id)
const required = (body, fields) => fields.filter((field) => !body[field] && body[field] !== 0)

const app = express()
app.use(express.json({ limit: '100kb' }))
app.use((req, res, next) => {
  const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5222').split(',').map((origin) => origin.trim())
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'koya-api' }))

app.get('/api/products', (req, res) => {
  const query = String(req.query.search || '').toLowerCase()
  const category = String(req.query.category || '')
  res.json(products.filter((product) => {
    const matchesCategory = !category || product.categorySlug === category
    const matchesQuery = !query || `${product.title} ${product.category} ${product.seller}`.toLowerCase().includes(query)
    return matchesCategory && matchesQuery
  }))
})

app.post('/api/join-requests', async (req, res) => {
  const missing = required(req.body, ['name', 'adultName', 'adultEmail', 'category', 'idea', 'humanCheck'])
  const age = Number(req.body.age)
  const applicantType = req.body.applicantType === 'adult-seller' ? 'adult-seller' : 'young-entrepreneur'
  if (applicantType === 'young-entrepreneur' && (!Number.isInteger(age) || age < 5 || age > 17)) {
    return res.status(400).json({ error: 'Young entrepreneurs must be between 5 and 17 years old.' })
  }
  if (missing.length || (applicantType === 'adult-seller' && !req.body.adultName)) {
    return res.status(400).json({ error: 'Please complete the required application fields and confirm you are human.' })
  }
  const request = {
    id: `JOIN-${Date.now()}`,
    ...req.body,
    applicantType,
    age: Number.isNaN(age) ? null : age,
    status: 'pending-review',
    createdAt: new Date().toISOString(),
  }
  if (store.applications !== store.joinRequests) store.joinRequests.push(request)
  store.applications.push(request)
  await saveStore()
  res.status(201).json({ id: request.id, status: request.status })
})

app.get('/api/admin/applications', (_req, res) => {
  if (store.profile.role !== 'org-admin') return res.status(403).json({ error: 'Org admin access required.' })
  res.json({ applications: store.applications })
})

app.patch('/api/admin/applications/:id', async (req, res) => {
  if (store.profile.role !== 'org-admin') return res.status(403).json({ error: 'Org admin access required.' })
  if (!['approved', 'rejected'].includes(req.body.status)) return res.status(400).json({ error: 'Status must be approved or rejected.' })
  const application = store.applications.find((item) => item.id === req.params.id)
  if (!application) return res.status(404).json({ error: 'Application not found.' })
  application.status = req.body.status
  application.reviewedAt = new Date().toISOString()
  await saveStore()
  res.json({ application })
})

app.post('/api/quote-requests', async (req, res) => {
  const missing = required(req.body, ['name', 'email', 'organization', 'product', 'quantity'])
  if (missing.length || Number(req.body.quantity) < 1) return res.status(400).json({ error: 'Please complete the required quote fields.' })
  const request = { id: `QUOTE-${Date.now()}`, ...req.body, quantity: Number(req.body.quantity), createdAt: new Date().toISOString() }
  store.quoteRequests.push(request)
  await saveStore()
  res.status(201).json({ id: request.id })
})

app.get('/api/profile', (_req, res) => {
  const orders = store.orders.map((order) => ({ ...order, product: byId(order.productId) })).filter((order) => order.product)
  const saved = store.favorites.map(byId).filter(Boolean)
  res.json({ profile: store.profile, role: store.profile.role, orders, saved, permissions: store.profile.role === 'org-admin' ? ['manage-applications', 'manage-products', 'manage-orders', 'manage-users'] : store.profile.role === 'entrepreneur' ? ['manage-products', 'view-sales', 'view-payouts'] : [] })
})

app.patch('/api/profile', async (req, res) => {
  const missing = required(req.body, ['name', 'email'])
  if (missing.length) return res.status(400).json({ error: 'Name and email are required.' })
  const role = ROLES.includes(req.body.role) ? req.body.role : store.profile.role
  store.profile = { ...store.profile, name: String(req.body.name), email: String(req.body.email), role }
  await saveStore()
  res.json({ profile: store.profile })
})

app.post('/api/orders', async (req, res) => {
  if (!Array.isArray(req.body.items) || req.body.items.length === 0) return res.status(400).json({ error: 'Your cart is empty.' })
  const lines = req.body.items.map((item) => ({ product: byId(item.productId), quantity: Number(item.quantity) }))
  if (lines.some((line) => !line.product || !Number.isInteger(line.quantity) || line.quantity < 1)) return res.status(400).json({ error: 'One or more cart items are invalid.' })
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const order = { id: `KOYA-${Math.floor(1000 + Math.random() * 9000)}`, status: 'Received', date: new Date().toISOString().slice(0, 10), items: lines.map(({ product, quantity }) => ({ productId: product.id, quantity })), total: Number(total.toFixed(2)) }
  store.orders.unshift(...lines.map(({ product }) => ({ id: order.id, productId: product.id, status: order.status, date: order.date })))
  await saveStore()
  res.status(201).json(order)
})

app.listen(port, host, () => console.log(`Koya API listening on ${host}:${port} (${process.env.APP_ENV || 'development'})`))
