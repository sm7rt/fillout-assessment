import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu } from './ContextMenu';
import React from 'react';

describe('ContextMenu', () => {
  const defaultProps = {
    isOpen: true,
    position: { top: 10, left: 10 },
    isFirst: false,
    onSetFirst: jest.fn(),
    onRename: jest.fn(),
    onCopy: jest.fn(),
    onDuplicate: jest.fn(),
    onDelete: jest.fn(),
  };

  it('renders when open and position is set', () => {
    render(<ContextMenu {...defaultProps} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Set as first page')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('does not render when not open', () => {
    render(<ContextMenu {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('does not render when position is null', () => {
    render(<ContextMenu {...defaultProps} position={null} />);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('calls onSetFirst when Set as first page is clicked', () => {
    render(<ContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Set as first page'));
    expect(defaultProps.onSetFirst).toHaveBeenCalled();
  });

  it('calls onRename when Rename is clicked', () => {
    render(<ContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Rename'));
    expect(defaultProps.onRename).toHaveBeenCalled();
  });

  it('calls onCopy when Copy is clicked', () => {
    render(<ContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Copy'));
    expect(defaultProps.onCopy).toHaveBeenCalled();
  });

  it('calls onDuplicate when Duplicate is clicked', () => {
    render(<ContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Duplicate'));
    expect(defaultProps.onDuplicate).toHaveBeenCalled();
  });

  it('calls onDelete when Delete is clicked', () => {
    render(<ContextMenu {...defaultProps} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  it('shows solid flag icon when isFirst is true', () => {
    render(<ContextMenu {...defaultProps} isFirst={true} />);
    expect(screen.getByText('Set as first page').previousSibling).toBeTruthy();
  });
}); 