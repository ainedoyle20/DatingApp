import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating Profile';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) { };

  ngOnInit(): void {

    this.setCurrentUser();

  }

  getUsers() {
    this.http.get<{ id: string; userName: string; }[]>('https://localhost:5001/api/users').subscribe({
      next: (response) => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request completed!')
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }
}
