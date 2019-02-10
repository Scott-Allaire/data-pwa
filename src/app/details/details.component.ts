import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details/:source/:code',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  source: string;
  code: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.source = this.route.snapshot.paramMap.get('source');
    this.code = this.route.snapshot.paramMap.get('code');
    console.log("Details", [this.source, this.code]);
  }
}
