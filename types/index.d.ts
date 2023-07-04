declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
  
  declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

declare type RefType<T> = T | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type EmitType = (event: string, ...args: any[]) => void;

