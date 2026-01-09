"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Lead {
  id: string
  date: string
  name: string
  email: string
  role: string
  industry: string
  tier: string
  score: number
}

interface UseLeadsResult {
  leads: Lead[]
  isLoading: boolean
  error: Error | null
  stats: {
    totalLeads: number
    avgScore: number
    growthReady: number
  }
}

export function useLeads(): UseLeadsResult {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLeads() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('assessment_submissions')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        // Transform data to match Lead interface
        const transformedData = (data || []).map((item: any) => ({
          id: item.id,
          date: item.created_at,
          name: item.name || 'Unknown',
          email: item.email,
          role: item.role || 'N/A',
          industry: item.industry || 'N/A',
          tier: item.tier || 'Unknown',
          score: item.score || 0,
        }))

        setLeads(transformedData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    avgScore: leads.length > 0 
      ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
      : 0,
    growthReady: leads.filter(lead => 
      lead.tier.toLowerCase().includes('growth')
    ).length,
  }

  return { leads, isLoading, error, stats }
}
