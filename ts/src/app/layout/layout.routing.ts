import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dict', pathMatch: 'full' },
        { path: 'dict', loadChildren: '../dictionary/item-input.module#ItemInputModule' },
        { path: 'synonyms', loadChildren: '../synonyms/synonyms.module#SynonymsModule' },
        { path: 'grammar', loadChildren: '../grammar/grammar.module#GrammarModule' },
         { path: 'user', loadChildren: '../user/user.module#UserModule' }
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
