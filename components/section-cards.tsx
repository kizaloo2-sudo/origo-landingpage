import { TrendingUpIcon, Users, CheckCircle2 } from "lucide-react"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  stats?: {
    totalLeads: number
    avgScore: number
    growthReady: number
  }
}

export function SectionCards({ stats }: SectionCardsProps) {
  // Default stats if not provided
  const displayStats = stats || {
    totalLeads: 1,
    avgScore: 9,
    growthReady: 0,
  }

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Total Leads */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Leads</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {displayStats.totalLeads}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Users className="size-8 text-blue-500 opacity-20" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Assessment submissions
          </div>
          <div className="text-muted-foreground">
            All leads from your funnel
          </div>
        </CardFooter>
      </Card>

      {/* Average Score */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Average Score</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-orange-500">
            {displayStats.avgScore}%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <TrendingUpIcon className="size-8 text-orange-500 opacity-20" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Readiness assessment
          </div>
          <div className="text-muted-foreground">
            Average growth readiness score
          </div>
        </CardFooter>
      </Card>

      {/* Growth Ready */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Growth Ready</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-green-500">
            {displayStats.growthReady}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <CheckCircle2 className="size-8 text-green-500 opacity-20" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            High-quality leads
          </div>
          <div className="text-muted-foreground">
            Ready for growth initiatives
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
