import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    console.log('🔍 TEST API: Starting...');
    
    const supabase = await createClient();
    console.log('🔍 TEST API: Supabase client created');

    // Check session
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    console.log('🔍 TEST API: Session check result:', { 
      hasSession: !!session, 
      error: authError?.message 
    });

    if (authError) {
      return NextResponse.json({
        success: false,
        message: 'Auth error',
        error: authError.message,
        session: null,
      });
    }

    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'No session found - Please login',
        session: null,
      });
    }

    // Try to fetch from leads_assessment
    const { data, error: dbError, count } = await supabase
      .from('leads_assessment')
      .select('*', { count: 'exact', head: true });

    console.log('🔍 TEST API: Database check result:', { 
      error: dbError?.message, 
      count 
    });

    return NextResponse.json({
      success: true,
      message: 'Test successful',
      session: {
        user: session.user.email,
        expiresAt: session.expires_at,
      },
      database: {
        hasError: !!dbError,
        error: dbError?.message,
        count: count || 0,
      },
    });
  } catch (error) {
    console.error('🔍 TEST API: Unexpected error:', error);
    return NextResponse.json({
      success: false,
      message: 'Unexpected error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
