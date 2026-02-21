# Deployment Troubleshooting Guide

## 🔴 Critical Issue: Internal Server Error on Signup/Login

### Root Cause
Your frontend is deployed on Vercel but the environment variable `NEXT_PUBLIC_BETTER_AUTH_URL` is pointing to `http://localhost:8001`, which doesn't exist on Vercel's servers.

### Current Configuration (Local)
```env
NEXT_PUBLIC_API_BASE_URL=https://sibtain22-todo-app.hf.space
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8001  ❌ WRONG FOR PRODUCTION
```

### ✅ Fix: Update Vercel Environment Variables

#### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Select your project: `task-flow-todo-app`
3. Go to **Settings** → **Environment Variables**

#### Step 2: Add/Update Environment Variables

Add these environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://sibtain22-todo-app.hf.space
NEXT_PUBLIC_BETTER_AUTH_URL=https://sibtain22-todo-app.hf.space
```

**Important Notes:**
- Both should point to your Hugging Face Space URL
- Make sure to select **Production**, **Preview**, and **Development** environments
- Click **Save**

#### Step 3: Redeploy
After saving environment variables:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### How to Verify the Fix

#### 1. Check Vercel Logs
After redeployment:
1. Go to your deployment
2. Click **View Function Logs**
3. Try to signup/login from your deployed frontend
4. Look for these logs:

```
[SIGN-UP ROUTE] Backend URL: https://sibtain22-todo-app.hf.space
[SIGN-UP ROUTE] Calling backend: https://sibtain22-todo-app.hf.space/api/auth/sign-up
[SIGN-UP ROUTE] Backend response status: 200
```

If you see `http://localhost:8001`, the environment variable didn't update.

#### 2. Test Signup Flow
1. Open your deployed frontend: https://task-flow-todo-app-liart.vercel.app
2. Go to signup page
3. Open browser DevTools → Console
4. Try to create an account
5. Check console logs for errors

#### 3. Expected Success Logs
```
[AUTH CONTEXT] Sign up attempt for: user@example.com
[AUTH CONTEXT] Sign up response: { status: 200, ok: true, hasUser: true, hasSession: true }
[AUTH CONTEXT] Sign up successful, setting session...
```

### Common Deployment Issues

#### Issue 1: CORS Errors
**Symptom:** `Access-Control-Allow-Origin` error in browser console

**Fix:** Ensure your backend (Hugging Face Space) has CORS configured:
```python
# backend/src/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://task-flow-todo-app-liart.vercel.app",  # Your Vercel URL
        "http://localhost:3000"  # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Issue 2: Environment Variables Not Updating
**Symptom:** Still seeing localhost in logs after redeployment

**Fix:**
1. Delete the old environment variable in Vercel
2. Add it again with the correct value
3. Trigger a new deployment (not redeploy)
4. Clear browser cache

#### Issue 3: Backend Not Responding
**Symptom:** Timeout or 502 errors

**Fix:**
1. Check if your Hugging Face Space is running
2. Visit https://sibtain22-todo-app.hf.space directly
3. Check Hugging Face Space logs for errors
4. Ensure the Space hasn't gone to sleep (free tier limitation)

#### Issue 4: Cookie Not Being Set
**Symptom:** Login succeeds but user state is lost on refresh

**Fix:** Ensure cookies are configured for cross-origin:
```python
# backend - Better Auth configuration
cookie_config = {
    "secure": True,  # Required for HTTPS
    "httpOnly": True,
    "sameSite": "none",  # Required for cross-origin
    "domain": ".hf.space"  # Allow subdomain cookies
}
```

### Environment Variables Reference

#### Frontend (Vercel)
```env
# API endpoints
NEXT_PUBLIC_API_BASE_URL=https://sibtain22-todo-app.hf.space
NEXT_PUBLIC_BETTER_AUTH_URL=https://sibtain22-todo-app.hf.space

# Optional: Better Auth secret (if needed)
BETTER_AUTH_SECRET=your-secret-key-here
```

#### Backend (Hugging Face Spaces)
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
SECRET_KEY=your-jwt-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Better Auth
BETTER_AUTH_SECRET=same-as-frontend-secret

# CORS (in code, not env)
ALLOWED_ORIGINS=https://task-flow-todo-app-liart.vercel.app,http://localhost:3000
```

### Testing Checklist

After deployment, test these flows:

- [ ] Signup with new account
- [ ] Login with existing account
- [ ] Page refresh maintains auth state
- [ ] Logout clears state and redirects
- [ ] Create task (requires auth)
- [ ] Dashboard shows user email in header
- [ ] Protected routes redirect to login when not authenticated

### Debug Commands

#### Check Environment Variables in Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# List environment variables
vercel env ls
```

#### View Real-Time Logs
```bash
# Stream logs from Vercel
vercel logs --follow
```

#### Test Backend Directly
```bash
# Test signup endpoint
curl -X POST https://sibtain22-todo-app.hf.space/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test login endpoint
curl -X POST https://sibtain22-todo-app.hf.space/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Quick Fix Summary

**For the immediate "internal server error" issue:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_BETTER_AUTH_URL` to `https://sibtain22-todo-app.hf.space`
3. Redeploy
4. Test signup again

That's it! The error should be resolved.

### Need More Help?

If the issue persists after following these steps:

1. Check Vercel Function Logs for the actual error message
2. Check Hugging Face Space logs for backend errors
3. Share the specific error message from the logs
4. Verify both frontend and backend are using the same authentication secret

### Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces)
