import { render, screen, waitFor } from '@testing-library/react';
import { alarmsAPI, usersAPI, authAPI } from '../shared/api/apiClient';
import { server } from '../mock_server/server';
import { http, HttpResponse } from 'msw';

describe('API Integration Tests', () => {
  describe('Alarms API', () => {
    test('should fetch all alarms', async () => {
      const response = await alarmsAPI.getAll();
      
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBeGreaterThan(0);
    });

    test('should fetch alarm by ID', async () => {
      const response = await alarmsAPI.getById(1);
      
      expect(response.data.success).toBe(true);
      expect(response.data.data.id).toBe(1);
    });

    test('should handle alarm not found', async () => {
      try {
        await alarmsAPI.getById(999);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

    test('should create a new alarm', async () => {
      const newAlarm = {
        name: 'Test Alarm',
        status: 'active',
        severity: 'high',
        description: 'Test description',
      };

      const response = await alarmsAPI.create(newAlarm);
      
      expect(response.data.success).toBe(true);
      expect(response.data.data.name).toBe('Test Alarm');
      expect(response.status).toBe(201);
    });
  });

  describe('Users API', () => {
    test('should fetch all users', async () => {
      const response = await usersAPI.getAll();
      
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('should create a new user', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        role: 'operator',
      };

      const response = await usersAPI.create(newUser);
      
      expect(response.data.success).toBe(true);
      expect(response.data.data.username).toBe('testuser');
      expect(response.status).toBe(201);
    });

    test('should update an existing user', async () => {
      const updatedData = {
        email: 'updated@example.com',
        role: 'admin',
      };

      const response = await usersAPI.update(1, updatedData);
      
      expect(response.data.success).toBe(true);
      expect(response.data.data.email).toBe('updated@example.com');
    });
  });

  describe('Auth API', () => {
    test('should login successfully', async () => {
      const response = await authAPI.login('admin', 'password');
      
      expect(response.data.success).toBe(true);
      expect(response.data.data.token).toBeDefined();
      expect(response.data.data.user).toBeDefined();
    });

    test('should handle invalid credentials', async () => {
      try {
        await authAPI.login('', '');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should logout successfully', async () => {
      const response = await authAPI.logout();
      
      expect(response.data.success).toBe(true);
    });
  });

  describe('Custom Handler Override', () => {
    test('should override handler for specific test', async () => {
      // Override the handler just for this test
      server.use(
        http.get('/api/alarms', () => {
          return HttpResponse.json(
            {
              success: true,
              data: [
                {
                  id: 100,
                  name: 'Custom Test Alarm',
                  status: 'active',
                  severity: 'critical',
                },
              ],
            },
            { status: 200 }
          );
        })
      );

      const response = await alarmsAPI.getAll();
      
      expect(response.data.data[0].id).toBe(100);
      expect(response.data.data[0].name).toBe('Custom Test Alarm');
    });
  });
});
