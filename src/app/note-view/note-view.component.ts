import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoteService } from '../services/note.service';
import { Notes } from '../model/note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  categories: string[] = ['General', 'Personal', 'Work'];
  priorities: string[] = ['Low', 'Medium', 'High', 'Critical'];
  priorityIcons: any = {
    'Low': 'arrow_circle_down',
    'Medium': 'remove_circle_outline',
    'High': 'arrow_circle_up',
    'Critical': 'gpp_maybe'
  };
  note: Notes[] = [];
  filteredNote: Notes[] = [];
  searchString: string = '';

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.note = notes;
      this.filterNotes();
    });
  }

  onCardClick(id: any): void {
    this.router.navigate(['detail', id]);
  }

  onSearch(value: string) {
    this.searchString = value;
    this.filterNotes();
  }

  filterNotes() {
    this.filteredNote = this.note.filter(n => n.title.toLowerCase().includes(this.searchString.toLowerCase()));
  }
}
