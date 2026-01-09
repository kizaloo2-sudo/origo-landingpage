import logger from './logger';

export function logLeadFetchError(error: any, lead: any, status: any, paramsId: string) {
  // In development, log detailed structured debug info
  if (process.env.NODE_ENV === 'development') {
    logger.error('Error fetching lead:', { message: error?.message || null, details: error?.details || null, status, paramsId, data: lead });
    return;
  }

  // In production, log a minimal non-PII message
  logger.error(`Error fetching lead id ${paramsId}: ${error?.message ?? 'No further details available'}`);
}
