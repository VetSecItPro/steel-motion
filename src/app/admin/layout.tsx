'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Users, Lock, LogOut, Menu, X, LayoutDashboard, Kanban, UserPlus } from 'lucide-react';

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sm-surface-primary">
      <div className="w-full max-w-sm">
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-8 shadow-[var(--sm-shadow-lg)]">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-sm-accent-primary-light flex items-center justify-center">
              <Lock className="w-6 h-6 text-sm-accent-primary" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-sm-text-primary text-center mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-sm-text-secondary text-center mb-6">
            Enter your password to continue
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              autoComplete="current-password"
              autoFocus
            />
            {error && (
              <p className="text-sm text-sm-status-error" role="alert">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
            >
              {loading ? 'Checking...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/admin/leads', label: 'Leads', icon: UserPlus },
  { href: '/admin/invoices', label: 'Invoices', icon: FileText },
  { href: '/admin/clients', label: 'Clients', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/clients', { credentials: 'include' });
      setAuthenticated(res.status !== 401);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sm-surface-primary">
        <div className="animate-pulse text-sm-text-secondary">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-sm-surface-primary">
      {/* Mobile header */}
      <div className="lg:hidden bg-sm-surface-elevated border-b border-sm-border-default px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-sm-text-primary">Steel Motion Admin</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-sm-text-secondary hover:text-sm-text-primary"
          aria-label="Toggle admin menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)} onKeyDown={(e) => { if (e.key === 'Escape') setMobileMenuOpen(false); }} role="presentation">
          <div className="w-64 h-full bg-sm-surface-elevated border-r border-sm-border-default p-4" onClick={e => e.stopPropagation()} role="dialog" aria-label="Admin navigation menu">
            <MobileNav pathname={pathname} onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sm-surface-elevated border-r border-sm-border-default">
          <div className="p-6 border-b border-sm-border-default">
            <Link href="/admin" className="block">
              <h1 className="text-lg font-semibold text-sm-text-primary">Steel Motion</h1>
              <p className="text-xs text-sm-text-muted mt-0.5">Admin Portal</p>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sm-accent-primary-light text-sm-accent-primary'
                      : 'text-sm-text-secondary hover:text-sm-text-primary hover:bg-sm-surface-secondary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-sm-border-default">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sm-text-muted hover:text-sm-text-secondary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-sm-text-primary">Steel Motion</h1>
        <p className="text-xs text-sm-text-muted mt-0.5">Admin Portal</p>
      </div>
      <nav className="space-y-1">
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sm-accent-primary-light text-sm-accent-primary'
                  : 'text-sm-text-secondary hover:text-sm-text-primary hover:bg-sm-surface-secondary'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 pt-4 border-t border-sm-border-default">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sm-text-muted hover:text-sm-text-secondary transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Back to Site
        </Link>
      </div>
    </>
  );
}
