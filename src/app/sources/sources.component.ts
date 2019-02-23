import { Component, OnInit } from '@angular/core';
import { DataSet, ReadingsService } from '../readings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
  datasets: Map<string, DataSet[]>;
  sources: string[];

  constructor(private readingsService: ReadingsService,
              private router: Router) {

    }

  ngOnInit() {
    this.fetchDataSets();
  }

  fetchDataSets() {
    this.readingsService.fetchDataSets()
    .subscribe((data: Map<string, DataSet[]>) => {
      this.datasets = new Map(Object.entries(data));
      this.sources = Array.from(this.datasets.keys());
    }, (err) => {
      console.log(err);
    });
  }

  getDataset(source: string): DataSet[] {
    return this.datasets.get(source);
  }

  doCurrent(source: string) {
    this.router.navigate(['current', source]);
  }

  doDetails(source: string, code: string) {
    this.router.navigate(['details', source, code]);
  }
}
