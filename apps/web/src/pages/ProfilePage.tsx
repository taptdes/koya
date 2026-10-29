import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Package, Heart, Settings as SettingsIcon } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ProductImage from '../components/ProductImage'
import Button from '../components/Button'
import { Field, TextInput, SelectInput } from '../components/form'
import { PRODUCTS } from '../data/products'
import { api } from '../lib/api'

const MOCK_ORDERS = [
  { id: 'KOYA-1042', product: PRODUCTS[0], status: 'Delivered', date: 'Jun 12, 2026' },
  { id: 'KOYA-1039', product: PRODUCTS[2], status: 'Shipped', date: 'Jun 3, 2026' },
  { id: 'KOYA-1021', product: PRODUCTS[5], status: 'Delivered', date: 'May 20, 2026' },
]

const SAVED_ITEMS = [PRODUCTS[1], PRODUCTS[3], PRODUCTS[6]]

type Tab = 'orders' | 'saved' | 'settings'

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'orders', label: 'My orders', icon: Package },
  { id: 'saved', label: 'Saved items', icon: Heart },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('orders')
  const [profile, setProfile] = useState({ name: 'Sara Tapusoa', email: 'sara.tapusoa@domo.com' })
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [savedItems, setSavedItems] = useState(SAVED_ITEMS)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [role, setRole] = useState<'org-admin' | 'customer' | 'guardian-admin' | 'entrepreneur'>('customer')

  useEffect(() => {
    api<{ profile: typeof profile; role: typeof role; orders: typeof MOCK_ORDERS; saved: typeof SAVED_ITEMS }>('/api/profile')
      .then((data) => {
        setProfile(data.profile)
        setRole(data.role)
        setOrders(data.orders.map((order) => ({ ...order, product: PRODUCTS.find((product) => product.id === order.product.id) || order.product })))
        setSavedItems(data.saved.map((item) => PRODUCTS.find((product) => product.id === item.id) || item))
      })
      .catch((err) => setError(err.message))
  }, [])

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await api<{ profile: typeof profile & { role: typeof role } }>('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())),
      })
      setProfile(data.profile)
      setRole(data.profile.role)
      setSaved(true)
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save changes.') }
  }

  return (
    <div>
      <PageBanner tone="yellow" eyebrow="Your account" title={`${profile.name.split(' ')[0]}'s Profile`} />

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="-mt-8 mb-10 flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 font-display text-2xl font-semibold text-ink-900 ring-4 ring-cream">
              S
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-900">{profile.name}</h2>
              <p className="text-sm text-ink-600">Member since 2026</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(role === 'org-admin' || role === 'entrepreneur') && <Link to="/profile?view=buyer" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-600 ring-1 ring-ink-900/10">View as buyer</Link>}
            {role === 'org-admin' && <Link to="/admin" className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream">Review applications</Link>}
          </div>
        </div>

        {(role === 'org-admin' || role === 'entrepreneur') && <div className="mb-8 rounded-2xl bg-mint-100 p-6"><p className="text-xs font-semibold uppercase tracking-wide text-mint-300">Seller workspace</p><div className="mt-4 grid gap-3 sm:grid-cols-4"><div><p className="font-display text-xl font-semibold text-ink-900">0</p><p className="text-xs text-ink-600">Active products</p></div><div><p className="font-display text-xl font-semibold text-ink-900">$0</p><p className="text-xs text-ink-600">Sales this month</p></div><div><p className="font-display text-xl font-semibold text-ink-900">$0</p><p className="text-xs text-ink-600">Available payout</p></div><div><Link to="/shop" className="text-sm font-semibold text-ink-900 underline underline-offset-4">Edit products →</Link><p className="text-xs text-ink-600">Stripe payouts connect here</p></div></div></div>}
        {role === 'guardian-admin' && <div className="mb-8 rounded-2xl bg-yellow-100 p-6"><p className="text-xs font-semibold uppercase tracking-wide text-lemon-500">Guardian workspace</p><p className="mt-2 max-w-xl text-sm text-ink-600">Review the young entrepreneurs connected to your account, approve applications, and keep an eye on their shop activity.</p><Link to="/profile?view=guardian" className="mt-4 inline-block text-sm font-semibold text-ink-900 underline underline-offset-4">Open guardian tools →</Link></div>}

        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:justify-start">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                tab === id
                  ? 'bg-ink-900 text-cream'
                  : 'bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-ink-900/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
        {tab === 'orders' && (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-900/5"
              >
                <div className="w-16 flex-shrink-0">
                  <ProductImage palette={order.product.palette} icon={order.product.icon} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">{order.product.title}</p>
                  <p className="text-xs text-ink-400">
                    Order {order.id} &middot; {order.date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === 'Delivered'
                      ? 'bg-mint-100 text-ink-900'
                      : 'bg-sky-100 text-ink-900'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {savedItems.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-ink-900/5"
              >
                <ProductImage palette={product.palette} icon={product.icon} />
                <p className="mt-3 px-1 text-sm font-semibold text-ink-900">{product.title}</p>
                <p className="px-1 text-sm text-ink-600">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'settings' && (
          <form onSubmit={saveSettings} className="grid grid-cols-1 gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5 sm:grid-cols-2">
            <Field label="Full name">
              <TextInput type="text" name="name" defaultValue={profile.name} />
            </Field>
            <Field label="Email">
              <TextInput type="email" name="email" defaultValue={profile.email} />
            </Field>
            <Field label="Account role" hint="Role changes will be managed by Koya in production">
              <SelectInput name="role" defaultValue={role}>
                <option value="customer">Customer</option>
                <option value="entrepreneur">Young entrepreneur / seller</option>
                <option value="guardian-admin">Parent / guardian admin</option>
                <option value="org-admin">Koya organization admin</option>
              </SelectInput>
            </Field>
            <Field label="New password" hint="Leave blank to keep your current password">
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <Field label="Confirm password">
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                {saved ? 'Saved!' : 'Save changes'}
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
