import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { PageNavigation } from './PageNavigation';
import { Page } from '../../types/types';

const meta: Meta<typeof PageNavigation> = {
  title: 'Components/PageNavigation',
  component: PageNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A drag-and-drop, accessible, and fully-featured page/tab navigation component for forms and builders.'
      }
    }
  },
  argTypes: {
    pages: { control: 'object' },
    activePageId: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof PageNavigation>;

const defaultPages: Page[] = [
  { id: '1', name: 'Info' },
  { id: '2', name: 'Details' },
  { id: '3', name: 'Other' },
  { id: '4', name: 'Ending' },
];

export const Default: Story = {
  render: (args) => {
    const [pages, setPages] = useState<Page[]>(args.pages ?? defaultPages);
    const [activePageId, setActivePageId] = useState(args.activePageId ?? pages[0].id);
    return (
      <div className="p-8 bg-gray-50 min-h-[400px]">
        <PageNavigation
          pages={pages}
          activePageId={activePageId}
          setPages={setPages}
          setActivePageId={setActivePageId}
        />
      </div>
    );
  },
  args: {
    pages: defaultPages,
    activePageId: '1',
  },
}; 