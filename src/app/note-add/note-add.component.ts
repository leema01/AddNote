import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';
import { Notes } from '../model/note';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css'],
})
export class NoteAddComponent implements OnInit {
  note: Notes = {
    title: '',
    content: '',
    category: '',
    priority: '',
    reminderDate: null,
    id: 0,
    editing: false
  };
  categories = ['Work', 'Personal', 'Shopping', 'Others'];
  priorities = ['Low', 'Medium', 'High'];
  priorityIcons: any = {
    Low: 'low_priority',
    Medium: 'medium_priority',
    High: 'high_priority',
  };

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(noteForm: NgForm): void {
    if (noteForm.valid) {
      this.noteService.addNote(this.note).subscribe(
        () => {
          console.log('Note added successfully!');
          this.router.navigate(['/notes']);
        },
        (error) => {
          console.log('Error adding note: ', error);
        }
      );
    }
  }
}
