import { Injectable } from '@angular/core';
import { WebWorker } from './web-worker';

@Injectable()
export class WorkerService {

  constructor() { }

  public execute(func: Function): WebWorker {
    const blobContent = [func.toString(), `;this.onmessage = function(e) {${func.name}(e.data);}`];
    const blob = new Blob(blobContent, { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);

    return new WebWorker(url);
  }

}
