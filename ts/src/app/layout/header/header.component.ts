import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import {LayoutService} from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  messagesData: Array<any>;
  tasksData: Array<any>;
  maThemeModel = 'green';

  setTheme() {
    this.sharedService.setTheme(this.maThemeModel);
  }

  constructor(
     private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private layoutService: LayoutService ) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maThemeModel = value;
    });
  }

  ngOnInit() {

  }

  logout() {
    this.layoutService.logout().subscribe(
      data => {
        if (!data.loggedOut) {
          this.router.navigate(['/']);
        }
      });
  }
}
