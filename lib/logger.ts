export function debug(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[debug]', ...args);
  }
}

export function info(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.info('[info]', ...args);
  } else {
    console.log('[info]', ...args);
  }
}

export function warn(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[warn]', ...args);
  } else {
    console.warn('[warn]', ...args);
  }
}

export function error(message: string, details?: unknown) {
  const meta = details === undefined ? '' : (typeof details === 'string' ? details : JSON.stringify(details));
  if (process.env.NODE_ENV === 'development') {
    // Compose a single string so tests can assert on the first argument
    const out = `[error] ${message}${meta ? ' ' + meta : ''}`;
    console.error(out);
  } else {
    // Keep production errors minimal to avoid leaking PII
    console.error(message);
  }
}

const logger = {
  debug,
  info,
  warn,
  error,
};

export default logger;
