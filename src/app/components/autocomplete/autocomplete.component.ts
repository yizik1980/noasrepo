import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { city } from 'src/app/model/city';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit , OnChanges{
  @Output()
  SelectEvent = new EventEmitter<city>();
  @Input()
  cities: city[];
  @Input()
  show: boolean;
  constructor(private store:Store) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.cities?.currentValue?.length == 1){
      debugger;
      this.selectItem(changes.cities.currentValue[0]);
    }
  }

  ngOnInit(): void {
  }

  selectItem(item: city) {
    this.SelectEvent.next(item);
    this.cities = new Array<city>();
  }
  
}
