import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService  } from '../../../@core/data/state.service';
import {NetService} from '../../../@core/data/net.service';
import {Net} from '../../../@core/data/net';


// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styles: [`
    li , .dropdown span {
      font-weight: 700;
    }
    .dropdown ul li {
      padding: 0.3rem 1.5rem;
    }
    .dropdown ul li:hover {
      background-color: #20c997;
      cursor:pointer;
    }
    .dropdown ul li span {
      font-size: 1rem;
    }
  `],
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
      </nb-layout-header>

      <nb-sidebar style="width:12.25rem !important;" class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [end]="sidebar.id === 'end'">
        <nb-sidebar-header *ngIf="currentTheme !== 'corporate'" style="padding-bottom: 0 ;">
          
          <!-- a href="#" class="btn btn-hero-success main-btn">
            <i class="fas fa-globe-americas"></i>
            <span> 全局</span>
          </a -->
          <div class="dropdown" ngbDropdown>
            <button class="btn btn-success main-btn" type="button" ngbDropdownToggle style="padding: 0.75rem 1.2rem">
              <i class="fas fa-globe-americas" style="font-size: 1.6rem"></i>
              <span class="pl-1.4 align-middle"> {{currItemText}}</span>
            </button>
            <ul class="dropdown-menu" ngbDropdownMenu style="padding: 0.05rem 0">
              
              <li class="dropdown-item" style="padding-left: 1.4rem;" (click)="setMenu(0,' 全局')">
                <i style="font-size: 1.5rem" class="fas fa-globe-americas"></i>
                <span style="width: 100%" class="pl-1"> 全局</span>
              </li>
              <div class="dropdown-divider"></div>
              <div *ngFor="let net of nets">
              <li class="dropdown-item" style="padding-left: 1.8rem;" (click)="setMenu(1,net.name)">
                <i style="font-size: 1.5rem" class="fab fa-buromobelexperte"></i>
                <span style="width: 100%" class="pl-1"> 网络:{{net.name}}</span>
              </li>

              <div class="dropdown-divider"></div>
              </div>
                
              <li class="dropdown-item" style="padding-left: 1.8rem;" (click)="setMenu(1)">
                <i style="font-size: 1.5rem" class="fab fa-buromobelexperte"></i>
                <span style="width: 100%" class="pl-1"> 网络c1</span>
              </li>
              <li class="dropdown-item pl-5"> <i style="font-size: 1.5rem" class="fas fa-cube"></i>
                <span class="pl-1"> 示例项目</span>
              </li>
              
              <div class="dropdown-divider"></div>
              <li class="dropdown-item">demo</li>
            </ul>
          </div>
          
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column class="small" *ngIf="layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

      <nb-sidebar class="settings-sidebar"
                   tag="settings-sidebar"
                   state="collapsed"
                   fixed
                   [end]="sidebar.id !== 'end'">
        <ngx-theme-settings></ngx-theme-settings>
      </nb-sidebar>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    },
    {
      title: 'Buttons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/buttons',
    },
    {
      title: 'Grid',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/grid',
    },
    {
      title: 'Icons',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/icons',
    },
    {
      title: 'Modals',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/modals',
    },
    {
      title: 'Typography',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/typography',
    },
    {
      title: 'Animated Searches',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/search-fields',
    },
    {
      title: 'Tabs',
      icon: 'ion ion-android-radio-button-off',
      link: '/pages/ui-features/tabs',
    },
  ];
  layout: any = {};
  sidebar: any = {};

  private alive = true;
  private currItemText = ' 全局';
  private nets : Array<Net>;

  @Output()
  objectId : EventEmitter<any>  = new EventEmitter();

  private id = 0 ;

  currentTheme: string;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              private netService: NetService) {
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
    this.getNets();
  }

  getNets(): void {
    this.netService.getNets()
      .subscribe(nets => {
        this.nets=nets;
        console.log('sample-layout-------'+this.nets);
      });
  }
  setMenu(p,curr_name){
    console.log('----setMenu----',p,curr_name);
    if(p===1) curr_name='网络:'+curr_name;
    else if (p===2) curr_name='项目:'+curr_name;
    this.currItemText=curr_name;
    this.id=p;
    this.objectId.emit(this.id+'');
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
