import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from "./components/sign-up/sign-up.component";


const routes: Routes = [
{path:'',redirectTo:'logIn', pathMatch:'full'},
{path:'logIn', component: LogInComponent},
{path:'logIn/signUp', component: SignUpComponent},
{path:'signUp', component: SignUpComponent},
{path:'products', component: ProductsComponent},
{path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
