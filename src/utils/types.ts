import { Database } from "./database.types";

interface Set<T> {
  add(value: T): this;
  clear(): void;
  delete(value: T): boolean;
  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any
  ): void;
  has(value: T): boolean;
  readonly size: number;
}

interface card {
  created_at: string;
  id: number;
  mana_cost: string | null;
  name: string;
  price: string | null;
  set_name: string;
}

export interface alert {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  title: string;
  description: string;
}
export interface OutputProps {
  cards: card[];
  sets: Set<string>;
  mergeCommander: boolean;
  setMergeCommander: Function;
  loading: boolean;
}
