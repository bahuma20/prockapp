import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit($event: any) {
    $event.preventDefault();

    this.auth.login(this.email, this.password)
      .subscribe(() => {
        this.router.navigateByUrl('');
        this.snackBar.open('Sie sind jetzt eingeloggt.', null, {
          duration: 5000,
        })
      }, error => {
        this.snackBar.open('Sie konnten nicht eingeloggt werden.', 'Ausblenden', {
          duration: 5000,
        })
      });

    console.log(this.email, this.password);
  }
}
