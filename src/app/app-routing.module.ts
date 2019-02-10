import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SourcesComponent } from './sources/sources.component';
import { CurrentComponent } from './current/current.component';
import { DetailsComponent } from './details/details.component';
import { environment } from 'src/environments/environment.prod';

const routes: Routes = [
  { path: 'sources', component: SourcesComponent },
  { path: 'current/:source', component: CurrentComponent },
  { path: 'details/:source/:code', component: DetailsComponent },
  { path: '',
    redirectTo: '/sources',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: !environment.production})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
