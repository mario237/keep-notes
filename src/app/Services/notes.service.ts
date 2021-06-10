import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  BASE_URL:string = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient:HttpClient) { }

  getAllUserNotes(userData:object):Observable<any>{
    return this._HttpClient.post(this.BASE_URL+'getUserNotes',userData);
  }

  
  addUserNote(noteData:object):Observable<any>{
    return this._HttpClient.post(this.BASE_URL+'addNote',noteData);
  }

  deletUserNote(noteData:any):Observable<any>{
    let options = {
      headers:new HttpHeaders({

      }),
      body:{
        NoteID:noteData.NoteID,
        token:noteData.token
      }
    }
    return this._HttpClient.delete(this.BASE_URL+'deleteNote',options);
  }

  updateUserNote(noteData:object):Observable<any>{
    return this._HttpClient.put(this.BASE_URL+'updateNote',noteData);
  }
}
