import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    AddFriendComponent
  ],
  exports: [
    AddFriendComponent
  ]
})
export class AddFriendModule {}
