declare module '../../backend/src/db.mjs' {
  export function query(text: string, params?: any[]): Promise<any>;
}