export type InputValidator<T extends unknown[] = unknown[]> = (
  ...args: T
) => (value: string) => boolean;
