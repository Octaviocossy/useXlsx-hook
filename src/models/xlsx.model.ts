type Extension = 'jpeg' | 'png' | 'gif';

export enum Status {
  OK = 'ok',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface Config<T> {
  fileName?: string;
  workSheets: WorkSheet<T>[];
}

interface Position {
  col: number;
  row: number;
}

interface Size {
  width: number;
  height: number;
}

interface Column {
  header: string;
  key: string;
  width: number;
}

interface WorkSheet<T> {
  data: T[];
  name?: string;
  images?: Image[];
  columns: Column[];
  decoration?: boolean;
}

interface Image {
  base64: string;
  extension: Extension;
  position: Position;
  size: Size;
}
