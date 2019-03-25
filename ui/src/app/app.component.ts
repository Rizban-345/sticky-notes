import { Component, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  notes = [];
  recognition:any;
  constructor(private el:ElementRef) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0,content:'' }];

    const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      console.log(this.el.nativeElement.querySelectorAll(".content")[0]);
      this.el.nativeElement.querySelectorAll(".content")[0].innerText = event.results[0][0].transcript
      
    };
  }
  updateAllNotes() {
    console.log(document.querySelectorAll('app-note'));
    let notes = document.querySelectorAll('app-note');

    notes.forEach((note, index)=>{
         console.log(note.querySelector('.content').innerHTML)
         this.notes[note.id].content = note.querySelector('.content').innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  addNote () {
    var incId = 0;
    this.notes.forEach((note, index)=>{
        var temp = note.id;
        if(incId == 0) incId = note.id;

        if(temp > incId) {
          incId = note.id;
        }
    });

    this.notes.push({id: incId + 1, content: ''});
    console.log(this.notes);
    // sort the array
    this.notes = this.notes.sort((a,b)=>{ return b.id-a.id});
    localStorage.setItem('notes', JSON.stringify(this.notes));

    // this.notes.push({ id: this.notes.length + 1,content:'' });
    // // sort the array
    // this.notes= this.notes.sort((a,b)=>{ return b.id-a.id});
    // localStorage.setItem('notes', JSON.stringify(this.notes));
  };
  
  saveNote(event){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    console.log("********* updating note *********")
  }
  
  updateNote(newValue){
    this.notes.forEach((note, index)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  deleteNote(event){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     if(this.notes.length > 1) {
      this.notes.forEach((note, index)=>{
        if(note.id== id) {
          this.notes.splice(index,1);
          localStorage.setItem('notes', JSON.stringify(this.notes));
          console.log("********* deleting note *********")
          return;
        }
      });
     } else {
      this.notes[0].content = '';
      event.srcElement.parentElement.parentElement.parentElement.setAttribute('content', '');
      this.saveNote(event);
    } 
  }

   record(event) {
    this.recognition.start();
    this.addNote();
  }


}


export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}