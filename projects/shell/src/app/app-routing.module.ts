import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('admin/Module').then(m => m.AppModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('dashboard/Module').then(m => m.AppModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
