import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isDropdownOpen = false;
  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void { }

  onLogin() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: error => this.toaster.error(error.error)
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
