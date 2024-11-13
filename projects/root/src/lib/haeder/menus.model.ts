export interface Menu {
  id: number;
  name: string;
  url: string;
  c8n: Menu[];
  useRoute?: boolean;
  isExposed?: boolean;
  hasChildren?: boolean;
  sortOrder?: number;
}
