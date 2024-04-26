import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AccessCount } from '../../models/access.model';
import { NetworkService } from '../../services/network.service';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';


@Component({
    selector: 'app-main-chart',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [
        MatCardModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe
    ],
    templateUrl: './main-chart.component.html',
    styleUrl: './main-chart.component.scss'
})
export class MainChartComponent {
    public chart: any;
    public acessesData: AccessCount[] = [];
    public acessesDataDates: Date[] = [];
    public acessesDataCounts: number[] = [];

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    constructor(private networkService: NetworkService) {

    }

    ngOnInit(): void {
        console.log("INIT", this.range.value);
        this.updateChartData(true);

    }

    ngAfterViewInit(): void {
        this.range.valueChanges.pipe(
            debounceTime(150),
            distinctUntilChanged((acc, curr) => {
                return acc.start === curr.start && acc.end === curr.end
            }),
            filter((values) => {
                return (!values.start || (values.start instanceof Date)) && (!values.end || (values.end instanceof Date))
            })
        ).subscribe(() => {
            this.updateChartData();
            // this.updateChart();
        })
    }

    updateChartData(building: boolean = false) {
        // console.log("##### updateChartData", this.range.value.start, this.range.value.end,);

        this.networkService.getAccessesCount(
            this.range.value.start,
            this.range.value.end,
        ).subscribe((data: AccessCount[]) => {
            console.log("DATA:", data)
            this.acessesData = data;

            this.acessesDataDates = this.acessesData.map((each: AccessCount) => {
                return new Date(each.access_date)
            })

            this.acessesDataCounts = this.acessesData.map((each: AccessCount) => {
                return each.access_count
            })

            if (building) {
                this.createChart();
            } else {
                this.updateChart();
            }
        });
    }

    updateChart(){
        if(this.chart.data){
            // console.log("@@@@@@@ updateChart", this.chart.data);
            this.chart.data.labels = this.acessesDataDates.map((each: Date) => {
                return each.getDate() + "/" + (each.getMonth()+1) + "/" + each.getFullYear();
            });
    
            this.chart.data.datasets[0].data = this.acessesDataCounts;
            // if(this.chart.data.datasets[0]){
            // }
        }
        this.chart.update();
    }


    createChart() {
        // let acessesData: AccessCount[];
        // console.log("Create chart: ", this.acessesDataDates, this.acessesDataCounts);
        console.log("Create chart");

        this.chart = new Chart("MainChart", {
            type: 'line', //this denotes tha type of chart
            data: {// values on X-Axis
                labels: this.acessesDataDates.map((each: Date) => {
                    // return each.getDate() + "/" + (each.getMonth()+1) + "/" + each.getFullYear();
                    return each.getDate() + "/" + (each.getMonth()+1) + "/" + each.getFullYear();
                }),
                datasets: [
                    {
                        label: "Acessos Totais",
                        data: this.acessesDataCounts,
                        backgroundColor: 'limegreen',
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }

        });
    }
}
