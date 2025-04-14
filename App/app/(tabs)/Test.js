import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';

describe('To-Do List App', () => {
  it('має заголовок "📋 To-Do List"', () => {
    const { getByText } = render(<App />);
    expect(getByText('📋 To-Do List')).toBeTruthy();
  });

  it('має поле введення назви завдання', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Назва завдання')).toBeTruthy();
  });

  it('має поле введення дати дедлайну для завдання', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Дата')).toBeTruthy();
  });

  it('додає нове завдання до списку після натискання кнопки', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const nameInput = getByPlaceholderText('Назва завдання');
    const dateInput = getByPlaceholderText('Дата');
    const addButton = getByText('Додати завдання');

    fireEvent.changeText(nameInput, 'Моє нове завдання');
    fireEvent.changeText(dateInput, '2025-04-20');

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(queryByText(/Моє нове завдання/i)).toBeTruthy();
    });
  });
});
