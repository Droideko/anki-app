import React from 'react';

import { render } from '@shared/utils/test-utils';

jest.mock('@/src/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

import { useThemeColor } from '@shared/hooks/useThemeColor';

import { Text } from '../ui/ThemedText';

describe('Компонент Text', () => {
  it('корректно рендерится с цветом из темы', () => {
    (useThemeColor as jest.Mock).mockReturnValue({ text: 'red' });

    const { getByText } = render(<Text>Tested text</Text>);

    const textElement = getByText('Tested text');

    expect(textElement).toBeTruthy();
    expect(textElement).toHaveStyle({ color: 'red' });
  });

  it('применяет дополнительные стили, переданные через props', () => {
    (useThemeColor as jest.Mock).mockReturnValue({ text: 'blue' });

    const { getByText } = render(
      <Text style={{ fontSize: 20 }}>Styled Text</Text>,
    );

    const textElement = getByText('Styled Text');

    expect(textElement).toBeTruthy();
    expect(textElement).toHaveStyle({ color: 'blue', fontSize: 20 });
  });
});
