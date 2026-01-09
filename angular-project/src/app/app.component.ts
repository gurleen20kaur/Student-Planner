import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentTab: string = 'Daily To-Do\'s';

  switchTab(tab: string) {
    this.currentTab = tab;
  }

}
