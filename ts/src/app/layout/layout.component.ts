import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles : [`
  :host {
     flex: 1 1 auto;
    display: flex;
    height: 100%;
   }
`],
})
export class LayoutComponent implements OnInit {
  maTheme: string = this.sharedService.maTheme;

  constructor(private sharedService: SharedService) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maTheme = value;
    });
  }
  ngOnInit() {
  }

}
