import { useMemo, useRef, useState } from 'preact/hooks'
import { useVirtualizer } from '@tanstack/react-virtual'
import './app.css'

type Status = 'queued' | 'rendering' | 'synced' | 'retrying'

type LogRow = {
  id: number
  title: string
  owner: string
  status: Status
  bytes: string
  latency: number
}

const statusLabels: Record<Status, string> = {
  queued: 'Queued',
  rendering: 'Rendering',
  synced: 'Synced',
  retrying: 'Retrying',
}

const statusOrder: Status[] = ['queued', 'rendering', 'synced', 'retrying']

const owners = ['Design', 'Billing', 'Search', 'Infra', 'Growth', 'Support']

const rows: LogRow[] = Array.from({ length: 10000 }, (_, index) => {
  const status = statusOrder[index % statusOrder.length]
  const bytes = ((index * 37) % 980) + 20

  return {
    id: index + 1,
    title: `Job ${String(index + 1).padStart(5, '0')}`,
    owner: owners[index % owners.length],
    status,
    bytes: `${bytes} KB`,
    latency: 18 + ((index * 13) % 240),
  }
})

export function App() {
  const parentRef = useRef<HTMLDivElement>(null)
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')

  const visibleRows = useMemo(() => {
    if (statusFilter === 'all') {
      return rows
    }

    return rows.filter((row) => row.status === statusFilter)
  }, [statusFilter])

  const rowVirtualizer = useVirtualizer({
    count: visibleRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 8,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <main class="shell">
      <section class="toolbar" aria-label="Virtual list controls">
        <div>
          <p class="eyebrow">Preact + TanStack React Virtual</p>
          <h1>10,000 row virtual list</h1>
        </div>

        <div class="stats" aria-label="Render stats">
          <span>{visibleRows.length.toLocaleString()} total</span>
          <span>{virtualItems.length} mounted</span>
        </div>
      </section>

      <div class="filters" aria-label="Status filter">
        <button
          type="button"
          class={statusFilter === 'all' ? 'active' : ''}
          onClick={() => setStatusFilter('all')}
        >
          All
        </button>
        {statusOrder.map((status) => (
          <button
            type="button"
            class={statusFilter === status ? 'active' : ''}
            onClick={() => setStatusFilter(status)}
            key={status}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      <section class="table" aria-label="Virtualized jobs">
        <div class="table-header">
          <span>Job</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Payload</span>
          <span>Latency</span>
        </div>

        <div class="viewport" ref={parentRef}>
          <div
            class="spacer"
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {virtualItems.map((virtualItem) => {
              const row = visibleRows[virtualItem.index]

              return (
                <article
                  class="row"
                  key={row.id}
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <span class="primary">
                    {row.title}
                    <small>#{row.id}</small>
                  </span>
                  <span>{row.owner}</span>
                  <span class={`status ${row.status}`}>
                    {statusLabels[row.status]}
                  </span>
                  <span>{row.bytes}</span>
                  <span>{row.latency} ms</span>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
