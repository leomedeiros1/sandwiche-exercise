import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NetworkService } from './network.service';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, CommonModule,],
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
    console.log("ta atualizado")
    this.networkService.getValues()
      .subscribe((data: Number[]) => {
        this.numbers = data;
      });
  }
  
}
