import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import Widget from '../components/Widget';
import { WidgetOptions } from '../types';

describe('Widget Component', () => {
  const mockOptions: WidgetOptions = {
    target: document.createElement('div'),
    content: 'Тестовый контент',
    title: 'Тестовый заголовок'
  };
  
  test('отображает заголовок и контент', () => {
    const { getByText } = render(<Widget options={mockOptions} />);
    
    expect(getByText('Тестовый заголовок')).toBeInTheDocument();
    expect(getByText('Тестовый контент')).toBeInTheDocument();
  });
  
  test('увеличивает счетчик при нажатии на кнопку', () => {
    const { getByText, queryByText } = render(<Widget options={mockOptions} />);
    
    // Изначально счетчик не отображается
    expect(queryByText(/Поделились: \d+/)).toBeNull();
    
    // Нажимаем на кнопку "Поделиться"
    fireEvent.click(getByText('Поделиться'));
    
    // Счетчик должен появиться и показывать 1
    expect(getByText('Поделились: 1')).toBeInTheDocument();
    
    // Нажимаем еще раз
    fireEvent.click(getByText('Поделиться'));
    
    // Счетчик должен показывать 2
    expect(getByText('Поделились: 2')).toBeInTheDocument();
  });
  
  test('вызывает колбэк onAction при клике', () => {
    const onAction = jest.fn();
    const optionsWithCallback = { ...mockOptions, onAction };
    
    const { getByText } = render(<Widget options={optionsWithCallback} />);
    
    // Нажимаем на кнопку
    fireEvent.click(getByText('Поделиться'));
    
    // Проверяем, что колбэк был вызван с правильными аргументами
    expect(onAction).toHaveBeenCalledWith('share', {
      content: 'Тестовый контент',
      shareCount: 1
    });
  });
}); 