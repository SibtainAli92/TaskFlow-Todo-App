import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:8001';

export async function POST(request: NextRequest) {
  console.log('[SIGN-IN ROUTE] Backend URL:', BACKEND_URL);
  console.log('[SIGN-IN ROUTE] Environment:', process.env.NODE_ENV);

  try {
    const body = await request.json();
    console.log('[SIGN-IN ROUTE] Request body:', { email: body.email, hasPassword: !!body.password });

    const backendUrl = `${BACKEND_URL}/api/auth/sign-in`;
    console.log('[SIGN-IN ROUTE] Calling backend:', backendUrl);

    // Forward request to backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('[SIGN-IN ROUTE] Backend response status:', response.status);
    console.log('[SIGN-IN ROUTE] Backend response headers:', Object.fromEntries(response.headers.entries()));

    // Try to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('[SIGN-IN ROUTE] Backend JSON response:', {
        hasUser: !!data.user,
        hasSession: !!data.session,
        hasError: !!data.error,
        hasDetail: !!data.detail
      });
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      console.error('[SIGN-IN ROUTE] Non-JSON response:', text);
      data = { error: text || 'Login failed' };
    }

    // Get Set-Cookie header from backend response
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      console.log('[SIGN-IN ROUTE] Forwarding Set-Cookie header');
    }

    // Create response with same data
    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward the cookie to the frontend domain
    if (setCookieHeader) {
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error('[SIGN-IN ROUTE] Proxy error:', error);
    console.error('[SIGN-IN ROUTE] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        backendUrl: BACKEND_URL
      },
      { status: 500 }
    );
  }
}
