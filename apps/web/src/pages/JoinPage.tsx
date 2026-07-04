import { useState, type FormEvent } from 'react'
import { PartyPopper } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import Button from '../components/Button'
import { Field, TextInput, TextArea, SelectInput } from '../components/form'
import { CATEGORIES } from '../data/products'

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
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
              We've sent a confirmation to your parent or guardian's email. Once they approve,
              you'll be able to set up your shop and list your first product.
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

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Your name" required>
                <TextInput type="text" name="name" placeholder="Emma" required />
              </Field>
              <Field label="Your age" required>
                <TextInput type="number" name="age" min={5} max={17} placeholder="11" required />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Parent or guardian email" required hint="We'll send them a permission form">
                  <TextInput type="email" name="guardianEmail" placeholder="parent@example.com" required />
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
              <div className="sm:col-span-2">
                <Button type="submit" variant="primary" className="w-full justify-center">
                  Join Koya
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
