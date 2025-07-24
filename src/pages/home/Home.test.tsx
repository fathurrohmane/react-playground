import { render, screen } from '@test-utils';
import HomePage from '@/pages/home/Home.page';

describe('Welcome component', () => {
  it('has correct Vite guide link', () => {
    render(<HomePage />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/vite/'
    );
  });
});
