import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgModel} from '@angular/forms';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {map, startWith, delay, tap, switchMap} from 'rxjs/operators';

import { Identifiable } from './input-autocomplete';

import { pokemons, swCharacters } from './data';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample implements OnInit {
  form = new FormGroup({
    pokemon: new FormControl(),
    swCharacter: new FormControl()
  });

  pokemons$ = this.form.get('pokemon').valueChanges
    .pipe(
      startWith(null),
      switchMap(name => {
        if (typeof name === 'string') {
          return of(pokemons)
            .pipe(
              delay(800),
              map(response => response.filter(p => p.label.toUpperCase().includes(name))),
            );
        }
        return of([]);
      })
    );

  swCharacters$ = this.form.get('swCharacter').valueChanges
    .pipe(
      startWith(null),
      switchMap(name => {
        if (typeof name === 'string') {
          return of(swCharacters)
            .pipe(
              delay(800),
              map(response => response.filter(p => p.label.toUpperCase().includes(name))),
            );
        }
        return of([]);
      })
    );


  ngOnInit() {
  }

  submit() {
    console.log('obj',this.form.value);
    console.log(this.swCharacterModel);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */