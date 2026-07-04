import { useState } from 'react'
import { Package, Heart, Settings as SettingsIcon } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ProductImage from '../components/ProductImage'
import Button from '../components/Button'
import { Field, TextInput } from '../components/form'
import { PRODUCTS } from '../data/products'

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

  return (
    <div>
      <PageBanner tone="yellow" eyebrow="Your account" title="Sara's Profile" />

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="-mt-8 mb-10 flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 font-display text-2xl font-semibold text-ink-900 ring-4 ring-cream">
              S
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-900">Sara Tapusoa</h2>
              <p className="text-sm text-ink-600">Member since 2026</p>
            </div>
          </div>
        </div>

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

        {tab === 'orders' && (
          <div className="flex flex-col gap-4">
            {MOCK_ORDERS.map((order) => (
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
            {SAVED_ITEMS.map((product) => (
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
          <form className="grid grid-cols-1 gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5 sm:grid-cols-2">
            <Field label="Full name">
              <TextInput type="text" defaultValue="Sara Tapusoa" />
            </Field>
            <Field label="Email">
              <TextInput type="email" defaultValue="sara.tapusoa@domo.com" />
            </Field>
            <Field label="New password" hint="Leave blank to keep your current password">
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <Field label="Confirm password">
              <TextInput type="password" placeholder="••••••••" />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary">
                Save changes
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
