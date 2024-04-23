import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-app';
  public numbers: Number[] | undefined;
  public number: Number | null = null;

  constructor(private networkService: NetworkService){
    this.getNumbers();
  }

  private getNumbers () {
    this.networkService.getValues()
      .subscribe((data: Number[]) => {
        this.numbers = data;
      });
  }
  
}
