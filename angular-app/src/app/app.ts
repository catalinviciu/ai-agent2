import { Component, signal } from '@angular/core';
import { InspectionHistory } from './pages/inspection-history/inspection-history';
import { AiFullScreenAgent } from './components/ai-full-screen-agent/ai-full-screen-agent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InspectionHistory, AiFullScreenAgent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
  protected readonly isAgentOpen = signal(false);

  openAgent() {
    this.isAgentOpen.set(true);
  }

  closeAgent() {
    this.isAgentOpen.set(false);
  }
}
