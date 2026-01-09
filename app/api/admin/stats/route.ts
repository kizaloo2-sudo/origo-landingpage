import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all assessments for statistics
    const { data: assessments, error } = await supabase
      .from('leads_assessment')
      .select('*');

    if (error) {
      console.error('Error fetching stats:', error);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const totalAssessments = assessments?.length || 0;
    const completedAssessments = assessments?.filter(
      (a) => a.status === 'completed' || a.status === 'new'
    ).length || 0;

    // Get unique users
    const uniqueEmails = new Set(assessments?.map((a) => a.contact_email) || []);
    const totalUsers = uniqueEmails.size;

    // Calculate active users (users with assessments in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = new Set(
      assessments
        ?.filter((a) => new Date(a.created_at) >= thirtyDaysAgo)
        .map((a) => a.contact_email) || []
    ).size;

    // Calculate completion rate
    const completionRate = totalAssessments > 0
      ? Math.round((completedAssessments / totalAssessments) * 100)
      : 0;

    // Calculate average score
    const totalScore = assessments?.reduce((sum, a) => sum + (a.score_total || 0), 0) || 0;
    const averageScore = totalAssessments > 0
      ? Math.round(totalScore / totalAssessments)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalAssessments,
        activeUsers,
        completionRate,
        averageScore,
        completedAssessments,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
