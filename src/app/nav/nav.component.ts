import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Notes } from '../model/note';
import { AuthenticationService } from '../services/authenctication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentRoute: string = '';
  statuscheck:boolean=true;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    
  }
  getstatus()
  {
    console.log("hiii");

    if(!this.Logout.getLoginStatus()){
      console.log(this.Logout.getLoginStatus());
      this.statuscheck=false;
    }
  }
  constructor(private Logout: AuthenticationService, private router: Router) {}
  logout() {
    this.Logout.logout();
    this.router.navigate(['/login']);
    if (this.Logout.logingStatus) {
      return confirm('sure?');
    } else {
      return true;
    }
  }
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
    this.filteredNote = this.note.filter((n) => {
      if (category && n.category !== category) {
        return false;
      }
      if (priority && n.priority !== priority) {
        return false;
      }
      if (!filterValue) {
        return true;
      }
      return (
        n.title.toLowerCase().includes(filterValue) ||
        n.content.toLowerCase().includes(filterValue)
      );
    });
  }
}
