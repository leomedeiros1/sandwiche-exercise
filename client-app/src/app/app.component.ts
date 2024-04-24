import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { Access } from './models/access.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, CommonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-app';
  public accesses: Access[] | undefined;
  public access: Access | null = null;

  constructor(private networkService: NetworkService){
    this.getAccesss();
  }

  private getAccesss () {
    console.log("ta atualizado")
    this.networkService.getValues()
      .subscribe((data: Access[]) => {
        console.log(data)
        this.accesses = data;
      });
  }
  
}
