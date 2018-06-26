import { NgModule } from '@angular/core';
import { RecorderService } from './recorder/recorder.service';
import { WorkerService } from './worker/worker.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    RecorderService,
    WorkerService
  ]
})
export class CoreAudioModule { }
