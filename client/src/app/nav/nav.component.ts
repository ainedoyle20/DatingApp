import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isDropdownOpen = false;
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void { }

  onLogin() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members')
    })
  }

  onLogout() {
    this.accountService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
