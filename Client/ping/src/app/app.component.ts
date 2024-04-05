import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginComponent } from './authentication/login/login.component';
import { environment } from '../enviroment';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthenticationModule, LoginComponent], // Remove RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ping';
}
