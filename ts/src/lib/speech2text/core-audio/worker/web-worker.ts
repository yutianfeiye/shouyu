export class WebWorker {
  private worker: Worker;
  public url: string;

  constructor(url: string) {
    this.worker = new Worker(url);
    this.url = url;
  }

  onmessage(func: (this: Worker, ev: MessageEvent) => any) {
    this.worker.onmessage = func;

    // release memory
    URL.revokeObjectURL(this.url);
  }

  onerror(func: (this: AbstractWorker, ev: ErrorEvent) => any) {
    this.worker.onerror = func;
  }

  postMessage(message: any, transferlist?: any[]): void {
    this.worker.postMessage(message, transferlist);
  }

  terminate(): void {
    this.worker.terminate();
  }
}
