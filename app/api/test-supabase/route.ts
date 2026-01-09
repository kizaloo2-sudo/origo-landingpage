// app/api/test-supabase/route.ts
import { NextResponse } from 'next/server';
import { createServiceRoleClient, createClient } from '@/lib/supabase/server';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: { passed: 0, failed: 0 }
  };

  try {
    // Test 1: Environment Variables
    results.tests.push({
      name: 'Environment Variables Check',
      status: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PASS' : 'FAIL',
      details: {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Found' : '❌ Missing',
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Found' : '❌ Missing'
      }
    });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      results.summary.failed++;
      return NextResponse.json(results, { status: 500 });
    }
    results.summary.passed++;

    // Test 2: Get Supabase Client
    let supabase;
    let clientType = 'unknown';
    try {
      supabase = createServiceRoleClient();
      clientType = 'Service Role Client';
    } catch {
      supabase = await createClient();
      clientType = 'Session Client';
    }

    results.tests.push({
      name: 'Supabase Client Creation',
      status: 'PASS',
      details: { clientType }
    });
    results.summary.passed++;

    // Test 3: Table Exists Check
    const { data: tableCheck, error: tableError } = await supabase
      .from('leads_assessment')
      .select('id')
      .limit(1);

    if (tableError) {
      results.tests.push({
        name: 'Table Exists Check',
        status: 'FAIL',
        error: tableError.message,
        details: {
          code: tableError.code,
          hint: tableError.hint,
          fix: 'Run migrations/001_create_leads_assessment.sql in Supabase Dashboard'
        }
      });
      results.summary.failed++;
      return NextResponse.json(results, { status: 500 });
    }

    results.tests.push({
      name: 'Table Exists Check',
      status: 'PASS',
      details: { message: 'leads_assessment table is accessible' }
    });
    results.summary.passed++;

    // Test 4: Insert Test Record
    const testRecord = {
      contact_name: 'Test User',
      contact_email: `test-${Date.now()}@example.com`,
      contact_role: 'Test Role',
      company_industry: 'Test Industry',
      answers: [{
        questionId: 'q1',
        question: 'Test Question',
        answer: 'Test Answer',
        score: 0
      }],
      score_total: 10,
      tier_result: 'Test Tier',
      status: 'test'
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('leads_assessment')
      .insert([testRecord])
      .select();

    if (insertError) {
      results.tests.push({
        name: 'Insert Test Record',
        status: 'FAIL',
        error: insertError.message,
        details: {
          code: insertError.code,
          hint: insertError.hint,
          possibleCauses: [
            'RLS (Row Level Security) is blocking inserts',
            'Missing SUPABASE_SERVICE_ROLE_KEY',
            'No INSERT policy configured'
          ],
          fix: 'Disable RLS or add INSERT policy for public'
        }
      });
      results.summary.failed++;
      return NextResponse.json(results, { status: 500 });
    }

    const insertedId = insertResult?.[0]?.id;
    results.tests.push({
      name: 'Insert Test Record',
      status: 'PASS',
      details: { insertedId }
    });
    results.summary.passed++;

    // Test 5: Cleanup Test Record
    const { error: deleteError } = await supabase
      .from('leads_assessment')
      .delete()
      .eq('id', insertedId);

    if (deleteError) {
      results.tests.push({
        name: 'Cleanup Test Record',
        status: 'WARN',
        error: deleteError.message,
        details: { message: 'Manual cleanup may be needed' }
      });
    } else {
      results.tests.push({
        name: 'Cleanup Test Record',
        status: 'PASS',
        details: { message: 'Test record deleted successfully' }
      });
      results.summary.passed++;
    }

    // Overall Result
    results.summary.message = results.summary.failed === 0 
      ? '🎉 All tests passed! Supabase is configured correctly.'
      : `⚠️  ${results.summary.failed} test(s) failed. Please check the details above.`;

    return NextResponse.json(results, { 
      status: results.summary.failed === 0 ? 200 : 500 
    });

  } catch (error) {
    results.tests.push({
      name: 'Unexpected Error',
      status: 'FAIL',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    results.summary.failed++;
    results.summary.message = '❌ Unexpected error occurred during testing';

    return NextResponse.json(results, { status: 500 });
  }
}
