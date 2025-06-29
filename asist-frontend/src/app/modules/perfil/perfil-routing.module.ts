import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil.component';
import { SavePerfilComponent } from './components/save-perfil/save-perfil.component';

const routes: Routes = [
    { path: '', component: PerfilComponent },
    { path: 'edit-perfil', component: SavePerfilComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule { }