'use client';

import { useState } from 'react';
import { PageNavigation } from '../components';
import { Page } from '@/types/types';

const initialPages: Page[] = [
  { id: '1', name: 'Info' },
  { id: '2', name: 'Details' },
  { id: '3', name: 'Other' },
  { id: '4', name: 'Ending' },
];

export default function Home() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePageId, setActivePageId] = useState(pages[0].id);

  const handlePagesChange = (newPages: any[], newActiveId?: string) => {
    setPages(newPages);
    if (newActiveId) setActivePageId(newActiveId);
    else if (!newPages.find((p) => p.id === activePageId) && newPages.length > 0) setActivePageId(newPages[0].id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-shrink-0">
        <PageNavigation
          pages={pages}
          activePageId={activePageId}
          setPages={setPages}
          setActivePageId={setActivePageId}
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-white rounded shadow mt-8 mx-8 p-8 min-h-[400px]">
        {pages.length > 0 ? (
          <div className="text-3xl font-semibold text-gray-700">{pages.find((p) => p.id === activePageId)?.name} Page Content</div>
        ) : (
          <div className="text-xl text-gray-400">No pages. Add a page to get started.</div>
        )}
        </div>
    </div>
  );
}
