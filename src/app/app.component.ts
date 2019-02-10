import { Component, OnInit } from '@angular/core';
import { DataSet, ReadingsService } from './readings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Data PWA';

  constructor(private router: Router) {}

  ngOnInit() {}

  onHome() {
    this.router.navigate(['sources']);
  }
}
