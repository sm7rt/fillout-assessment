import { render, screen, fireEvent } from '@testing-library/react';
import { PageNavigation } from './PageNavigation';
import React from 'react';
import { vi } from 'vitest';

describe('PageNavigation', () => {
  const pages = [
    { id: '1', name: 'Info' },
    { id: '2', name: 'Details' },
    { id: '3', name: 'Other' },
  ];

  it('renders all tabs', () => {
    render(
      <PageNavigation
        pages={pages}
        activePageId="1"
        setPages={() => {}}
        setActivePageId={() => {}}
      />
    );
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('calls setActivePageId when tab is clicked', () => {
    const setActivePageId = vi.fn();
    render(
      <PageNavigation
        pages={pages}
        activePageId="1"
        setPages={() => {}}
        setActivePageId={setActivePageId}
      />
    );
    fireEvent.click(screen.getByText('Details'));
    expect(setActivePageId).toHaveBeenCalledWith('2');
  });

  it('shows add page button', () => {
    render(
      <PageNavigation
        pages={pages}
        activePageId="1"
        setPages={() => {}}
        setActivePageId={() => {}}
      />
    );
    expect(screen.getByLabelText('Add page')).toBeInTheDocument();
  });
}); 