import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Reset modules between tests so logger picks up NODE_ENV correctly
beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('logger', () => {
  it('debug logs only in development', async () => {
    process.env.NODE_ENV = 'development';
    const logger = await import('../lib/logger');

    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    logger.debug('test-debug', { a: 1 });

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('debug is silent in production', async () => {
    process.env.NODE_ENV = 'production';
    const logger = await import('../lib/logger');

    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    logger.debug('test-debug');

    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('error shows details in development but minimal in production', async () => {
    // Dev case
    process.env.NODE_ENV = 'development';
    let logger = await import('../lib/logger');
    let spyErr = vi.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('msg', { secret: 'PII' });
    // the logger composes a single string in dev containing the metadata
    expect(spyErr).toHaveBeenCalled();
    const devArg = spyErr.mock.calls[0][0] as string;
    expect(devArg).toContain('[error]');
    expect(devArg).toContain('msg');
    expect(devArg).toContain('"secret":"PII"');

    spyErr.mockRestore();

    // Prod case
    process.env.NODE_ENV = 'production';
    vi.resetModules();
    logger = await import('../lib/logger');
    spyErr = vi.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('msg', { secret: 'PII' });
    expect(spyErr).toHaveBeenCalledWith('msg');

    spyErr.mockRestore();
  });
});