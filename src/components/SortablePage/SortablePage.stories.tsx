import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { SortablePage } from './SortablePage';
import { Page } from '../../types/types';

const meta: Meta<typeof SortablePage> = {
  title: 'Components/SortablePage',
  component: SortablePage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A single draggable, editable, and accessible page/tab for use in PageNavigation.'
      }
    }
  },
  argTypes: {
    activePageId: { control: 'text' },
    isMenuOpen: { control: 'boolean' },
    isEditing: { control: 'boolean' },
    showCopiedTooltip: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof SortablePage>;

const page: Page = { id: '1', name: 'Info' };

export const Default: Story = {
  render: (args) => {
    const [editingValue, setEditingValue] = useState(page.name);
    return (
      <div className="p-8 bg-gray-50 min-h-[200px] flex items-center">
        <SortablePage
          {...args}
          page={page}
          setActivePageId={() => {}}
          onOpenMenu={() => {}}
          onSetFirst={() => {}}
          onRename={() => {}}
          onCopy={() => {}}
          onDuplicate={() => {}}
          onDelete={() => {}}
          editingValue={editingValue}
          setEditingValue={setEditingValue}
          onRenameSave={() => {}}
        />
      </div>
    );
  },
  args: {
    activePageId: '1',
    isMenuOpen: false,
    isFirst: true,
    isEditing: false,
    showCopiedTooltip: false,
  },
};

export const Editing: Story = {
  ...Default,
  args: {
    ...Default.args,
    isEditing: true,
  },
};

export const WithContextMenu: Story = {
  ...Default,
  args: {
    ...Default.args,
    isMenuOpen: true,
  },
}; 