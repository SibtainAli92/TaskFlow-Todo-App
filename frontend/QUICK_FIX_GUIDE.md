# Quick Fix Guide - Deployment Error

## 🔴 Problem
Signup/Login shows "Internal Server Error" on deployed frontend (Vercel).

## ✅ Solution
Your environment variable is pointing to localhost instead of your production backend.

## 🚀 Fix Steps (5 minutes)

### 1. Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select project: **task-flow-todo-app**
3. Click: **Settings** → **Environment Variables**
4. Find or add: `NEXT_PUBLIC_BETTER_AUTH_URL`
5. Set value to: `https://sibtain22-todo-app.hf.space`
6. Select: **Production**, **Preview**, **Development**
7. Click: **Save**

### 2. Redeploy

1. Go to: **Deployments** tab
2. Click: **...** menu on latest deployment
3. Click: **Redeploy**
4. Wait for completion (~2 minutes)

### 3. Test

1. Visit: https://task-flow-todo-app-liart.vercel.app/auth/register
2. Try to signup with a new account
3. Should work now! ✅

## 📋 Environment Variables Checklist

### Vercel (Production)
```
NEXT_PUBLIC_API_BASE_URL=https://sibtain22-todo-app.hf.space
NEXT_PUBLIC_BETTER_AUTH_URL=https://sibtain22-todo-app.hf.space
```

### Local Development (.env.local)
```
# Use production backend
NEXT_PUBLIC_API_BASE_URL=https://sibtain22-todo-app.hf.space
NEXT_PUBLIC_BETTER_AUTH_URL=https://sibtain22-todo-app.hf.space

# OR use local backend (if running backend locally)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8001
# NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8001
```

## 🔍 How to Debug

### View Vercel Logs
1. Go to deployment
2. Click **View Function Logs**
3. Look for `[SIGN-UP ROUTE]` or `[SIGN-IN ROUTE]` logs
4. Check the Backend URL in logs

### View Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Try signup/login
4. Look for `[AUTH CONTEXT]` logs

### Expected Success Logs
```
[SIGN-UP ROUTE] Backend URL: https://sibtain22-todo-app.hf.space
[SIGN-UP ROUTE] Backend response status: 200
[AUTH CONTEXT] Sign up successful, setting session...
[HEADER] Auth state: { hasUser: true, hasSession: true }
```

## 🎯 What Was Fixed

### Frontend Changes
1. **Header.tsx** - Now shows user email + logout button after login
2. **AuthContext.tsx** - Added localStorage persistence for session
3. **API Client** - Added Authorization header logging
4. **Dashboard Layout** - Added route protection
5. **API Routes** - Enhanced error logging for debugging

### Files Modified
- `src/components/layout/Header.tsx`
- `src/lib/auth/AuthContext.tsx`
- `src/lib/api/client.ts`
- `src/app/dashboard/layout.tsx`
- `src/app/api/auth/sign-in/route.ts`
- `src/app/api/auth/sign-up/route.ts`
- `.env.local`

## 📚 Documentation Created
- `AUTH_FIXES_SUMMARY.md` - Complete authentication fixes
- `DEPLOYMENT_TROUBLESHOOTING.md` - Detailed deployment guide
- `.env.example` - Environment variables template
- `QUICK_FIX_GUIDE.md` - This file

## ✅ Testing Checklist

After deployment:
- [ ] Signup creates new account
- [ ] Login works with existing account
- [ ] Header shows user email after login
- [ ] Logout button appears when logged in
- [ ] Page refresh maintains login state
- [ ] Dashboard redirects to login when not authenticated
- [ ] Task creation works (Authorization header sent)

## 🆘 Still Having Issues?

### Check Backend
Visit: https://sibtain22-todo-app.hf.space/docs
- Should show FastAPI Swagger UI
- Try signup/login directly in the playground

### Check CORS
Backend must allow your Vercel domain:
```python
allow_origins=[
    "https://task-flow-todo-app-liart.vercel.app",
    "http://localhost:3000"
]
```

### Check Cookies
Backend must set cookies with:
```python
secure=True,
sameSite="none",
httpOnly=True
```

## 🎉 Success Indicators

You'll know it's working when:
1. No "Internal Server Error" on signup/login
2. Header shows your email after login
3. Dashboard loads without redirect
4. Tasks can be created
5. Logout works and redirects to login

---

**Need more help?** Check `DEPLOYMENT_TROUBLESHOOTING.md` for detailed debugging steps.
