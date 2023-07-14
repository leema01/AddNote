import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private URL = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.URL);
  }

  getNoteById(id: string): Observable<Notes> {
    const noteURL = `${this.URL}/${id}`;
    return this.http.get<Notes>(noteURL);
  }

  addNote(note: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.URL, note);
  }

  updateNoteById(id: number, note: Notes): Observable<Notes> {
    const noteURL = `${this.URL}/${id}`;
    return this.http.put<Notes>(noteURL, note);
  }

  deleteNoteById(id: number): Observable<{}> {
    const noteURL = `${this.URL}/${id}`;
    return this.http.delete(noteURL);
  }
}
