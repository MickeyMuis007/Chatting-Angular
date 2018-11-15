import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { WriteComponent } from './components/write/write.component';
import { SentComponent } from './components/sent/sent.component';
import { InboxComponent } from './components/inbox/inbox.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'inbox', component: InboxComponent },
    { path: 'sent', component: SentComponent },
    { path: 'write', component: WriteComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

