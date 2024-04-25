import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService } from './services/network.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { Access, AccessCount } from './models/access.model';
import {MatCardModule} from '@angular/material/card';
import { MainChartComponent } from './components/main-chart/main-chart.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, MatCardModule, 
    MainChartComponent, TopBarComponent, RightPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-app';
  public accessesC: AccessCount[] | undefined;
  public accessC: AccessCount | null = null;

  constructor(private networkService: NetworkService){
    this.getAccesss();
  }

  private getAccesss () {
    console.log("ta atualizado")
    this.networkService.getAccessesCount()
      .subscribe((data: AccessCount[]) => {
        console.log(data)
        this.accessesC = data;
      });
  }
  
}
