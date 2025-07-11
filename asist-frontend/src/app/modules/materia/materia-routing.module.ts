import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriaComponent } from './components/materia.component';

const routes: Routes = [
    {
        path: ':idMateria',
        component: MateriaComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MateriaRoutingModule {}