export interface alert {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  title: string;
  description: string;
}
