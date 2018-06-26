import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WorkerService, } from './../worker/worker.service';
import { WebWorker } from './../worker/web-worker';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecorderService {
  private context: any;
  private jsAudioNode: any;
  private mediaStream: any;
  private audioInput: any;
  private bufferSize = 4096;
  private sampleRate = 44100;
  private recordingLength = 0;
  private blob: Blob;
  private audioChannel: any[] = [];
  private stream: any;
  private recording = new BehaviorSubject<boolean>(false);

  constructor(private workerService: WorkerService) {
    this.onAudioProcess = this.onAudioProcess.bind(this);
  }

  private onAudioProcess(event) {
    if (!this.recording.value) {
      return;
    }
    const audioData = event.inputBuffer.getChannelData(0);
    this.audioChannel.push(new Float32Array(audioData));
    this.recordingLength += this.bufferSize;
  }

  private getAudioBuffer(config, callback) {
    function processAudioBuffer(config, cb) {
      function mergeBuffer(channelBuffer, rLength) {
        const result = new Float64Array(rLength);
        let offset = 0;
        const lng = channelBuffer.length;
        for (let i = 0; i < lng; i++) {
          const buffer = channelBuffer[i];
          result.set(buffer, offset);
          offset += buffer.length;
        }
        return result;
      }

      function writeUTFBytes(view, offset, string) {
        const lng = string.length;
        for (let i = 0; i < lng; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }

      function interleave(inputL, inputR) {
        const compression = 44100 / 11025;    // 计算压缩率
        const length = inputL.length / compression;
        const result = new Float32Array(length);
        let index = 0,
          inputIndex = 0;
        while (index < length) {
            result[index] = inputL[inputIndex];
            inputIndex += compression; // 每次都跳过3个数据
            index++;
        }
        return result;
    }

      function floatTo8BitPCM(output, offset, input) {
        for (let i = 0; i < input.length; i++ , offset++) {
          const s = Math.max(-1, Math.min(1, input[i]));
          let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
          // tslint:disable-next-line:radix
          val = 255 / (65535 / (val + 32768));
          output.setInt8(offset, val, true);
        }
      }

      function floatTo16BitPCM(output, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {   // 因为是int16所以占2个字节,所以偏移量是+2
            const s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }

    // function encodeWAV(config, samples) {
    //     const sampleRate = config.sampleRate;
    //     const dataLength = samples.length;
    //     const buffer = new ArrayBuffer(44 + dataLength * 2);
    //     const view = new DataView(buffer);

    //     const sampleRateTmp = sampleRate; // sampleRate;//写入新的采样率
    //     const sampleBits = 8;
    //     const channelCount = 1;
    //     let offset = 0;  /* 资源交换文件标识符 */
    //     writeUTFBytes(view, offset, 'RIFF'); offset += 4;   /* 下个地址开始到文件尾总字节数,即文件大小-8 */
    //     view.setUint32(offset, 44 + dataLength, true); offset += 4;   /* WAV文件标志 */
    //     writeUTFBytes(view, offset, 'WAVE'); offset += 4;  /* 波形格式标志 */
    //     writeUTFBytes(view, offset, 'fmt '); offset += 4;  /* 过滤字节,一般为 0x10 = 16 */
    //     view.setUint32(offset, 16, true); offset += 4;   /* 格式类别 (PCM形式采样数据) */
    //     view.setUint16(offset, 1, true); offset += 2;   /* 通道数 */
    //     view.setUint16(offset, channelCount, true); offset += 2;  /* 采样率,每秒样本数,表示每个通道的播放速度 */
    //     view.setUint32(offset, sampleRateTmp, true); offset += 4; /* 波形数据传输率 (每秒平均字节数) 通道数×每秒数据位数×每样本数据位/8 */
    //     view.setUint32(offset, sampleRateTmp * 2, true); offset += 4; /* 快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8 */
    //     view.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;  /* 每样本数据位数 */
    //     view.setUint16(offset, sampleBits, true); offset += 2;  /* 数据标识符 */
    //     writeUTFBytes(view, offset, 'data'); offset += 4;
    //     /* 采样数据总数,即数据总大小-44 */
    //     view.setUint32(offset, dataLength, true); offset += 4;
    //     /* 采样数据 */
    //     floatTo16BitPCM(view, 44, samples);
    //     return [buffer, view];
    //   }

      let audioBuffer = config.audioBuffer.slice(0);

      audioBuffer = mergeBuffer(audioBuffer, config.internalInterleavedLength);
      const audioBufferLength = audioBuffer.length;
      // create wav file
      const resultingBufferLength = 44 + audioBufferLength * 2;
      const buffer = new ArrayBuffer(resultingBufferLength);
      const view = new DataView(buffer);
      const sampleRate = 44100;

      writeUTFBytes(view, 0, 'RIFF');
      view.setUint32(4, 44 + audioBufferLength * 2, true);
      writeUTFBytes(view, 8, 'WAVE');
      writeUTFBytes(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeUTFBytes(view, 36, 'data');
      view.setUint32(40, audioBufferLength * 2, true);

      // write the PCM samples
      let index = 44;
      const volume = 1;
      for (let i = 0; i < audioBufferLength; i++) {
        view.setInt16(index, audioBuffer[i] * (0x7FFF * volume), true);
        index += 2;
      }

      if (cb) {
        return cb({
          buffer: buffer,
          view: view
        });
      }

      this.postMessage({
        buffer: buffer,
        view: view
      });
    }

    const webWorker: WebWorker = this.workerService.execute(processAudioBuffer);
    webWorker.onmessage(function (event) {
      callback(event.data.buffer, event.data.view);
    });
    webWorker.postMessage(config);
  }

  private stopRecording(callback) {
    this.recording.next(false);
    this.audioInput.disconnect();
    this.jsAudioNode.disconnect();
    const config = {
      sampleRate: this.sampleRate,
      internalInterleavedLength: this.recordingLength,
      audioBuffer: this.audioChannel
    };
    this.getAudioBuffer(config, (view) => {
      this.blob = new Blob([view], {
        type: 'audio/wav'
      });
      // tslint:disable-next-line:no-unused-expression
      callback && callback(this.blob);
    });
  }

  public isRecording(): Observable<boolean> {
    return this.recording.asObservable();
  }

  public start() {
    console.log('start recording');
    // tslint:disable-next-line:max-line-length
    const AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext
      || window.oAudioContext || window.msAudioContext);
    this.context = new AudioContext();

    if (this.context.createJavaScriptNode) {
      this.jsAudioNode = this.context.createJavaScriptNode(this.bufferSize, 1, 1);
    } else if (this.context.createScriptProcessor) {
      this.jsAudioNode = this.context.createScriptProcessor(this.bufferSize, 1, 1);
    } else {
      console.error('WebAudio API has no support on this browser');
    }

    this.jsAudioNode.connect(this.context.destination);

    this.stream = navigator.mediaDevices.getUserMedia({ audio: true })
      .then((microphone) => {
        this.recording.next(true);
        this.mediaStream = microphone;

        this.audioInput = this.context.createMediaStreamSource(microphone);
        this.audioInput.connect(this.jsAudioNode);

        console.log('microphone captured');

        this.jsAudioNode.onaudioprocess = this.onAudioProcess;
      })
      .catch((err) => console.error(err));
  }

  public stop() {
    console.log('stop recording');
    this.mediaStream.getAudioTracks()[0].stop();
    this.stopRecording((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.querySelector('audio');
      audio.src = url;
    });
  }
}
