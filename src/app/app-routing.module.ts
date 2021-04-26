import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeatherViewComponent } from './components/weather-view/weather-view.component';


const routes: Routes = [
  { path: ':key/:name', component: WeatherViewComponent },
  { path: 'faviorite', component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
