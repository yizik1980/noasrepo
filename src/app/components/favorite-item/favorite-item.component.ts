import { Component, Input, OnInit } from '@angular/core';
import { favorite } from 'src/app/model/favorite';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {
  @Input()
  WheatherLocation:favorite;
  constructor() { }

  ngOnInit(): void {

  }

}
