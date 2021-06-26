import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotesService } from './../../Services/notes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userNotes: any[] = [];
  userToken: any = '';
  userID: string = '';
  addNoteState: boolean = false;
  isLoading: boolean = false;
  noteID: string = '';

  constructor(private _NotesService: NotesService, private _Router: Router) { }



  getUserNotes() {

    this.isLoading = true;

    try {
      this.userToken = localStorage.getItem('TOKEN');
      var decoded: any = jwtDecode(this.userToken);

    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/login']);
    }

    this.userID = decoded._id;

    let userData = { token: this.userToken, userID: this.userID };


    this._NotesService.getAllUserNotes(userData).subscribe((response) => {
      if (response.message == "success") {
        this.userNotes = response.Notes;
        setTimeout(() => { this.isLoading = false; }, 700);
      } else {
        this.userNotes = [];
        this.isLoading = false;
      }
    })
  }


  addNoteForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required)
  })

  updateNoteForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required)
  })

  addNoteData() {

    if (this.addNoteForm.valid) {
      let data = { title: this.addNoteForm.controls.title.value, desc: this.addNoteForm.controls.desc.value, token: this.userToken, citizenID: this.userID }

      this._NotesService.addUserNote(data).subscribe((response) => {
        if (response.message == "success") {
          this.getUserNotes();
          this.addNoteForm.reset();
          $("#addNote").modal('hide');
        }
      })
    }
  }


  deleteNoteData() {

    let data = { token: this.userToken, NoteID: this.noteID }

    this._NotesService.deletUserNote(data).subscribe((response) => {
      if (response.message == "deleted") {
        $("#deleteNote").modal('hide');
        this.getUserNotes();
      } else {
        console.log('error');
      }
    })

  }

  getNoteID(noteID: string) {
    this.noteID = noteID;
  }

  setCurrentNoteData() {
    for (let index = 0; index < this.userNotes.length; index++) {
      if (this.userNotes[index]._id == this.noteID) {
        this.updateNoteForm.controls.title.setValue(this.userNotes[index].title);
        this.updateNoteForm.controls.desc.setValue(this.userNotes[index].desc);

      }

    }
  }

  updateUserNote() {
    let data = {
      NoteID: this.noteID,
      token: this.userToken,
      title: this.updateNoteForm.controls.title.value,
      desc: this.updateNoteForm.controls.desc.value
    }

    this._NotesService.updateUserNote(data).subscribe((response) => {
      if (response.message == "updated") {
        $("#editNote").modal('hide');
        this.getUserNotes();
      }
    })
  }




  ngOnInit(): void {
    this.getUserNotes();
  }
}
