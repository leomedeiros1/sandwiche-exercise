import { Component, ViewChild } from '@angular/core';
import { LinkCount } from '../../models/link.model';
import { NetworkService } from '../../services/network.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
    selector: 'app-main-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule],
    templateUrl: './main-table.component.html',
    styleUrl: './main-table.component.scss'
})
export class MainTableComponent {
    public chart: any;
    public linksData: LinkCount[] = [];

    displayedColumns: string[] = ['link_name', 'accesses_count',];
    dataSource = new MatTableDataSource<LinkCount>(this.linksData);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private networkService: NetworkService) {
        this.updateTableData();
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    updateTableData(building: boolean = false) {
        // console.log("##### updateTableData", this.range.value.start, this.range.value.end,);
        this.networkService.getMostAcessed().subscribe((data: LinkCount[]) => {
            console.log("DATA:", data)
            this.linksData = data;
            this.dataSource.data = this.linksData;
            // this.createChart();
        });
    }

}
