import React, { useRef, useEffect, useState, ForwardedRef } from 'react';
import { DocumentIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Page } from '../../types/types';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { createPortal } from 'react-dom';

interface SortablePageProps {
  page: Page;
  activePageId: string;
  setActivePageId: (id: string) => void;
  onOpenMenu: (id: string | null) => void;
  isMenuOpen: boolean;
  isFirst: boolean;
  showCopiedTooltip: boolean;
  isEditing: boolean;
  editingValue: string;
  setEditingValue: (val: string) => void;
  onRenameSave: (id: string) => void;
  onSetFirst: () => void;
  onRename: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  tabIndex?: number;
  role?: string;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const SortablePage = React.forwardRef<HTMLButtonElement, SortablePageProps>(
  ({
    page,
    activePageId,
    setActivePageId,
    onOpenMenu,
    isMenuOpen,
    isFirst,
    showCopiedTooltip,
    isEditing,
    editingValue,
    setEditingValue,
    onRenameSave,
    onSetFirst,
    onRename,
    onCopy,
    onDuplicate,
    onDelete,
    tabIndex,
    role,
    'aria-selected': ariaSelected,
    'aria-controls': ariaControls,
    id,
    onKeyDown,
  }, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: page.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 50 : 'auto',
      opacity: isDragging ? 0.7 : 1,
    };

    const buttonRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipLeft, setTooltipLeft] = useState<string | number>('50%');
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
    const [mounted, setMounted] = useState(false);
    const contextMenuBtnRef = useRef<HTMLSpanElement>(null);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
      if (showCopiedTooltip && tooltipRef.current && buttonRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
        if (left < 8) left = 8;
        if (left + tooltipRect.width > window.innerWidth - 8) {
          left = window.innerWidth - tooltipRect.width - 8;
        }
        setTooltipLeft(left);
      }
    }, [showCopiedTooltip]);

    useEffect(() => {
      if (isEditing && spanRef.current) {
        setInputWidth(spanRef.current.offsetWidth + 8);
      }
    }, [isEditing, editingValue]);

    useEffect(() => {
      if (isMenuOpen && contextMenuBtnRef.current) {
        const rect = contextMenuBtnRef.current.getBoundingClientRect();
        const menuWidth = 256;
        const menuHeight = 360;
        let left = rect.right + window.scrollX - menuWidth;
        let top = rect.bottom + window.scrollY;
        if (left + menuWidth > window.innerWidth) left = window.innerWidth - menuWidth - 8;
        if (left < 8) left = 8;
        if (top + menuHeight > window.innerHeight + window.scrollY) top = window.innerHeight + window.scrollY - menuHeight - 8;
        if (top < 8 + window.scrollY) top = 8 + window.scrollY;
        setMenuPos({ top, left });
      }
    }, [isMenuOpen]);

    useEffect(() => {
      if (!isMenuOpen) return;
      function handleClickOutside(event: MouseEvent) {
        const menuEl = document.querySelector('.bg-white.border.border-gray-200.rounded-2xl.shadow-xl.w-64');
        if (
          menuEl &&
          !menuEl.contains(event.target as Node) &&
          contextMenuBtnRef.current &&
          !contextMenuBtnRef.current.contains(event.target as Node)
        ) {
          onOpenMenu(null);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isMenuOpen, onOpenMenu]);

    if (!mounted) return null;

    return (
      <div ref={setNodeRef} style={style} className="flex items-center relative">
        {showCopiedTooltip && (
          <div
            ref={tooltipRef}
            className="absolute left-0 top-full mt-2 bg-gray-900 text-white text-xs px-3 py-1 rounded shadow z-50 animate-fade-in whitespace-nowrap"
            style={{ left: tooltipLeft, right: 'auto' }}
          >
            Copied
          </div>
        )}
        <button
          ref={ref || buttonRef}
          className={`px-4 py-2 rounded border transition-all duration-200 flex items-center gap-2 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:z-10 shadow-sm relative min-w-[120px] pr-8 border-gray-300`}
          style={
            activePageId === page.id
              ? {
                  color: 'black',
                }
              : isFocused
              ? {
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: 'rgba(47, 114, 226, 1)',
                }
              : {
                  backgroundColor: isHovered
                    ? 'rgba(157, 164, 178, 0.35)'
                    : 'rgba(157, 164, 178, 0.15)',
                  color: 'rgba(140, 147, 161, 1)',
                }
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => setActivePageId(page.id)}
          {...attributes}
          {...listeners}
          tabIndex={tabIndex}
          role={role}
          aria-selected={ariaSelected}
          aria-controls={ariaControls}
          id={id}
          onKeyDown={onKeyDown}
        >
          <DocumentIcon className="w-5 h-5" style={
            activePageId === page.id
              ? { color: 'rgba(245, 157, 14, 1)' }
              : isFocused
              ? { color: 'rgba(245, 157, 14, 1)', borderColor: 'rgba(47, 114, 226, 1)' }
              : { color: 'rgba(140, 147, 161, 1)' }
          }/>
          {isEditing ? (
            <>
              <input
                ref={inputRef}
                className="flex-1 text-left bg-transparent outline-none border-b border-blue-300 px-1 text-sm"
                value={editingValue}
                autoFocus
                onChange={e => setEditingValue(e.target.value)}
                onBlur={() => onRenameSave(page.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') onRenameSave(page.id);
                  if (e.key === 'Escape') setEditingValue(page.name);
                }}
                maxLength={40}
                style={{ width: inputWidth ? `${inputWidth}px` : 'auto', minWidth: '40px' }}
              />
              <span
                ref={spanRef}
                className="invisible absolute whitespace-pre text-sm px-1"
                style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
              >
                {editingValue || ''}
              </span>
            </>
          ) : (
            <span className="flex-1 text-left">{page.name}</span>
          )}
        </button>
        <span className="absolute right-2 top-1/2 -translate-y-1/2" ref={contextMenuBtnRef}>
          <span
            className="opacity-70 hover:opacity-100 transition-opacity duration-200 rounded focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer p-1"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu(page.id);
            }}
            aria-label="Open page menu"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenMenu(page.id);
              }
            }}
          >
            <EllipsisVerticalIcon className="w-5 h-5" style={{ color: 'black' }} />
          </span>
        </span>
        {isMenuOpen && menuPos && typeof window !== 'undefined' && createPortal(
          <ContextMenu
            isOpen={isMenuOpen}
            position={menuPos}
            isFirst={isFirst}
            onSetFirst={onSetFirst}
            onRename={onRename}
            onCopy={onCopy}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onClose={() => onOpenMenu(null)}
          />,
          document.body
        )}
      </div>
    );
  }
); 