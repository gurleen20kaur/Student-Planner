import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../app.component'

@Component({
  selector: 'app-dash-board',
  imports: [TaskListComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})

export class DashBoardComponent {
  @Input() tasks: Task[] = [];

  get NumOfTasks(): number {
    return this.tasks.length
  }
}
