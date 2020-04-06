import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {SettingsService} from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ],
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
    this.loadCheck();
  }

  changeColor(theme: string, link: any){
    this.applyCheck(link);
    this.settings.applyTheme(theme);
  }

  applyCheck(link: any){
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  loadCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this.settings.settings.theme;
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme ){
        ref.classList.add('working');
        break;
      }
    }
  }

}
