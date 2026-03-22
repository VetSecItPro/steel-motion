'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Phone, Mail, Calendar, MessageSquare, FileText, RotateCw } from 'lucide-react';

type Deal = {
  id: string;
  title: string;
  stage: string;
  value: number;
  updated_at: string;
  lead: { id: string; name: string; company: string | null } | null;
};

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  lead: { id: string; name: string; company: string | null } | null;
};

type Lead = {
  id: string;
  name: string;
  company: string | null;
  status: string;
  estimated_value: number;
  created_at: string;
};

const stageLabels: Record<string, string> = {
  inquiry: 'Inquiry',
  contacted: 'Contacted',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

const stageColors: Record<string, string> = {
  inquiry: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  proposal: 'bg-purple-100 text-purple-700',
  negotiation: 'bg-orange-100 text-orange-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

const activityIcons: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
  proposal: FileText,
  'follow-up': RotateCw,
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dealsRes, activitiesRes, leadsRes] = await Promise.all([
          fetch('/api/deals', { credentials: 'include' }),
          fetch('/api/activities?limit=10', { credentials: 'include' }),
          fetch('/api/leads', { credentials: 'include' }),
        ]);

        if (dealsRes.ok) {
          const d = await dealsRes.json();
          setDeals(d.deals || []);
        }
        if (activitiesRes.ok) {
          const a = await activitiesRes.json();
          setActivities(a.activities || []);
        }
        if (leadsRes.ok) {
          const l = await leadsRes.json();
          setLeads(l.leads || []);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate stats
  const activeDeals = deals.filter(d => !['won', 'lost'].includes(d.stage));
  const wonDeals = deals.filter(d => d.stage === 'won');
  const pipelineValue = activeDeals.reduce((sum, d) => sum + d.value, 0);
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0);
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  // Pipeline summary by stage
  const stageSummary = ['inquiry', 'contacted', 'proposal', 'negotiation'].map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage);
    return {
      stage,
      count: stageDeals.length,
      value: stageDeals.reduce((sum, d) => sum + d.value, 0),
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">Dashboard</h1>
          <p className="text-sm text-sm-text-muted mt-1">CRM overview</p>
        </div>
        <Link
          href="/admin/pipeline"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sm-accent-primary text-white text-sm font-medium hover:bg-sm-accent-primary-hover transition-colors"
        >
          View Pipeline
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-sm-text-muted">Total Leads</p>
              <p className="text-xl font-semibold text-sm-text-primary">{totalLeads}</p>
            </div>
          </div>
          {newLeads > 0 && (
            <p className="text-xs text-sm-accent-primary mt-2">{newLeads} new</p>
          )}
        </div>

        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-sm-text-muted">Active Deals</p>
              <p className="text-xl font-semibold text-sm-text-primary">{activeDeals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sm-accent-primary-light flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-sm-accent-primary" />
            </div>
            <div>
              <p className="text-sm text-sm-text-muted">Pipeline Value</p>
              <p className="text-xl font-semibold text-sm-text-primary">{formatCents(pipelineValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-sm-text-muted">Won Revenue</p>
              <p className="text-xl font-semibold text-sm-text-primary">{formatCents(wonValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline summary */}
      <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
        <h2 className="text-base font-semibold text-sm-text-primary mb-4">Pipeline Summary</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stageSummary.map(({ stage, count, value }) => (
            <div key={stage} className="text-center">
              <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${stageColors[stage]}`}>
                {stageLabels[stage]}
              </span>
              <p className="text-lg font-semibold text-sm-text-primary mt-2">{count}</p>
              <p className="text-xs text-sm-text-muted">{formatCents(value)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">Recent Activity</h2>
          {activities.length === 0 ? (
            <p className="text-sm text-sm-text-muted py-4 text-center">No activity yet</p>
          ) : (
            <div className="space-y-3">
              {activities.slice(0, 8).map(activity => {
                const Icon = activityIcons[activity.type] || MessageSquare;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sm-surface-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-sm-text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-sm-text-primary truncate">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {activity.lead && (
                          <Link
                            href={`/admin/leads/${activity.lead.id}`}
                            className="text-xs text-sm-accent-primary hover:underline"
                          >
                            {activity.lead.name}
                          </Link>
                        )}
                        <span className="text-xs text-sm-text-muted">{timeAgo(activity.date)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent leads */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-sm-text-primary">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="text-xs text-sm-accent-primary hover:underline"
            >
              View all
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="text-sm text-sm-text-muted py-4 text-center">No leads yet</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 8).map(lead => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-sm-surface-secondary transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-sm-text-primary">{lead.name}</p>
                    {lead.company && (
                      <p className="text-xs text-sm-text-muted">{lead.company}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {lead.estimated_value > 0 && (
                      <p className="text-xs font-medium text-sm-text-primary">{formatCents(lead.estimated_value)}</p>
                    )}
                    <p className="text-xs text-sm-text-muted">{timeAgo(lead.created_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
