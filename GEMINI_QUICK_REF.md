# Gemini AI Book Valuation - Quick Reference

## ✅ What Was Done

### 1. Updated Book Valuation Algorithm
- **File:** `src/utils/bookValuation.js`
- **Changes:**
  - Integrated Google Gemini AI for intelligent book valuation
  - AI analyzes: title, author, genre, condition, ISBN, publication year, demand, rarity
  - Returns point value (10-500) with detailed reasoning
  - Fallback calculation if AI unavailable

### 2. Enhanced Books API Endpoint
- **File:** `src/app/api/books/[id]/route.js`
- **Changes:**
  - Added `valuation` object to GET response
  - Includes AI-powered breakdown and reasoning
  - Graceful error handling

### 3. Documentation Created
- **GEMINI_SETUP.md** - Complete setup guide
- **.env.example** - Updated with GEMINI_API_KEY

---

## 🚀 Setup Steps

### 1. Install Package
```bash
npm install @google/generative-ai
```

### 2. Get API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

### 3. Add to Environment
Add to your `.env` file:
```env
GEMINI_API_KEY=AIzaSy_your_actual_key_here
```

---

## 📡 API Response

### GET /api/books/:id

**Before (without valuation):**
```json
{
  "success": true,
  "book": { ... }
}
```

**After (with AI valuation):**
```json
{
  "success": true,
  "book": {
    "id": "book-123",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "condition": "excellent",
    // ... other fields
  },
  "valuation": {
    "bookId": "book-123",
    "bookTitle": "The Great Gatsby",
    "finalValue": 285,
    "aiReasoning": "This classic American novel in excellent condition commands premium value. The author's literary significance and the book's enduring popularity justify the higher point allocation. Excellent condition adds substantial value for collectors.",
    "method": "gemini-ai",
    "breakdown": {
      "condition": {
        "value": "excellent",
        "multiplier": 1.3,
        "impact": "+30%"
      },
      "demand": {
        "recentRequests": 8,
        "score": "4/5",
        "multiplier": 1.4,
        "impact": "+40%"
      },
      "rarity": {
        "score": "2/3",
        "multiplier": 1.4,
        "impact": "+40%"
      }
    }
  }
}
```

---

## 🤖 How Gemini AI Evaluates Books

The AI considers:

1. **Condition Factor**
   - New: +50%
   - Excellent: +30%
   - Good: 0%
   - Fair: -30%
   - Poor: -50%

2. **Demand Factor** (based on recent requests)
   - 10+ requests = Score 5/5 → +50%
   - 7-9 requests = Score 4/5 → +40%
   - 4-6 requests = Score 3/5 → +30%
   - 2-3 requests = Score 2/5 → +20%
   - 1 request = Score 1/5 → +10%
   - 0 requests = Score 0/5 → 0%

3. **Rarity Factor** (based on available copies)
   - 1 copy = Score 3/3 → +60%
   - 2 copies = Score 2/3 → +40%
   - 3-4 copies = Score 1/3 → +20%
   - 5+ copies = Score 0/3 → 0%

4. **Additional AI Analysis**
   - Genre popularity
   - Author reputation
   - Publication age (classic vs. recent)
   - Educational vs. entertainment value
   - Collectibility factor

---

## 🔄 Fallback System

If Gemini API is unavailable:
- ✅ System continues to work
- ✅ Uses basic calculation: Base × Condition × Demand
- ✅ Returns `"method": "fallback"` in response
- ✅ No AI reasoning included

---

## 🧪 Testing

### Test with real book:
```bash
curl http://localhost:3000/api/books/your-book-id
```

### Expected response includes:
- ✅ `valuation.finalValue` (10-500 points)
- ✅ `valuation.aiReasoning` (AI's explanation)
- ✅ `valuation.method` ("gemini-ai" or "fallback")
- ✅ `valuation.breakdown` (detailed factors)

---

## 📊 Integration Points

### Exchange Request Endpoint
`POST /api/exchanges` already uses `calculateBookValue()`:
- AI valuation automatically applied
- Points deducted based on AI calculation
- No changes needed

### Books List Endpoint
`GET /api/books` returns multiple books:
- Does NOT include valuation (performance)
- Only shown on individual book view

---

## 💰 Cost & Limits

### Free Tier:
- ✅ 60 requests per minute
- ✅ Free for Gemini Pro model
- ✅ Generous quota for most apps

### Optimization:
- Valuation calculated on-demand
- Only when viewing individual book
- Can add caching if needed

---

## ⚠️ Important Notes

1. **API Key Security:**
   - Never commit `.env` to git
   - Keep `.env` in `.gitignore`
   - Rotate key if exposed

2. **Error Handling:**
   - System gracefully degrades
   - Fallback always available
   - No service disruption

3. **Production Deployment:**
   - Add GEMINI_API_KEY to hosting platform
   - Vercel: Project Settings → Environment Variables
   - Monitor usage in Google AI Studio

---

## 📁 Files Modified

1. ✅ `src/utils/bookValuation.js` - Gemini integration
2. ✅ `src/app/api/books/[id]/route.js` - Added valuation to response
3. ✅ `.env.example` - Added GEMINI_API_KEY
4. ✅ `GEMINI_SETUP.md` - Complete documentation
5. ✅ `GEMINI_QUICK_REF.md` - This file

---

## 🎯 Next Steps

1. ✅ Run: `npm install @google/generative-ai`
2. ✅ Get API key: https://makersuite.google.com/app/apikey
3. ✅ Add to `.env`: `GEMINI_API_KEY=your_key`
4. ✅ Test: `GET /api/books/:id`
5. ✅ Verify valuation appears with AI reasoning

---

## 🆘 Troubleshooting

**Problem:** No valuation in response
- Check: GEMINI_API_KEY in .env
- Check: Console for errors
- Verify: API key is valid

**Problem:** "method": "fallback"
- API key missing or invalid
- Rate limit reached (unlikely with 60/min)
- Network issue with Google API
- System still works, just uses basic calculation

**Problem:** Install error
- Run: `npm install @google/generative-ai`
- Check: Node version (should be 16+)
- Clear cache: `npm cache clean --force`

---

## 📚 Resources

- [Gemini API Docs](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Get API Key](https://makersuite.google.com/app/apikey)
- [Pricing Info](https://ai.google.dev/pricing)
