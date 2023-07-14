import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NoteService } from '../services/note.service';
import { Notes } from '../model/note';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailViewComponent implements OnInit {

  note: Notes = {
    id: 0,
    title: '',
    content: '',
    reminderDate: new Date(),
    category: '',
    priority: '',
    editing: false
  };
  isEditing = false;
  categories: string[] = ['General', 'Personal', 'Work'];
  priorities: string[] = ['Low', 'Medium', 'High', 'Critical'];
  priorityIcons: any = {
    'Low': 'arrow_circle_down',
    'Medium': 'remove_circle_outline',
    'High': 'arrow_circle_up',
    'Critical': 'gpp_maybe'
  };

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(id).subscribe(note => {
        this.note = note;
      });
    }
  }

  onEditClick(): void {
    if (this.isEditing) {
      this.noteService.updateNoteById(this.note.id, this.note).subscribe(() => {
        this.isEditing = false;
        this.noteService.getNotes().subscribe(notes => {
          this.note = notes.find(n => n.id === this.note.id)!;
        });
      });
      this.router.navigate(['/noteview']);

    } else {
      this.isEditing = true;
    }
  }

  onDeleteClick(): void {
    if (this.note && this.note.id) {
      if (confirm('Are you sure you want to delete this note?')) {
        this.noteService.deleteNoteById(this.note.id).subscribe(() => {
          this.router.navigate(['/noteview']);
        });
      }
    }
  }

  onContentEdit(event: Event): void {
    if (this.isEditing) {
      const element = event.target as HTMLDivElement;
      this.note.content = element.innerText;
    }
  }
}
