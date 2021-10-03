import { Component } from '@angular/core';

// https://github.com/FortAwesome/angular-fontawesome
import { faTwitter, faFacebook, faGithub, faWordpress } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  fabTwitter = faTwitter;
  fabFacebook = faFacebook;
  fabGithub = faGithub;
  faWordpress = faWordpress;

  constructor() {
  }

}
