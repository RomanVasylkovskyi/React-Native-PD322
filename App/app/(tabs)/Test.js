import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';
import * as Notifications from 'expo-notifications';

jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
}));

describe('To-Do List App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('має заголовок з текстом 📋 To-Do List', () => {
    const { getByText } = render(<App />);
    expect(getByText('📋 To-Do List')).toBeTruthy();
  });

  it('має поле вводу для назви завдання', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Назва завдання')).toBeTruthy();
  });

  it('має поле вводу для дати дедлайну', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Дата')).toBeTruthy();
  });

  it('додає нове завдання до списку', async () => {
    Notifications.scheduleNotificationAsync.mockResolvedValue('notification-id');

    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Назва завдання'), 'Test Task');
    fireEvent.changeText(getByPlaceholderText('Дата'), '2025-04-20');
    fireEvent.press(getByText('Додати завдання'));

    const task = await findByText(/Test Task/i);
    expect(task).toBeTruthy();
  });

  it('створює нотифікацію при додаванні завдання', async () => {
    Notifications.scheduleNotificationAsync.mockResolvedValue('mock-notification-id');

    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Назва завдання'), 'Notify Task');
    fireEvent.changeText(getByPlaceholderText('Дата'), '2025-04-21');
    fireEvent.press(getByText('Додати завдання'));

    await waitFor(() => {
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            title: expect.any(String),
            body: expect.stringContaining('Notify Task'),
          }),
          trigger: expect.any(Object),
        })
      );
    });
  });

  it('відміняє нотифікацію при видаленні завдання', async () => {
    Notifications.scheduleNotificationAsync.mockResolvedValue('mock-notification-id');

    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Назва завдання'), 'Delete Me');
    fireEvent.changeText(getByPlaceholderText('Дата'), '2025-04-22');
    fireEvent.press(getByText('Додати завдання'));

    const task = await queryByText(/Delete Me/i);
    expect(task).toBeTruthy();

    fireEvent.press(getByText('🗑️ Видалити'));

    await waitFor(() => {
      expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledTimes(1);
      expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith('mock-notification-id');
    });
  });
});
