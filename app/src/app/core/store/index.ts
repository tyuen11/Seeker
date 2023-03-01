import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SeekerReducers } from './reducers';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
 
    return reducer(state, action);
  };
}
 
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  imports: [
    StoreModule.forRoot(SeekerReducers, { metaReducers }),
    // StoreRouterConnectingModule,
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  declarations: [],
  exports: [],
  providers: [

    // { provide: RouterStateSerializer, useClass: NavigationSerializer }
  ]
})
export class CoreStoreModule { }