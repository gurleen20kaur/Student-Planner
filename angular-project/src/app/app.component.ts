import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  Username: string = 'Gurleen';
  currentTab: string = 'Daily Tasks';

  switchTab(tab: string) {
    this.currentTab = tab;
  }

}
