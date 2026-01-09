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

    console.log('Fetching from leads_assessment table...');

    // Get unique users from leads_assessment table
    const { data: assessments, error } = await supabase
      .from('leads_assessment')
      .select('contact_email, contact_name, contact_role, company_industry, inserted_at, score_total')
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users', details: error.message },
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

    // Create unique users list (deduplicate by email)
    const usersMap = new Map();
    
    assessments.forEach((assessment) => {
      const email = assessment.contact_email;
      
      // Only keep the first (most recent) entry for each email
      if (!usersMap.has(email)) {
        usersMap.set(email, {
          id: email, // Use email as ID
          email: email,
          full_name: assessment.contact_name,
          role: assessment.contact_role,
          industry: assessment.company_industry,
          created_at: assessment.inserted_at,
          last_sign_in_at: assessment.inserted_at, // Mock last sign in
          score: assessment.score_total || 0, // Add score for tier calculation
        });
      }
    });

    const users = Array.from(usersMap.values());
    console.log(`Successfully fetched ${users.length} unique users`);

    return NextResponse.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
