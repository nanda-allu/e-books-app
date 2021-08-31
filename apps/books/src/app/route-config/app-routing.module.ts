import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouteConfig } from './routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(RouteConfig.ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
