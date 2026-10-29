import { useState, type FormEvent } from 'react'
import { PartyPopper } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import Button from '../components/Button'
import { Field, TextInput, TextArea, SelectInput } from '../components/form'
import { CATEGORIES } from '../data/products'
import { api } from '../lib/api'

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false)
  const [applicantType, setApplicantType] = useState<'young-entrepreneur' | 'adult-seller'>('young-entrepreneur')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const form = new FormData(event.currentTarget)
      await api('/api/join-requests', { method: 'POST', body: JSON.stringify(Object.fromEntries(form.entries())) })
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
        tone="mint"
        eyebrow="Join the program"
        title="Start your own lemonade stand"
        description="Koya gives young entrepreneurs the tools to set up a shop, list their first products, and start selling — with support from a parent or guardian every step of the way."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-yellow-100 px-6 py-14 text-center">
            <PartyPopper className="h-10 w-10 text-ink-900" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-semibold text-ink-900">
              Welcome to Koya!
            </h3>
            <p className="max-w-sm text-sm text-ink-600">
              We've sent a confirmation to {applicantType === 'young-entrepreneur' ? 'your parent or guardian' : 'your email'}. The Koya team will review your application before your shop goes live.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-semibold text-ink-900">
                Tell us about you
              </h2>
              <p className="mt-2 text-ink-600">
                It only takes a minute. A parent or guardian will need to approve before your
                shop goes live.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-mint-100 p-1.5">
              <button type="button" onClick={() => setApplicantType('young-entrepreneur')} className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${applicantType === 'young-entrepreneur' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600'}`}>Young entrepreneur</button>
              <button type="button" onClick={() => setApplicantType('adult-seller')} className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${applicantType === 'adult-seller' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600'}`}>Adult seller</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input type="hidden" name="applicantType" value={applicantType} />
              <Field label="Your name" required>
                <TextInput type="text" name="name" placeholder="Emma" required />
              </Field>
              {applicantType === 'young-entrepreneur' ? (
                <Field label="Your age" required>
                  <TextInput type="number" name="age" min={5} max={17} placeholder="11" required />
                </Field>
              ) : <div />}
              <div className="sm:col-span-2">
                <Field label={applicantType === 'young-entrepreneur' ? 'Parent or guardian name' : 'Your full legal name'} required hint={applicantType === 'young-entrepreneur' ? 'An adult will review and approve your application' : 'This is used for account and payout verification'}>
                  <TextInput type="text" name="adultName" placeholder={applicantType === 'young-entrepreneur' ? 'Jordan Lee' : 'Jordan Lee'} required />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={applicantType === 'young-entrepreneur' ? 'Parent or guardian email' : 'Your email'} required hint={applicantType === 'young-entrepreneur' ? "We'll send them a permission form" : 'Used for account updates and payouts'}>
                  <TextInput type="email" name="adultEmail" placeholder="parent@example.com" required />
                </Field>
              </div>
              <Field label="What do you want to sell?" required>
                <SelectInput name="category" required defaultValue="">
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.label}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </SelectInput>
              </Field>
              <Field label="Shop name idea" hint="You can change this later">
                <TextInput type="text" name="shopName" placeholder="Emma's Craft Corner" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell us about your idea" required>
                  <TextArea
                    name="idea"
                    required
                    placeholder="I want to sell friendship bracelets I make with beads from..."
                  />
                </Field>
              </div>
              <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-ink-900/10 bg-white p-4 text-sm text-ink-600">
                <input type="checkbox" name="humanCheck" value="confirmed" required className="mt-0.5 h-4 w-4 accent-yellow-400" />
                <span><strong className="text-ink-900">I’m a real person</strong><br />Please confirm this application was completed by a person. Koya will add protected CAPTCHA verification before launch.</span>
              </label>
              <div className="sm:col-span-2">
                {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
                <Button type="submit" variant="primary" className="w-full justify-center" disabled={saving}>
                  {saving ? 'Sending…' : 'Join Koya'}
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
