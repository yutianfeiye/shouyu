import { Component, Input, Inject , ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControl, ControlValueAccessor } from '@angular/forms';
import { RecorderService } from './core-audio/recorder/recorder.service';

declare var window: any;

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  webkitSpeechGrammarList: any;
  SpeechGrammarList: any;
  SpeechRecognition: any;
}

@Component({
  selector: 'speech2text',
  templateUrl: 'speech.component.html',
  styleUrls: ['speech.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SpeechComponent   {

  valueFormated;

  mic = '/assets/mic.gif';
  micAnimate = '/assets/mic-animate.gif';

  speaking = false;

  inputValue = '';

  supportVoice = 'webkitSpeechRecognition' in window;

  @Input()
  props: any;

  @Input()
  recognitionType = 'google';

  recognition: any;

  constructor( private detectRef: ChangeDetectorRef, private recorderService: RecorderService) {

  }

  ngOnInit(): void {
    if (this.supportVoice && this.recognitionType !== 'xunfei') {
      //   const WebkitSpeechRecognition = IWindow.webkitSpeechRecognition;
         const { webkitSpeechRecognition, webkitSpeechGrammarList }: IWindow = <IWindow>window;
         this.recognition = new webkitSpeechRecognition();
         this.recognition.continuous = true;
         this.recognition.interimResults = true;
         this.recognition.lang = this.props.lang || 'cmn-Hans-CN';
         this.recognition.onresult = (event) => {
           let interimTranscript = '';
           let finalTranscript = '';
           for (let i = event.resultIndex; i < event.results.length; ++i) {
             if (event.results[i].isFinal) {
               finalTranscript += event.results[i][0].transcript;
               this.inputValue = finalTranscript;
               this.detectRef.detectChanges();
               if (this.props.onChange) { this.props.onChange(finalTranscript); }
               if (this.props.onEnd) { this.props.onEnd(finalTranscript); }
             } else {
               interimTranscript += event.results[i][0].transcript;
                 this.inputValue = interimTranscript;
               if (this.props.onChange) { this.props.onChange(interimTranscript); }
             }
           }
         };
       }
  }
  changeValue(event) {
      this.inputValue = event.target.value;
  }

  say() {
    if (this.supportVoice && this.recognitionType !== 'xunfei') {
      if (!this.speaking) {
        // start listening
        this.inputValue = '';
        this.recognition.start();
      } else {
        this.recognition.stop();
      //  const question = this.inputValue;
      }
    } else {
      if (!this.speaking) {
        this.recorderService.start();
      } else {
        this.recorderService.stop();
      }
    }
    this.speaking = !this.speaking;
  }
}


