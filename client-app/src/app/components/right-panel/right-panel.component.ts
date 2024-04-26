import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SideChartComponent } from '../side-chart/side-chart.component';
import { NetworkService } from '../../services/network.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AccessCount } from '../../models/access.model';
import { LinkCount } from '../../models/link.model';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [MatCardModule, SideChartComponent, DatePipe, DecimalPipe],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss'
})
export class RightPanelComponent {
  public todayDate: Date = new Date();
  public mostAccessedToday: LinkCount|undefined;
  public mostAccessedAllTime: LinkCount|undefined;

  public avgAccesses!: number;
  public avgAccessesPerDay!: number;

  get strAccessedTodayVsAvg(): string {
    if(this.avgAccessesPerDay && this.mostAccessedToday){
      let result = (this.mostAccessedToday.accesses_count * 100)/this.avgAccessesPerDay - 100;
      return `${result.toPrecision(5)}% a ${result > 0 ? 'mais' : 'menos'} que a média de acessos por dia.`
    }
    return ""
  }
  
  get strAccessedAllTimeVsAvg(): string {
    if(this.avgAccesses && this.mostAccessedAllTime){
      let result = (this.mostAccessedAllTime.accesses_count * 100)/this.avgAccesses - 100;
      return `${result.toPrecision(5)}% a ${result > 0 ? 'mais' : 'menos'} que a média.`
    }
    return ""
  }

  constructor(private networkService: NetworkService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void { 
    this.networkService.getStatistics().subscribe((data: any) => {
      this.mostAccessedToday = data.most_accessed_today[0];
      this.mostAccessedAllTime = data.most_accessed_all_time[0];
      this.avgAccesses = data.avg_accesses[0].average_accesses_per_link;
      this.avgAccessesPerDay = data.avg_accesses_per_day[0].average_accesses_per_link_per_day;
    })
  }
}
