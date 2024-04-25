import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AccessCount } from '../../models/access.model';
import { NetworkService } from '../../services/network.service';


@Component({
  selector: 'app-main-chart',
  standalone: true,
  imports: [],
  templateUrl: './main-chart.component.html',
  styleUrl: './main-chart.component.scss'
})
export class MainChartComponent {
  public chart: any;
  public acessesData: AccessCount[] = [];
  public acessesDataDates: Date[] = [];
  public acessesDataCounts: number[] = [];

  constructor(private networkService: NetworkService){

  }

  ngOnInit(): void {
    console.log("INIT")
    this.getChartData();
    
  }

  getChartData(){
    this.networkService.getAccessesCount()
      .subscribe((data: AccessCount[]) => {
        console.log("DATA:" , data)
        this.acessesData = data;

        this.acessesDataDates = this.acessesData.map((each: AccessCount) => {
          return new Date(each.access_date)
        })

        this.acessesDataCounts = this.acessesData.map((each: AccessCount) => {
          return each.access_count
        })

        this.createChart();
      });
  }


  createChart(){
    // let acessesData: AccessCount[];
    console.log("Create chart: ", this.acessesDataDates, this.acessesDataCounts);

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.acessesDataDates.map((each: Date) => {
          console.log(each)
          return each.getDate() + "/" + each.getMonth() + "/" + each.getFullYear();
        }), 
        datasets: [
          {
            label: "Acessos",
            data: this.acessesDataCounts,
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
