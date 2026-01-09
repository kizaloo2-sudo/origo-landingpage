import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitAssessment, type SubmitAssessmentData } from '@/services/assessment-service';
import * as server from '@/lib/supabase/server';

// Mock the Supabase server-side clients
vi.mock('@/lib/supabase/server', () => {
  const mockSupabaseClient = {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockResolvedValue({ data: [{ id: '123' }], error: null }),
  };
  return {
    createClient: vi.fn().mockResolvedValue(mockSupabaseClient),
    createServiceRoleClient: vi.fn().mockReturnValue(mockSupabaseClient),
  };
});

// Cast the mocked functions to the correct type for Vitest
const mockedCreateServiceRoleClient = vi.mocked(server.createServiceRoleClient);
const mockedSupabaseClient = mockedCreateServiceRoleClient();

describe('submitAssessment Service', () => {
  let mockData: SubmitAssessmentData;

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
    mockData = {
      score: 85,
      tier: 'Signal-Driven Growth',
      contactInfo: {
        name: 'Test User',
        email: 'test@example.com',
        role: 'Founder / Owner',
        industry: 'Tech / SaaS',
      },
      answers: [
        {
          questionId: 'q5',
          question: 'Do you have clear evidence of active buyers?',
          answer: 'Yes, verified by recent deals',
          score: 3,
        },
      ],
    };
  });

  it('should submit a valid assessment successfully using the service role client', async () => {
    const result = await submitAssessment(mockData);

    // Verify service role client was used
    expect(server.createServiceRoleClient).toHaveBeenCalled();
    expect(server.createClient).not.toHaveBeenCalled();

    // Verify Supabase methods were called correctly
    expect(mockedSupabaseClient.from).toHaveBeenCalledWith('leads_assessment');
    expect(mockedSupabaseClient.insert).toHaveBeenCalledOnce();
    const insertedRecord = mockedSupabaseClient.insert.mock.calls[0][0][0];
    
    expect(insertedRecord).toMatchObject({
      contact_name: 'Test User',
      contact_email: 'test@example.com',
      score_total: 85,
      tier_result: 'Signal-Driven Growth',
      status: 'new'
    });
    
    expect(mockedSupabaseClient.select).toHaveBeenCalledOnce();
    
    // Verify the result
    expect(result).toEqual([{ id: '123' }]);
  });

  it('should throw an error if contact information is missing', async () => {
    const invalidData = { ...mockData, contactInfo: { name: '', email: '', role: '', industry: '' } };
    
    await expect(submitAssessment(invalidData)).rejects.toThrow('Contact information is required');

    // Ensure no database calls were made
    expect(mockedSupabaseClient.from).not.toHaveBeenCalled();
  });

  it('should throw an error if answers are missing', async () => {
    const invalidData = { ...mockData, answers: [] };
    
    await expect(submitAssessment(invalidData)).rejects.toThrow('Assessment answers are required');

    // Ensure no database calls were made
    expect(mockedSupabaseClient.from).not.toHaveBeenCalled();
  });

  it('should throw an error if the database insert fails', async () => {
    const dbError = { message: 'Insert failed', details: 'Something went wrong', hint: '', code: '500' };
    vi.mocked(mockedSupabaseClient.select).mockResolvedValueOnce({ data: null, error: dbError });

    await expect(submitAssessment(mockData)).rejects.toThrow(`Database error: ${dbError.message}`);

    expect(mockedSupabaseClient.from).toHaveBeenCalledWith('leads_assessment');
    expect(mockedSupabaseClient.insert).toHaveBeenCalledOnce();
  });

  it('should fall back to the standard client if the service role client fails to initialize', async () => {
    // Mock the service role client to throw an error
    vi.mocked(server.createServiceRoleClient).mockImplementationOnce(() => {
      throw new Error('Service key not available');
    });

    await submitAssessment(mockData);

    // Check that the fallback occurred
    expect(server.createServiceRoleClient).toHaveBeenCalled();
    expect(server.createClient).toHaveBeenCalled(); // The standard client should now be called
    
    // The rest of the logic should still proceed
    expect(mockedSupabaseClient.from).toHaveBeenCalledWith('leads_assessment');
    expect(mockedSupabaseClient.insert).toHaveBeenCalledOnce();
  });
});
