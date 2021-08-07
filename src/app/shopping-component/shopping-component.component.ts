import { Component, Input, OnInit } from '@angular/core';
import {Item} from '../models/Item';

@Component({
  selector: 'app-shopping-component',
  templateUrl: './shopping-component.component.html',
  styleUrls: ['./shopping-component.component.css']
})
export class ShoppingComponentComponent implements OnInit {

  public items: Item[] = [];
  newItemToBeAdded: Item = {} as Item;


  private shoppingListLocalStorageKey = 'shoppingKey';
  isCacheNotEmpty:boolean = false;


  constructor() {

  }
  
  ngOnInit() {
    let cachedItems = window.localStorage.getItem(this.shoppingListLocalStorageKey);
    if(cachedItems){
       this.items = JSON.parse(cachedItems);
       this.isCacheNotEmpty = true;
    }
  }

  public addANewItemInList = ():void => {
    if(this.newItemToBeAdded.value === undefined){
      return;
    }
    this.newItemToBeAdded.id = Math.floor(Math.random() * Date.now()).toString();
    let newObj = {
      id: this.newItemToBeAdded.id,
      isDone: false,
      value: this.newItemToBeAdded.value
    };

    this.items.push(newObj); 

    this.newItemToBeAdded = {} as Item;
    this.saveInCache();
  }

  public markItemAsDone = (item:Item):void => {
    let itemToBeModified = this.items.find(i => i.id == item.id);
    if(itemToBeModified){
      itemToBeModified.isDone = !itemToBeModified.isDone;
    }
    this.saveInCache();
  }

  public clearCache = (): void => {
    window.localStorage.removeItem(this.shoppingListLocalStorageKey);
    this.isCacheNotEmpty = false;
  }

  private saveInCache(){ 
    window.localStorage.setItem(this.shoppingListLocalStorageKey, JSON.stringify(this.items));
    this.isCacheNotEmpty = true;
  }
}
