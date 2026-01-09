'use server';

import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

// Define the structure for a single answer
export interface Answer {
  questionId: string;
  question: string;
  answer: string | number;
  score: number;
}

// Define the structure for the database record
export interface AssessmentRecord {
  contact_name: string;
  contact_email: string;
  contact_role: string;
  company_industry: string;
  answers: Answer[];
  score_total: number;
  tier_result: string;
  status?: string;
}

// Define the structure for the data submitted to the server action
export interface SubmitAssessmentData {
  score: number;
  tier: string;
  contactInfo: {
    name: string;
    email: string;
    role: string;
    industry: string;
  };
  answers: Answer[];
}

/**
 * Get tier name based on score percentage
 * Tier 1 (0-40%): Noise-Driven Execution
 * Tier 2 (41-70%): Partial Signal Clarity
 * Tier 3 (71-100%): Signal-Driven Growth
 */
function getTierName(scorePercentage: number): string {
  if (scorePercentage <= 40) {
    return 'Noise-Driven Execution';
  }
  if (scorePercentage <= 70) {
    return 'Partial Signal Clarity';
  }
  return 'Signal-Driven Growth';
}


/**
 * Submit assessment to Supabase (Server Action)
 * This is a recreated version of the file.
 */
export async function submitAssessment(data: SubmitAssessmentData) {
  try {
    // Basic validation
    if (!data.contactInfo?.email || !data.contactInfo?.name) {
      throw new Error('Contact information is required');
    }

    if (!data.answers || data.answers.length === 0) {
      throw new Error('Assessment answers are required');
    }

    // Verify environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured');
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured');
    }

    // Use a service role client for inserts to bypass RLS, with a fallback to the user's session.
    let supabase;
    try {
      supabase = createServiceRoleClient();
      console.log('✅ Using Service Role Client');
    } catch (err) {
      console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found; falling back to server session client.');
      console.warn('💡 Tip: Add SUPABASE_SERVICE_ROLE_KEY to .env.local for better reliability');
      supabase = await createClient();
    }
    
    const record: AssessmentRecord = {
      contact_name: data.contactInfo.name,
      contact_email: data.contactInfo.email,
      contact_role: data.contactInfo.role,
      company_industry: data.contactInfo.industry,
      answers: data.answers,
      score_total: data.score,
      tier_result: data.tier,
      status: 'new'
    };

    console.log('Submitting assessment:', {
      email: record.contact_email,
      score: record.score_total,
      tier: record.tier_result,
    });

    // Insert the record into the 'leads_assessment' table
    const { data: result, error } = await supabase
      .from('leads_assessment')
      .insert([record])
      .select();

    if (error) {
      console.error('❌ Supabase Insert Error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Provide more helpful error messages
      if (error.code === 'PGRST116') {
        throw new Error('Table "leads_assessment" not found. Please run the database migration.');
      }
      if (error.code === '42501') {
        throw new Error('Permission denied. Please check RLS policies or add SUPABASE_SERVICE_ROLE_KEY.');
      }
      if (error.message.includes('fetch failed')) {
        throw new Error('Cannot connect to database. Please check your internet connection and Supabase URL.');
      }
      
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Assessment submitted successfully:', result?.[0]?.id);
    return result;

  } catch (error) {
    console.error('❌ Failed to submit assessment:', error);
    
    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
    
    // Re-throw the error to be handled by the calling client component
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('An unknown error occurred during submission.');
  }
}