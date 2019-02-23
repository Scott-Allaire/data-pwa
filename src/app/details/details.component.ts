import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reading, ReadingsService } from '../readings.service';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  source: string;
  code: string;

  // lineChart
  public lineChartLabels: any;
  public lineChartData: any;
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time'
      }]
    },
    legend: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private route: ActivatedRoute,
    private readingsService: ReadingsService) {
  }

  ngOnInit() {
    this.source = this.route.snapshot.paramMap.get('source');
    this.code = this.route.snapshot.paramMap.get('code');
    this.fetchReadings();
  }

  fetchReadings() {
    const start = moment().startOf('day').add(-1, 'months');
    this.readingsService.fetchDetail(this.source, this.code, start.format())
      .subscribe((readings: Reading[]) => {
        const daily = readings.reduce(
          (map, reading: Reading) => {
            const date = moment(reading.received).format('MM/DD');
            let values = map.get(date)

            if (map.get(date)) {
              values.min = Math.min(values.min, +reading.value);
              values.max = Math.max(values.max, +reading.value);
            } else {
              map.set(date, {
                min: +reading.value,
                max: +reading.value,
              });
            }

            return map;
          }, new Map()
        );

        const labels = [];
        const minValues = [];
        const maxValues = [];

        const it = daily.entries();
        let entry = it.next();
        while (!entry.done) {
          labels.push(entry.value[0]);
          minValues.push(entry.value[1].min);
          maxValues.push(entry.value[1].max);
          entry = it.next();
        }

        this.lineChartLabels = labels;
        this.lineChartData = [{
              label: 'Min',
              fill: false,
              data: minValues
            }, {
              label: 'Max',
              fill: false,
              data: maxValues
            }];

      }, (err) => {
        console.log(err);
      });
  }
}
