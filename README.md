# Fillout Assessment

This project is a Next.js app featuring a highly interactive, accessible, and modular page navigation component library for form builders, inspired by Fillout's UI. The library is built with React, TypeScript, Tailwind CSS, and @dnd-kit for drag-and-drop.

---

## Project Structure

```
fillout-assessment/
├── src/
│   ├── app/                # Next.js app code
│   │   ├── PageNavigation/
│   │   │   ├── PageNavigation.tsx
│   │   │   ├── PageNavigation.stories.tsx
│   │   │   ├── PageNavigation.test.tsx
│   │   ├── SortablePage/
│   │   │   ├── SortablePage.tsx
│   │   │   ├── SortablePage.stories.tsx
│   │   │   ├── SortablePage.test.tsx
│   │   ├── ContextMenu/
│   │   │   ├── ContextMenu.tsx
│   │   │   ├── ContextMenu.stories.tsx
│   │   │   ├── ContextMenu.test.tsx
│   ├── types/
│   │   └── types.ts
├── public/
├── .storybook/
├── package.json
├── tsconfig.json
└── ...etc
```

---

## Features
- **Tabs for form pages** with drag-and-drop reordering (@dnd-kit)
- **Add page** button between tabs and at the end
- **Context menu** per tab (rename, duplicate, delete, set as first, copy name)
- **Accessible**: ARIA roles, keyboard navigation, focus management
- **Modern UI**: Tailwind CSS, custom colors, tooltips, and polished design
- **All state in memory**
- **Storybook** documentation and **Vitest** test suite

---

## Usage Example

```tsx
import React, { useState } from 'react';
import { PageNavigation } from '@/components/PageNavigation/PageNavigation';
import { Page } from '@/types/types';

const defaultPages: Page[] = [
  { id: '1', name: 'Info' },
  { id: '2', name: 'Details' },
  { id: '3', name: 'Other' },
];

export default function MyFormBuilder() {
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [activePageId, setActivePageId] = useState(pages[0].id);

  return (
    <PageNavigation
      pages={pages}
      activePageId={activePageId}
      setPages={setPages}
      setActivePageId={setActivePageId}
    />
  );
}
```

---

## Types

```
export interface Page {
  id: string;
  name: string;
}

export interface PageNavigationProps {
  pages: Page[];
  activePageId: string;
  setPages: (pages: Page[]) => void;
  setActivePageId: (id: string) => void;
}
```

---

## Development

- **Run the app:**
  ```bash
  npm run dev
  ```
- **Run Storybook:**
  ```bash
  npm run storybook
  ```
- **Run tests:**
  ```bash
  npm test
  ```

---

## Testing & Documentation
- All components are covered by unit tests (Vitest + Testing Library)
- Storybook stories document all features and states

---

## Dependencies
- React 19+
- Next.js 15+
- Tailwind CSS 4+
- @dnd-kit/core, @dnd-kit/sortable
- @heroicons/react
- Storybook, Vitest, Testing Library

---

## License
MIT (or your preferred license)
