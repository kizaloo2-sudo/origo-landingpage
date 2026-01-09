// test-supabase-connection.ts
// วิธีใช้: npx tsx test-supabase-connection.ts

import { createClient } from '@supabase/supabase-js';

// ดึงค่า environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Checking Supabase Configuration...\n');

// ตรวจสอบ environment variables
console.log('Environment Variables:');
console.log('- SUPABASE_URL:', SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('- SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');
console.log('- SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? '✅ Found' : '❌ Missing');
console.log('');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables!');
  process.exit(1);
}

// สร้าง Supabase client
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false }
  }
);

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  try {
    // Test 1: ตรวจสอบว่า table exists
    console.log('Test 1: Checking if leads_assessment table exists...');
    const { data: tables, error: tableError } = await supabase
      .from('leads_assessment')
      .select('id')
      .limit(1);

    if (tableError) {
      console.error('❌ Table check failed:', tableError.message);
      console.log('\n💡 Fix: Run the migration SQL in Supabase Dashboard:');
      console.log('   Go to: Database → SQL Editor');
      console.log('   Run: migrations/001_create_leads_assessment.sql');
      return;
    }
    console.log('✅ Table exists and is accessible\n');

    // Test 2: ลอง insert ข้อมูล test
    console.log('Test 2: Trying to insert test record...');
    const testRecord = {
      contact_name: 'Test User',
      contact_email: 'test@example.com',
      contact_role: 'Test Role',
      company_industry: 'Test Industry',
      answers: [
        {
          questionId: 'q1',
          question: 'Test Question',
          answer: 'Test Answer',
          score: 0
        }
      ],
      score_total: 10,
      tier_result: 'Test Tier',
      status: 'test'
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('leads_assessment')
      .insert([testRecord])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      console.log('\n💡 Possible causes:');
      console.log('   1. RLS (Row Level Security) is blocking inserts');
      console.log('   2. Table permissions are not configured');
      console.log('   3. SUPABASE_SERVICE_ROLE_KEY is not set or invalid');
      console.log('\n💡 Fix:');
      console.log('   Option A: Disable RLS on leads_assessment table');
      console.log('   Option B: Add INSERT policy for authenticated users');
      console.log('   Option C: Set SUPABASE_SERVICE_ROLE_KEY in .env.local');
      return;
    }

    console.log('✅ Insert successful!');
    console.log('   Inserted ID:', insertResult?.[0]?.id);
    console.log('');

    // Test 3: ลบ test record
    console.log('Test 3: Cleaning up test record...');
    const { error: deleteError } = await supabase
      .from('leads_assessment')
      .delete()
      .eq('status', 'test');

    if (deleteError) {
      console.warn('⚠️  Cleanup failed:', deleteError.message);
    } else {
      console.log('✅ Test record cleaned up\n');
    }

    // สรุปผล
    console.log('🎉 All tests passed! Supabase connection is working correctly.\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('fetch failed')) {
        console.log('\n💡 Network Error - Possible causes:');
        console.log('   1. No internet connection');
        console.log('   2. Firewall blocking Supabase');
        console.log('   3. Invalid SUPABASE_URL');
        console.log('   4. Supabase project is paused/deleted');
      }
    }
  }
}

// รัน test
testConnection();
