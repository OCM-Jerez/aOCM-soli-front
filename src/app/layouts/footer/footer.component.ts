import { Component, OnInit } from '@angular/core';

// https://github.com/FortAwesome/angular-fontawesome
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fasCoffee = faCoffee;
  fabTwitter = faTwitter;
  fabFacebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
  }

}
