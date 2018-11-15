import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SentComponent } from './components/sent/sent.component';
import { WriteComponent } from './components/write/write.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    InboxComponent,
    SentComponent,
    WriteComponent,
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
