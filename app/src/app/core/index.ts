import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';

import { CoreStoreModule } from './store';

@NgModule({
    imports: [CoreStoreModule],
    declarations: [],
    exports: [CoreStoreModule],
    providers: []
})
export class CoreModule {
    // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
    // }
}
