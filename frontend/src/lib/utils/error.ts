/**
 * Safely extracts a readable error message from various error types
 * Prevents React "Objects are not valid as a React child" errors
 */
export function getErrorMessage(error: unknown): string {
  // Handle Error instances
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle FastAPI validation errors: {detail: [{type, loc, msg, input}]}
  if (error && typeof error === 'object') {
    const err = error as any;

    // Check for detail field (FastAPI standard)
    if (err.detail) {
      // Array of validation errors
      if (Array.isArray(err.detail)) {
        return err.detail
          .map((e: any) => {
            if (typeof e === 'string') return e;
            if (e.msg) return e.msg;
            return JSON.stringify(e);
          })
          .join(', ');
      }

      // Single detail string
      if (typeof err.detail === 'string') {
        return err.detail;
      }

      // Detail is an object
      if (typeof err.detail === 'object') {
        if (err.detail.msg) return err.detail.msg;
        return JSON.stringify(err.detail);
      }
    }

    // Check for message field
    if (err.message && typeof err.message === 'string') {
      return err.message;
    }

    // Check for error field
    if (err.error && typeof err.error === 'string') {
      return err.error;
    }

    // Last resort: stringify the object
    try {
      return JSON.stringify(error);
    } catch {
      return 'An unknown error occurred';
    }
  }

  // Fallback for null, undefined, or other types
  return 'An unknown error occurred';
}

/**
 * Safely renders any value as a string for display in React components
 */
export function safeRender(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '[Object]';
    }
  }

  return String(value);
}
