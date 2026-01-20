# MSW Setup Guide

This project uses **Mock Service Worker (MSW)** to provide mock APIs for local development and Vercel preview deployments.

## Overview

MSW intercepts HTTP requests and returns mock responses without hitting a real backend. This is useful for:

- 🚀 Local development without backend setup
- 🧪 Testing with predictable data
- 📱 Vercel preview deployments
- 🔄 Cross-platform development

## Project Structure

```
src/
├── mock_server/
│   ├── handlers.js      # API endpoint definitions and mock data
│   ├── browser.js       # Browser setup (for development)
│   └── server.js        # Node setup (for testing)
├── shared/
│   └── api/
│       └── apiClient.js # Axios client with API methods
└── index.js            # MSW initialization
```

## Available API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/change-password` - Change password

### Alarms

- `GET /api/alarms` - Get all alarms
- `GET /api/alarms/:id` - Get alarm by ID
- `POST /api/alarms` - Create new alarm

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user

### NC Files

- `GET /api/nc-files` - Get all NC files
- `GET /api/nc-files/:id` - Get NC file by ID
- `POST /api/nc-files` - Upload NC file
- `DELETE /api/nc-files/:id` - Delete NC file

### Reports

- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get report by ID
- `POST /api/reports/generate` - Generate new report

### Settings

- `GET /api/settings` - Get system settings
- `PUT /api/settings` - Update settings

### Health

- `GET /api/health` - Health check endpoint

## Using the API Client

The project provides a pre-configured Axios client in [shared/api/apiClient.js](../../shared/api/apiClient.js):

```javascript
import {
  alarmsAPI,
  usersAPI,
  ncFilesAPI,
  reportsAPI,
  authAPI,
} from "./shared/api/apiClient";

// Get all alarms
const response = await alarmsAPI.getAll();
console.log(response.data);

// Create user
const newUser = await usersAPI.create({
  username: "newuser",
  email: "user@example.com",
  role: "operator",
});

// Login
const loginResult = await authAPI.login("admin", "password");
const token = loginResult.data.data.token;
localStorage.setItem("token", token);
```

## Environment Variables

The project uses environment files to control MSW behavior:

### Development (`.env.development`)

```
REACT_APP_USE_MSW=true
REACT_APP_API_URL=http://localhost:3000/api
```

MSW is **enabled** - all requests are mocked.

### Production (`.env.production`)

```
REACT_APP_USE_MSW=false
REACT_APP_API_URL=https://api.example.com
```

MSW is **disabled** - requests go to real API.

### Vercel Preview (`.env.vercel`)

```
REACT_APP_USE_MSW=true
REACT_APP_API_URL=http://localhost:3000/api
```

MSW is **enabled** - useful for demo deployments.

## Running the App

### Local Development

```bash
npm start
```

- MSW is automatically enabled
- Access at `http://localhost:3000`
- All API requests are mocked

### Testing

```bash
npm test
```

- MSW server is set up in `setupTests.js`
- All tests use mock API responses

### Production Build

```bash
npm run build
```

- MSW is disabled
- Build artifact doesn't include mock service worker

## Customizing Mock Data

Edit [src/mock_server/handlers.js](handlers.js) to:

1. Modify mock data in the `mock*` variables at the top
2. Add new endpoints with `http.get()`, `http.post()`, etc.
3. Update response data and status codes as needed

Example - Adding a new endpoint:

```javascript
http.get("/api/custom-endpoint", () => {
  return HttpResponse.json(
    {
      success: true,
      data: {
        /* your data */
      },
    },
    { status: 200 },
  );
});
```

## Adding New API Methods

Add new API methods in [shared/api/apiClient.js](../../shared/api/apiClient.js):

```javascript
export const newFeatureAPI = {
  getAll: () => apiClient.get("/new-feature"),
  getById: (id) => apiClient.get(`/new-feature/${id}`),
  create: (data) => apiClient.post("/new-feature", data),
  update: (id, data) => apiClient.put(`/new-feature/${id}`, data),
  delete: (id) => apiClient.delete(`/new-feature/${id}`),
};
```

Then use it in your components:

```javascript
import { newFeatureAPI } from "./shared/api/apiClient";

const data = await newFeatureAPI.getAll();
```

## Authentication Flow

1. User submits login credentials to `/api/auth/login`
2. MSW returns a mock JWT token
3. Token is stored in `localStorage`
4. Axios interceptor automatically adds token to all subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

## Troubleshooting

### MSW not intercepting requests

- Check that `NODE_ENV === 'development'` or `REACT_APP_USE_MSW === 'true'`
- Open DevTools Network tab - requests should show as coming from MSW
- Browser console should show MSW enabled message

### 404 errors on API calls

- Verify endpoint is defined in [handlers.js](handlers.js)
- Check the exact URL format matches
- Use browser DevTools to see actual request URL

### Testing with MSW

- MSW server is auto-started in `setupTests.js`
- Use `server.use()` to override handlers per test:
  ```javascript
  test("custom test", () => {
    server.use(http.get("/api/alarms", () => HttpResponse.json({ data: [] })));
  });
  ```

## Vercel Deployment

For Vercel demo with MSW enabled:

1. Set environment variable in Vercel dashboard:

   ```
   REACT_APP_USE_MSW=true
   ```

2. Build and deploy normally:
   ```bash
   npm run build
   ```

The preview will use MSW for all API calls, allowing testing without backend.

## References

- [MSW Documentation](https://mswjs.io/)
- [MSW Installation Guide](https://mswjs.io/docs/getting-started)
- [HTTP Handlers](https://mswjs.io/docs/api/http)
- [Network Behavior Override](https://mswjs.io/docs/api/setup-server)
