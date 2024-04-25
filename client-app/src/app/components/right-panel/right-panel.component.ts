import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SideChartComponent } from '../side-chart/side-chart.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [MatCardModule, SideChartComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss'
})
export class RightPanelComponent {

}
