import { render, screen, fireEvent } from '@testing-library/react';
import { SortablePage } from './SortablePage';
import React from 'react';

describe('SortablePage', () => {
  const page = { id: '1', name: 'Info' };
  const defaultProps = {
    page,
    activePageId: '1',
    setActivePageId: jest.fn(),
    onOpenMenu: jest.fn(),
    isMenuOpen: false,
    isFirst: true,
    showCopiedTooltip: false,
    isEditing: false,
    editingValue: 'Info',
    setEditingValue: jest.fn(),
    onRenameSave: jest.fn(),
    onSetFirst: jest.fn(),
    onRename: jest.fn(),
    onCopy: jest.fn(),
    onDuplicate: jest.fn(),
    onDelete: jest.fn(),
  };

  it('renders the page name', () => {
    render(<SortablePage {...defaultProps} />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('calls setActivePageId when tab is clicked', () => {
    render(<SortablePage {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.setActivePageId).toHaveBeenCalledWith('1');
  });

  it('shows input when editing', () => {
    render(<SortablePage {...defaultProps} isEditing={true} editingValue="Edit me" />);
    expect(screen.getByDisplayValue('Edit me')).toBeInTheDocument();
  });

  it('calls setEditingValue on input change', () => {
    render(<SortablePage {...defaultProps} isEditing={true} editingValue="Edit me" />);
    fireEvent.change(screen.getByDisplayValue('Edit me'), { target: { value: 'New name' } });
    expect(defaultProps.setEditingValue).toHaveBeenCalledWith('New name');
  });

  it('calls onRenameSave on input blur', () => {
    render(<SortablePage {...defaultProps} isEditing={true} editingValue="Edit me" />);
    fireEvent.blur(screen.getByDisplayValue('Edit me'));
    expect(defaultProps.onRenameSave).toHaveBeenCalledWith('1');
  });

  it('calls onOpenMenu when menu button is clicked', () => {
    render(<SortablePage {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Open page menu'));
    expect(defaultProps.onOpenMenu).toHaveBeenCalledWith('1');
  });

  it('shows copied tooltip when showCopiedTooltip is true', () => {
    render(<SortablePage {...defaultProps} showCopiedTooltip={true} />);
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
}); 