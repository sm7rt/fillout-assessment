import { FlagIcon as FlagIconOutline, PencilSquareIcon, ClipboardIcon, Squares2X2Icon, TrashIcon } from '@heroicons/react/24/outline';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/24/solid';
import React from 'react';

interface ContextMenuProps {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  isFirst: boolean;
  onSetFirst: () => void;
  onRename: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  isFirst,
  onSetFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}) => {
  if (!isOpen || !position) return null;
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-xl w-64 z-[9999] animate-fade-in transition-all duration-200 fixed"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-6 pt-4 pb-2">
        <div className="font-semibold text-lg mb-3 text-black">Settings</div>
        <hr className="border-gray-200 mb-2" />
      </div>
      <div className="px-2 pb-2 flex flex-col gap-0.5">
        <button onClick={onSetFirst} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 focus:bg-gray-100 flex items-center gap-3 transition-colors duration-150 font-medium text-base text-black">
          {isFirst ? (
            <FlagIconSolid className="w-5 h-5 text-blue-500" />
          ) : (
            <FlagIconOutline className="w-5 h-5 text-blue-500" />
          )}
          Set as first page
        </button>
        <button onClick={onRename} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 focus:bg-gray-100 flex items-center gap-3 transition-colors duration-150 font-medium text-base text-black">
          <PencilSquareIcon className="w-5 h-5" />
          Rename
        </button>
        <button onClick={onCopy} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 focus:bg-gray-100 flex items-center gap-3 transition-colors duration-150 font-medium text-base text-black">
          <ClipboardIcon className="w-5 h-5" />
          Copy
        </button>
        <button onClick={onDuplicate} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 focus:bg-gray-100 flex items-center gap-3 transition-colors duration-150 font-medium text-base text-black">
          <Squares2X2Icon className="w-5 h-5" />
          Duplicate
        </button>
        <hr className="my-4 border-gray-200" />
        <button onClick={onDelete} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 focus:bg-red-100 flex items-center gap-3 text-red-500 transition-colors duration-150 font-medium text-base">
          <TrashIcon className="w-5 h-5" />
          Delete
        </button>
      </div>
    </div>
  );
}; 