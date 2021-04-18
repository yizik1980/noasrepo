import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { city } from 'src/app/model/city';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Output()
  SelectEvent = new EventEmitter<city>();
  @Input()
  cities:city[];
  @Input()
  show:boolean;
  constructor() { }

  ngOnInit(): void { 
  }
  selectItem(item:city){
    this.show = false;    
    this.SelectEvent.next(item);
  }
}
