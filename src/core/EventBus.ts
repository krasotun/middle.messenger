type Listener = (...args: unknown[]) => unknown;

export class EventBus {
  protected listeners: Map<string, Listener[]> = new Map();

  on(event: string, callback: Listener): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      this.listeners.set(event, [callback]);
      return;
    }

    listeners.push(callback);
  }

  off(event: string, callback: Listener): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      throw new Error(`Нет события: ${event}`);
    }

    const filteredEvents = listeners.filter((listener: Listener) => listener !== callback);
    this.listeners.set(event, filteredEvents);
  }

  emit(event: string, ...args: unknown[]): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      throw new Error(`Нет события: ${event}`);
    }

    listeners.forEach((listener): void => {
      listener(...args);
    });
  }
}
