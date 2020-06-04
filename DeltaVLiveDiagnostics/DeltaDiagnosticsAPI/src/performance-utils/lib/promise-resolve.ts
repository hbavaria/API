const Window = require("window");

class ResolveablePromiseWrapper<T> {
  private _resolve: (v: T) => void;
  private _reject: (reason: any) => void;
  private _complete: boolean = false;
  private _promise: Promise<T>;
  private _promiseTimeoutId: number = 0;
  private _window = null;

  // 2 min timeout by default
  constructor(
    promiseName: string,
    promiseTimeoutMs: number = 2 * 60 * 1000,
    promiseTimeoutMessage: string = `Promise ${promiseName} Timeout Error (${promiseTimeoutMs}Ms)`
  ) {
    this._window = new Window();
    this._promise = new Promise<T>((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });

    if (promiseTimeoutMs > 0) {
      this._promiseTimeoutId = this._window.setTimeout(() => {
        this._promiseTimeoutId = 0;
        this._reject(new Error(promiseTimeoutMessage));
      }, promiseTimeoutMs);
    }
  }

  get promise(): Promise<T> {
    return this._promise;
  }

  private clearTimeout(): void {
    if (this._promiseTimeoutId) {
      this._window.clearTimeout(this._promiseTimeoutId);
      this._promiseTimeoutId = 0;
    }
  }

  // using fat arrow ensuring that 'this' is lexical scoped
  resolve = (v: T) => {
    this.clearTimeout();
    this._complete = true;
    this._resolve(v);
  };

  reject = (reason: any) => {
    this.clearTimeout();
    this._complete = true;
    this._reject(reason);
  };

  get isComplete(): boolean {
    return this._complete;
  }
}

export { ResolveablePromiseWrapper as default, ResolveablePromiseWrapper };
