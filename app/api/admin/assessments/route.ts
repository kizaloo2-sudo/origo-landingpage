import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Authentication error', details: authError.message },
        { status: 401 }
      );
    }
    
    if (!session) {
      console.error('No session found');
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    console.log('Fetching assessments from leads_assessment table...');

    // Get all assessments from leads_assessment table
    const { data: assessments, error } = await supabase
      .from('leads_assessment')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching assessments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch assessments', details: error.message },
        { status: 500 }
      );
    }

    if (!assessments || assessments.length === 0) {
      console.warn('No assessments found in leads_assessment table');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // Transform data to match Admin Dashboard format
    const transformedData = assessments.map((assessment) => ({
      id: assessment.id,
      user_id: assessment.contact_email, // Use email as user identifier
      score: assessment.score_total || 0,
      answers: assessment.answers || {},
      completed: assessment.status === 'completed' || assessment.status === 'new',
      created_at: assessment.inserted_at,
      profiles: {
        email: assessment.contact_email,
        full_name: assessment.contact_name,
      },
    }));

    console.log(`Successfully fetched ${transformedData.length} assessments`);

    return NextResponse.json({
      success: true,
      data: transformedData,
      count: transformedData.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
