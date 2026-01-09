"use client"

import * as React from "react"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

interface DataTableProps {
  data: Lead[]
}

export function DataTable({ data }: DataTableProps) {
  const getTierVariant = (tier: string): "default" | "destructive" | "secondary" | "outline" => {
    const tierLower = tier.toLowerCase()
    if (tierLower.includes("growth")) return "default"
    if (tierLower.includes("noise")) return "destructive"
    if (tierLower.includes("potential")) return "secondary"
    return "outline"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center mx-4 lg:mx-6">
        <p className="text-muted-foreground">No leads found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Leads will appear here once submitted
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border mx-4 lg:mx-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">
                {formatDate(lead.date)}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{lead.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {lead.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>{lead.role}</TableCell>
              <TableCell>{lead.industry}</TableCell>
              <TableCell>
                <Badge variant={getTierVariant(lead.tier)}>
                  {lead.tier} ({lead.score}%)
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    // TODO: Navigate to lead detail page
                    console.log("View lead:", lead.id)
                  }}
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
