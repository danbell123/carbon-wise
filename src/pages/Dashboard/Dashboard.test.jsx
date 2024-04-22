import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import fetchUserData from '../../services/getUserDetails';
import { getAuth } from 'firebase/auth';

// Mocking modules
jest.mock('../../services/getUserDetails');
jest.mock('firebase/auth');

describe('Dashboard Component', () => {
  const mockUser = {
    uid: '123',
    firstName: 'John'
  };

  beforeEach(() => {
    // Mock the currentUser and fetchUserData behavior
    const auth = { currentUser: mockUser };
    getAuth.mockReturnValue(auth);
    fetchUserData.mockResolvedValue(mockUser);
  });

  test('renders greeting with user first name after fetching data', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(`Good Morning ${mockUser.firstName}!`)).toBeInTheDocument();
    });
  });

  test('renders appropriate greeting based on time of day', () => {
    // Overriding Date object to control time within the test
    jest.useFakeTimers().setSystemTime(new Date('2023-04-14T19:00:00Z'));
    render(<Dashboard />);
    expect(screen.getByText(`Good Evening ${mockUser.firstName}!`)).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('handles case where user is not authenticated', () => {
    // Adjusting the mock to simulate no logged-in user
    getAuth.mockReturnValue({ currentUser: null });
    render(<Dashboard />);
    expect(screen.getByText('Good Morning !')).toBeInTheDocument(); // Fallback or empty greeting
  });

  // Additional tests to cover errors during data fetching
  test('handles errors during user data fetching gracefully', async () => {
    fetchUserData.mockRejectedValue(new Error('Failed to fetch user data'));
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Good Morning !')).toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith('Failed to fetch user data:', expect.any(Error));
    });
  });
});
