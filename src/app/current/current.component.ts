import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadingsService, Reading } from '../readings.service';

@Component({
  selector: 'app-current/:source',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  source: string;
  readings: Reading[] = [];

  constructor(private route: ActivatedRoute,
    private readingsService: ReadingsService) { }

  ngOnInit() {
    this.source = this.route.snapshot.paramMap.get('source');
    console.log("Current", this.source);
    this.fetchReadings();
  }

  fetchReadings() {
    this.readingsService.fetchMostRecent(this.source)
      .subscribe((data: Reading[]) => {
        this.readings = data;
      }, (err) => {
        console.log(err);
      })
  }
}
