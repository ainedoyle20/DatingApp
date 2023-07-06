import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void { }

  onRegister() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        this.onCancel();
      },
      error: error => console.log(error)
    })
  }

  onCancel() {
    this.cancelRegister.emit(false);
  }
}
