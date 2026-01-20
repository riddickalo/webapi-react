import { http, HttpResponse } from 'msw';
import { mockAlarms } from './data/alarms';
import { mockUsers } from './data/users';
import { mockNCStatus } from './data/nc';
// import { mockReports } from './data/reports';
import { mockSettings } from './data/settings';

// API Base URL - will be set based on environment
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Define handlers
export const handlers = [
  // Alarms endpoints
  http.get(`${API_BASE}/api/alarm/history`, () => {
    return HttpResponse.json(
      mockAlarms, { status: 200 });
  }),

  http.post(`${API_BASE}/api/alarm`, async ({ request }) => {
    const body = await request.json();
    const newAlarm = {
      alarm_sn: (parseInt(mockAlarms[mockAlarms.length - 1].alarm_sn) + 1).toString(),
      ...body,
      alarm_timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    mockAlarms.push(newAlarm);
    return HttpResponse.json(
      { success: true, data: newAlarm },
      { status: 201 }
    );
  }),

  // Users endpoints
  http.get(`${API_BASE}/api/users`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: mockUsers,
        total: mockUsers.length,
      },
      { status: 200 }
    );
  }),

  http.get(`${API_BASE}/auth/user`, ({ params }) => {
    return HttpResponse.json(
      mockUsers,
      { status: 200 }
    );
  }),

  // NC Status endpoint
  http.get(`${API_BASE}/api/status`, () => {
    return HttpResponse.json(mockNCStatus, { status: 200 });
  }),

  // Settings endpoints
  http.get(`${API_BASE}/api/settings`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: mockSettings,
      },
      { status: 200 }
    );
  }),

  http.put(`${API_BASE}/api/settings`, async ({ request }) => {
    const body = await request.json();
    Object.assign(mockSettings, body);
    return HttpResponse.json(
      {
        success: true,
        data: mockSettings,
        message: 'Settings updated',
      },
      { status: 200 }
    );
  }),

  // Health check endpoint
  http.get(`${API_BASE}/api/health`, () => {
    return HttpResponse.json(
      {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '2.0.1',
      },
      { status: 200 }
    );
  }),

  // Login endpoint - Simulate backend login logic
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = await request.json();
    const user_name = body.user_name;
    const user_password = body.user_password;

    // 查找用户
    const user = mockUsers.find((u) => u.user_name === user_name);

    if (!user) {
      // 用户不存在
      return HttpResponse.json(
        { error: 'ERROR: not an existed user.' },
        { status: 401 }
      );
    }

    if (!user.enable) {
      // 用户被禁用
      return HttpResponse.json(
        { error: 'ERROR: user is disabled.' },
        { status: 403 }
      );
    }

    // Mock password validation (in production, use bcrypt comparison)
    if (user_password !== user.user_password) {
      return HttpResponse.json(
        { error: 'ERROR: password is not correct.' },
        { status: 401 }
      );
    }

    // Login successful, generate token and update last_login
    const token = 'Bearer mock-jwt-token-' + Date.now();
    user.last_login = new Date().toISOString();

    return HttpResponse.json(
      {
        token: token,
        user_info: {
          user_name: user.user_name,
          permissions: user.permissions,
        },
      },
      { status: 200 }
    );
  }),

  // Logout endpoint
  http.post(`${API_BASE}/auth/logout`, () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );
  }),
];
