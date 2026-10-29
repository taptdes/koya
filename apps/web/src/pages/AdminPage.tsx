import { useEffect, useState } from 'react'
import { Check, Clock3, Eye, X } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import Button from '../components/Button'
import { api } from '../lib/api'

type Application = {
  id: string
  name: string
  adultName: string
  adultEmail: string
  applicantType: 'young-entrepreneur' | 'adult-seller'
  age: number | null
  category: string
  shopName?: string
  idea: string
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selected, setSelected] = useState<Application | null>(null)
  const [error, setError] = useState('')

  const loadApplications = () => api<{ applications: Application[] }>('/api/admin/applications').then((data) => setApplications(data.applications)).catch((err) => setError(err.message))
  useEffect(() => { loadApplications() }, [])

  const review = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api(`/api/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      setApplications((items) => items.map((item) => item.id === id ? { ...item, status } : item))
      setSelected(null)
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to update application.') }
  }

  return (
    <div>
      <PageBanner tone="mint" eyebrow="Koya operations" title="Application review" description="Review seller and young entrepreneur applications before their stands go live." />
      <section className="mx-auto max-w-6xl px-6 py-14">
        {error && <p className="mb-5 rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-300">{error}</p>}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/5"><p className="text-sm text-ink-600">Needs review</p><p className="mt-2 font-display text-3xl font-semibold text-ink-900">{applications.filter((item) => item.status === 'pending-review').length}</p></div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/5"><p className="text-sm text-ink-600">Approved</p><p className="mt-2 font-display text-3xl font-semibold text-ink-900">{applications.filter((item) => item.status === 'approved').length}</p></div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/5"><p className="text-sm text-ink-600">Total applications</p><p className="mt-2 font-display text-3xl font-semibold text-ink-900">{applications.length}</p></div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/5">
          {applications.length === 0 ? <div className="p-10 text-center text-sm text-ink-600">No applications yet. New Join Koya submissions will appear here.</div> : applications.map((application) => (
            <div key={application.id} className="flex flex-col gap-4 border-b border-ink-900/10 p-5 last:border-b-0 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-100 font-display font-semibold text-ink-900">{application.name[0]}</div>
              <div className="min-w-0 flex-1"><p className="font-semibold text-ink-900">{application.name}{application.age ? `, ${application.age}` : ''}</p><p className="text-sm text-ink-600">{application.applicantType === 'adult-seller' ? 'Adult seller' : 'Young entrepreneur'} · {application.category}</p></div>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${application.status === 'pending-review' ? 'bg-yellow-100 text-ink-900' : application.status === 'approved' ? 'bg-mint-100 text-ink-900' : 'bg-pink-50 text-ink-600'}`}><Clock3 className="h-3.5 w-3.5" />{application.status.replace('-', ' ')}</span>
              <Button variant="outline" onClick={() => setSelected(application)}><Eye className="h-4 w-4" />View</Button>
            </div>
          ))}
        </div>
      </section>
      {selected && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/30 p-6" onClick={() => setSelected(null)}><div className="w-full max-w-lg rounded-2xl bg-cream p-6 shadow-xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-mint-300">Application {selected.id}</p><h2 className="mt-2 font-display text-2xl font-semibold text-ink-900">{selected.name}'s stand</h2></div><button type="button" onClick={() => setSelected(null)} className="rounded-full p-2 text-ink-600 hover:bg-ink-900/5"><X className="h-5 w-5" /></button></div><dl className="mt-6 grid gap-3 text-sm"><div><dt className="font-semibold text-ink-900">Adult contact</dt><dd className="text-ink-600">{selected.adultName} · {selected.adultEmail}</dd></div><div><dt className="font-semibold text-ink-900">Idea</dt><dd className="text-ink-600">{selected.idea}</dd></div><div><dt className="font-semibold text-ink-900">Shop name</dt><dd className="text-ink-600">{selected.shopName || 'Not chosen yet'}</dd></div></dl>{selected.status === 'pending-review' && <div className="mt-7 flex gap-3"><Button variant="primary" onClick={() => review(selected.id, 'approved')}><Check className="h-4 w-4" />Approve</Button><Button variant="outline" onClick={() => review(selected.id, 'rejected')}>Reject</Button></div>}</div></div>}
    </div>
  )
}
