import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check session
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({
        error: 'Unauthorized',
      }, { status: 401 });
    }

    // Fetch raw data from leads_assessment
    const { data: rawData, error } = await supabase
      .from('leads_assessment')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    // Return sample data structure
    return NextResponse.json({
      success: true,
      count: rawData?.length || 0,
      sampleData: rawData?.[0] || null,
      columns: rawData?.[0] ? Object.keys(rawData[0]) : [],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
