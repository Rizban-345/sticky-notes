import {Component, HostBinding, EventEmitter, Output, ElementRef} from '@angular/core'
//declare var webkitSpeechRecognition:any;
//declare var SpeechRecognition:any;
@Component({
  selector:'app-note',
  templateUrl:'./note.component.html',
  styleUrls:['./note.component.css']
})

export class NoteComponent {
  //SpeechRecognition:any =webkitSpeechRecognition;
  
  recognition:any;

  @Output() add = new EventEmitter();
  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor(private el:ElementRef) {
   const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript) 
      document.getElementById('toolbar').focus();
    };
  }
  
  addNewNote() {
    this.add.emit();
  }

  onDismiss(event){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event){
    this.focusout.emit(event)
  }

  record(event) {
    this.recognition.start();
  }

}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}