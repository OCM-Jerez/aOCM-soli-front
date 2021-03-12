import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import {MessageService} from 'primeng/api';



// https://github.com/FortAwesome/angular-fontawesome
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  providers: [MessageService],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  items?: MenuItem[];

  fasCoffee = faCoffee;
  fabTwitter = faTwitter;
  fabFacebook = faFacebook;

  constructor(private messageService: MessageService) {

   }

  ngOnInit(): void {
    this.items = [
      {label: 'Update', command: () => {
       console.log('update');
          // this.update();
      }},
      {label: 'Delete', command: () => {
        console.log('delete');
          // this.delete();
      }},
      {label: 'Angular.io', url: 'http://angular.io'},
      {separator:true},
      {label: 'Setup', routerLink: ['/setup']}
  ];

  }
  save(severity: string) {
    this.messageService.add({severity: severity, summary:'Success', detail:'Data Saved'});
}
}
