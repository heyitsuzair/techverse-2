# Gemini AI Book Valuation Setup

This project uses Google's Gemini AI for intelligent book valuation in the exchange system.

## Prerequisites

1. **Install the package:**
   ```bash
   npm install @google/generative-ai
   ```

2. **Get a Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

## Environment Variable

Add the following to your `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Example .env:
```env
# Database
DATABASE_URL="postgresql://..."

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini AI (NEW)
GEMINI_API_KEY=AIzaSy...

# Other variables...
```

## How It Works

### AI-Powered Valuation

When a book is requested via `/api/books/:id`, the system:

1. **Collects Data:**
   - Book details (title, author, genre, condition, ISBN, year)
   - Platform metrics (demand score, rarity score, exchange requests)

2. **Sends to Gemini AI:**
   - Comprehensive prompt with valuation guidelines
   - Considers: condition, demand, rarity, genre popularity, author reputation, collectibility

3. **Returns Valuation:**
   - Point value: 10-500 points
   - AI reasoning: 2-3 sentence explanation of the valuation

4. **Fallback System:**
   - If Gemini API is unavailable or key is missing
   - Uses basic algorithm: Base × Condition × Demand
   - Ensures system always works

### Response Format

```json
{
  "success": true,
  "book": {
    "id": "...",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "condition": "excellent",
    // ... other book fields
  },
  "valuation": {
    "bookId": "...",
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

## API Endpoint

### GET /api/books/:id

**Response includes:**
- `book` - Full book details
- `valuation` - AI-powered valuation breakdown
  - `finalValue` - Point cost (10-500)
  - `aiReasoning` - AI's explanation
  - `method` - "gemini-ai" or "fallback"
  - `breakdown` - Detailed factor analysis

## Testing

### Test with API Key:
```bash
curl -X GET http://localhost:3000/api/books/{book-id}
```

### Test without API Key (Fallback):
```bash
# Temporarily remove GEMINI_API_KEY from .env
curl -X GET http://localhost:3000/api/books/{book-id}
# Should still work with fallback calculation
```

## Cost Considerations

### Gemini API Pricing (as of 2024):
- **Free Tier:** 60 requests per minute
- **Rate Limits:** Generous for most applications
- **Cost per request:** Free for Gemini Pro up to quota

### Optimization:
- Valuation is calculated on-demand
- Results can be cached if needed
- Fallback ensures service continuity

## Error Handling

The system gracefully handles:
- ❌ Missing API key → Uses fallback calculation
- ❌ API rate limit → Uses fallback calculation
- ❌ Invalid response → Uses fallback calculation
- ❌ Network error → Uses fallback calculation

**Your exchange system always works, even if Gemini is down!**

## Security Notes

⚠️ **Never commit your API key to version control**

- Keep `.env` in `.gitignore`
- Use environment variables in production
- Rotate keys if exposed
- Monitor API usage in [Google AI Studio](https://makersuite.google.com/)

## Production Deployment

### Vercel:
1. Go to Project Settings → Environment Variables
2. Add: `GEMINI_API_KEY` = `your_key`
3. Redeploy

### Other Platforms:
Set environment variable according to platform documentation.

## Files Modified

1. **src/utils/bookValuation.js**
   - Integrated Gemini AI for valuation
   - Added `getGeminiValuation()` function
   - Added fallback calculation
   - Updated `getBookValueBreakdown()` with AI reasoning

2. **src/app/api/books/[id]/route.js**
   - Added valuation to GET response
   - Gracefully handles valuation errors

3. **package.json** (run install command)
   - Added `@google/generative-ai` dependency

## Next Steps

1. ✅ Install package: `npm install @google/generative-ai`
2. ✅ Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. ✅ Add `GEMINI_API_KEY` to `.env`
4. ✅ Test endpoint: `GET /api/books/:id`
5. ✅ Verify valuation appears in response

## Support

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [API Reference](https://ai.google.dev/api)
