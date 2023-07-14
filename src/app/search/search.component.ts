import { Component, EventEmitter, Output } from '@angular/core';
import { Notes } from '../model/note';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
  }

  note: Notes[] = [];

  filteredNote: Notes[] = [];
  selectedCategory: string = '';
  selectedPriority: string = '';
  applyFilter(filterValue: string, category: string, priority: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredNote = this.note.filter(n => {
      if (category && n.category !== category) {
        return false;
      }
      if (priority && n.priority !== priority) {
        return false;
      }
      if (!filterValue) {
        return true;
      }
      return n.title.toLowerCase().includes(filterValue) || n.content.toLowerCase().includes(filterValue);
    });
  }


}
