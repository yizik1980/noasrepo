import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './../../model/LoaderState';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {
  show: boolean | undefined;
  private subscription!: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.show = false;
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
