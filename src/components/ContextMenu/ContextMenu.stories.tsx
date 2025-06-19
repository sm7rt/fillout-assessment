import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A context menu for page actions (rename, duplicate, delete, etc.) with accessibility and keyboard support.'
      }
    }
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    isFirst: { control: 'boolean' },
    position: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen ?? true);
    return (
      <div style={{ minHeight: 400, padding: 40, background: '#f8fafc', position: 'relative' }}>
        <button onClick={() => setOpen(o => !o)} style={{ marginBottom: 16 }}>Toggle Menu</button>
        <ContextMenu
          {...args}
          isOpen={open}
          position={args.position ?? { top: 100, left: 100 }}
          onSetFirst={() => alert('Set as first page')}
          onRename={() => alert('Rename')}
          onCopy={() => alert('Copy')}
          onDuplicate={() => alert('Duplicate')}
          onDelete={() => alert('Delete')}
        />
      </div>
    );
  },
  args: {
    isOpen: true,
    isFirst: false,
    position: { top: 100, left: 100 },
  },
}; 