export interface Menu {
  id: number;
  name: string;
  url: string;
  c8n: Menu[];
  isExposed?: boolean;
  hasChildren?: boolean;
  sortOrder?: number;
}
