import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MarketingPage from '../app/dashboard/marketing/page'

vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <div>{children}</div>,
  CardDescription: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children }: any) => <button>{children}</button>,
}))

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(() => Promise.resolve({ user: { name: 'Test User' } })),
}))

describe('Marketing Page', () => {
  it('renders the marketing dashboard correctly', async () => {
    const page = await MarketingPage()
    render(page)
    expect(screen.getByText('Marketing & Analytics')).toBeInTheDocument()
  })
})
