import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { logLeadFetchError } from '../lib/admin-logging';

describe('logLeadFetchError', () => {
  const originalEnv = process.env.NODE_ENV;
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  it('logs detailed info in development', () => {
    process.env.NODE_ENV = 'development';
    const error = { message: 'boom', details: { foo: 'bar' } };
    logLeadFetchError(error, { id: 'abc' }, 500, 'abc');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const calledWith = consoleErrorSpy.mock.calls[0][0];
    expect(calledWith).toContain('Error fetching lead:');
    expect(calledWith).toContain('boom');
    expect(calledWith).toContain('"foo":"bar"');
  });

  it('logs minimal info in production', () => {
    process.env.NODE_ENV = 'production';
    const error = { message: 'boom', details: { foo: 'bar' } };
    logLeadFetchError(error, { id: 'abc' }, 500, 'abc');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const calledWith = consoleErrorSpy.mock.calls[0][0];
    expect(calledWith).toBe('Error fetching lead id abc: boom');
  });
});
