import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ProductImage from '../components/ProductImage'
import Button from '../components/Button'
import { Field, TextInput, TextArea, SelectInput } from '../components/form'
import { api } from '../lib/api'

const CATALOG_ITEMS = [
  { name: 'Custom Tote Bags', icon: '👜', palette: 'pink' as const, from: 4.5, minOrder: 25 },
  { name: 'Enamel Pins', icon: '📌', palette: 'yellow' as const, from: 1.75, minOrder: 50 },
  { name: 'Water Bottles', icon: '🧴', palette: 'sky' as const, from: 6.0, minOrder: 25 },
  { name: 'Sticker Sheets', icon: '✨', palette: 'mint' as const, from: 1.25, minOrder: 100 },
  { name: 'Notebooks', icon: '📓', palette: 'pink' as const, from: 3.0, minOrder: 25 },
  { name: 'Ceramic Mugs', icon: '☕', palette: 'yellow' as const, from: 5.5, minOrder: 25 },
]

export default function BrandingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const form = new FormData(event.currentTarget)
      await api('/api/quote-requests', { method: 'POST', body: JSON.stringify(Object.fromEntries(form.entries())) })
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageBanner
        tone="sky"
        eyebrow="For teams & schools"
        title="Promotional products for your organization"
        description="Order custom-branded merch in bulk and support young entrepreneurs at the same time. Browse the catalog below, then tell us what you need — we'll follow up with pricing and samples."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-900">
            Catalog highlights
          </h2>
          <p className="mt-2 text-ink-600">
            A few crowd favorites — every item can be customized with your logo or design.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOG_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-900/5"
            >
              <div className="w-20 flex-shrink-0">
                <ProductImage palette={item.palette} icon={item.icon} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{item.name}</h3>
                <p className="mt-1 text-sm text-ink-600">From ${item.from.toFixed(2)} each</p>
                <p className="text-xs text-ink-400">Minimum order: {item.minOrder} units</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-900">
              Request a quote
            </h2>
            <p className="mt-2 text-ink-600">
              Fill out the form and our team will reach out within two business days.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-mint-100 px-6 py-12 text-center">
              <CheckCircle2 className="h-10 w-10 text-ink-900" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold text-ink-900">
                Thanks — request received!
              </h3>
              <p className="max-w-sm text-sm text-ink-600">
                We've got your details. A member of the Koya team will follow up by email soon
                with pricing and next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" required>
                <TextInput type="text" name="name" placeholder="Jordan Lee" required />
              </Field>
              <Field label="Email" required>
                <TextInput type="email" name="email" placeholder="you@company.com" required />
              </Field>
              <Field label="Organization or school" required>
                <TextInput type="text" name="organization" placeholder="Acme Corp" required />
              </Field>
              <Field label="Phone" hint="Optional">
                <TextInput type="tel" name="phone" placeholder="(555) 123-4567" />
              </Field>
              <Field label="Product of interest" required>
                <SelectInput name="product" required defaultValue="">
                  <option value="" disabled>
                    Choose a product
                  </option>
                  {CATALOG_ITEMS.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </SelectInput>
              </Field>
              <Field label="Estimated quantity" required>
                <TextInput type="number" name="quantity" min={1} placeholder="50" required />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell us more" hint="Timeline, branding details, anything helpful">
                  <TextArea
                    name="message"
                    placeholder="We'd like 100 tote bags with our logo for a fall event..."
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
                <Button type="submit" variant="primary" className="w-full justify-center" disabled={saving}>
                  {saving ? 'Sending…' : 'Submit request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
