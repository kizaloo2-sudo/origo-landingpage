"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table-leads"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import mock data
import mockData from "./data.json"

// Uncomment this line to use real data from Supabase
// import { useLeads } from "@/hooks/use-leads"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tierFilter, setTierFilter] = useState("all")

  // Uncomment these lines to use real data from Supabase
  // const { leads, isLoading, error, stats } = useLeads()
  // if (isLoading) return <div className="p-8">Loading leads...</div>
  // if (error) return <div className="p-8">Error: {error.message}</div>
  
  // Using mock data for now
  const leads = mockData
  const stats = {
    totalLeads: leads.length,
    avgScore: Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) || 0,
    growthReady: leads.filter(lead => lead.tier.toLowerCase().includes('growth')).length,
  }

  // Filter data based on search and tier
  const filteredData = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTier =
      tierFilter === "all" ||
      lead.tier.toLowerCase().replace(/[\s-]/g, "") === 
      tierFilter.toLowerCase().replace(/[\s-]/g, "")

    return matchesSearch && matchesTier
  })

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={stats} />
              
              {/* Search and Filter Bar */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or industry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Tier Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={tierFilter} onValueChange={setTierFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Tiers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        <SelectItem value="growth-ready">Growth Ready</SelectItem>
                        <SelectItem value="noise-driven">Noise-Driven</SelectItem>
                        <SelectItem value="potential">Potential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results count */}
                <div className="mt-2 text-sm text-muted-foreground">
                  Showing {filteredData.length} of {leads.length} leads
                </div>
              </div>

              <DataTable data={filteredData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
