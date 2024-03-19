import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

describe('Responsive Menu Rendering', () => {
  test('renders mobile menu on mobile screens', () => {
    act(() => {
      global.innerWidth = 480;
      global.dispatchEvent(new Event('resize'));
    });
    render(<App />);

    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument(); // Mobile menu should be in the document

    const desktopMenu = screen.queryByTestId('desktop-menu');
    expect(desktopMenu).toBeNull(); // Desktop menu should not be in the document
  });

  test('renders desktop menu on desktop screens', () => {
    act(() => {
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));
    });
    render(<App />);

    const desktopMenu = screen.getByTestId('desktop-menu');
    expect(desktopMenu).toBeInTheDocument(); // Desktop menu should be in the document

    const mobileMenu = screen.queryByTestId('mobile-menu');
    expect(mobileMenu).toBeNull(); // Mobile menu should not be in the document
  });
});

describe('Only renders app content if logged in', () => { 
  test('renders app content when logged in', () => {
    render(<App isLoggedIn={true} />);
    const appContent = screen.getByTestId('app-content');
    expect(appContent).toBeInTheDocument(); // App content should be in the document
  });

  test('does not render app content when not logged in', () => {
    render(<App isLoggedIn={false} />);
    const appContent = screen.queryByTestId('app-content');
    expect(appContent).toBeNull(); // App content should not be in the document
  });
});
