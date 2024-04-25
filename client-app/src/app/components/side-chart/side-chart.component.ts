import { Component } from '@angular/core';
import { LinkCount } from '../../models/link.model';
import { NetworkService } from '../../services/network.service';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-side-chart',
    standalone: true,
    imports: [],
    templateUrl: './side-chart.component.html',
    styleUrl: './side-chart.component.scss'
})
export class SideChartComponent {
    public chart: any;
    public linksData: LinkCount[] = [];
    public linksDataNames: string[] = [];
    public linksDataCounts: number[] = [];

    constructor(private networkService: NetworkService) {

    }

    ngOnInit(): void {
        this.updateChartData();
    }

    ngAfterViewInit(): void {
    }

    updateChartData(building: boolean = false) {
        // console.log("##### updateChartData", this.range.value.start, this.range.value.end,);
        this.networkService.getMostAcessed().subscribe((data: LinkCount[]) => {
            console.log("DATA:", data)
            this.linksData = data.splice(0, 5);

            this.linksDataNames = this.linksData.map((each: LinkCount) => {
                return each.link_name
            })

            this.linksDataCounts = this.linksData.map((each: LinkCount) => {
                return each.accesses_count
            })

            this.createChart();
        });
    }


    createChart() {
        // console.log("Create chart: ", this.linksDataNames, this.linksDataCounts);
        console.log("Create chart");

        this.chart = new Chart("SideChart", {
            type: 'polarArea', //this denotes tha type of chart
            data: {// values on X-Axis
                labels: this.linksDataNames,
                datasets: [
                    {
                        label: "",
                        data: this.linksDataCounts,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)',
                            'rgb(54, 162, 235)',
                            'rgb(235, 79, 112)',
                            'rgb(55, 172, 172)',
                        ],
                        // borderColor: 'rgb(75, 192, 192)',
                        // tension: 0.1
                    }
                ]
            },
            options: {
                // aspectRatio: 2.5
            }

        });
    }
}
