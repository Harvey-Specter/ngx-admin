import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-basenet',
  styleUrls: ['./basenet.component.scss'],
  templateUrl: './basenet.component.html',
})
export class BasenetComponent implements OnDestroy {

  temperature = 24;
  // temperatureOff = false;
  temperatureMode = 'cool';

  // humidity = 87;
  // humidityOff = false;
  // humidityMode = 'heat';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
