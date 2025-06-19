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