import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PageNavigationProps } from '../../types/types';
import { SortablePage } from '../SortablePage/SortablePage';

export const PageNavigation: React.FC<PageNavigationProps> = ({ pages, activePageId, setPages, setActivePageId }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [copiedTabId, setCopiedTabId] = useState<string | null>(null);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabValue, setEditingTabValue] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  let pageIdCounter = Math.max(0, ...pages.map((p) => Number(p.id))) + 1;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);
      setPages(arrayMove(pages, oldIndex, newIndex));
    }
  };

  const handleAddPage = (index: number) => {
    const newPage = {
      id: String(pageIdCounter++),
      name: `Page ${pages.length + 1}`,
    };
    const newPages = [...pages];
    newPages.splice(index, 0, newPage);
    setPages(newPages);
    setActivePageId(newPage.id);
  };

  const handleSetFirst = (id: string) => {
    const idx = pages.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const newPages = [...pages];
    const [page] = newPages.splice(idx, 1);
    newPages.unshift(page);
    setPages(newPages);
    setOpenMenuId(null);
  };
  const handleRename = (id: string) => {
    const page = pages.find((p) => p.id === id);
    if (!page) return;
    setEditingTabId(id);
    setEditingTabValue(page.name);
    setOpenMenuId(null);
  };
  const handleRenameSave = (id: string) => {
    if (editingTabValue.trim() && editingTabValue !== pages.find((p) => p.id === id)?.name) {
      setPages(pages.map((p) => (p.id === id ? { ...p, name: editingTabValue.trim() } : p)));
    }
    setEditingTabId(null);
  };
  const handleCopy = (id: string) => {
    const page = pages.find((p) => p.id === id);
    if (!page) return;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(page.name);
    }
    setCopiedTabId(id);
    setTimeout(() => setCopiedTabId((current) => (current === id ? null : current)), 1000);
    setOpenMenuId(null);
  };
  const handleDuplicate = (id: string) => {
    const idx = pages.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const page = pages[idx];
    const newPage = { ...page, id: String(pageIdCounter++), name: `${page.name} (Duplicate)` };
    const newPages = [...pages];
    newPages.splice(idx + 1, 0, newPage);
    setPages(newPages);
    setOpenMenuId(null);
  };
  const handleDelete = (id: string) => {
    const newPages = pages.filter((p) => p.id !== id);
    setPages(newPages);
    setOpenMenuId(null);
    if (activePageId === id && newPages.length > 0) setActivePageId(newPages[0].id);
  };

  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const focusTab = (idx: number) => {
    tabRefs.current[idx]?.focus();
  };
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusTab((idx + 1) % pages.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusTab((idx - 1 + pages.length) % pages.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTab(pages.length - 1);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={pages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
        <div className="flex items-center gap-0 bg-white p-4 rounded shadow overflow-visible" role="tablist" aria-label="Form pages">
          {pages.map((page, idx) => (
            <React.Fragment key={page.id}>
              {/* Gap with add button (not after last tab) */}
              {idx > 0 && (
                <div className="flex items-center justify-center w-12 h-12 group relative" aria-hidden="true">
                  <button
                    type="button"
                    onClick={() => handleAddPage(idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white border-2 border-blue-200 rounded-full w-6 h-6 flex items-center justify-center shadow z-20 hover:bg-blue-50 hover:border-blue-400 focus:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400 text-blue-400 hover:text-blue-600 cursor-pointer"
                    aria-label="Add page"
                    tabIndex={0}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                  </button>
                </div>
              )}
              <SortablePage
                ref={el => { tabRefs.current[idx] = el; }}
                page={page}
                activePageId={activePageId}
                setActivePageId={setActivePageId}
                onOpenMenu={setOpenMenuId}
                isMenuOpen={openMenuId === page.id}
                onSetFirst={() => handleSetFirst(page.id)}
                onRename={() => handleRename(page.id)}
                onCopy={() => handleCopy(page.id)}
                onDuplicate={() => handleDuplicate(page.id)}
                onDelete={() => handleDelete(page.id)}
                isFirst={pages[0].id === page.id}
                showCopiedTooltip={copiedTabId === page.id}
                isEditing={editingTabId === page.id}
                editingValue={editingTabValue}
                setEditingValue={setEditingTabValue}
                onRenameSave={handleRenameSave}
                tabIndex={activePageId === page.id ? 0 : -1}
                role="tab"
                aria-selected={activePageId === page.id}
                aria-controls={`tabpanel-${page.id}`}
                id={`tab-${page.id}`}
                onKeyDown={e => handleTabKeyDown(e, idx)}
              />
            </React.Fragment>
          ))}
          <button
            type="button"
            onClick={() => handleAddPage(pages.length)}
            className="ml-4 px-5 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-700 focus:border-blue-400 flex items-center gap-2 transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400 text-gray-700 font-medium cursor-pointer"
            tabIndex={0}
            aria-label="Add page"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Add page
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
}; 