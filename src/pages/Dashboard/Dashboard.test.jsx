import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard/Dashboard'; 

test('loads and displays the dashboard with all components', async () => {
  render(<Dashboard />);

  // Wait for the current usage summary component to be loaded and check for presence
  await waitFor(() => {
    expect(screen.getByTestId('current-usage-component')).toBeInTheDocument();
  });

  // Wait for the carbon intensity summary component to be loaded and check for presence
  await waitFor(() => {
    expect(screen.getByTestId('carbon-intensity-component')).toBeInTheDocument();
  });

  // Wait for the carbon forecast summary component to be loaded and check for presence
  await waitFor(() => {
    expect(screen.getByTestId('carbon-intensity-forecast-component')).toBeInTheDocument();
  });

  // Wait for the carbon scores component to be loaded and check for presence
  await waitFor(() => {
    expect(screen.getByTestId('carbon-scores-component')).toBeInTheDocument();
  });
  
});
