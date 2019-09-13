import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';
import { getOrNil } from '~/app/shared';
import { initialUser, User } from '~/app/store';

import { UserValidationService } from './user-validation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild('cancel') cancelRef: ElementRef;
  @ViewChild('submit') submitRef: ElementRef;
  @ViewChild('delete') deleteRef: ElementRef;
  
  @Input() user: User;
  @Input() deleteCommand: boolean;

  @Output() readonly cancelClick: EventEmitter<void> = new EventEmitter();
  @Output() readonly saveClick: EventEmitter<User> = new EventEmitter();
  @Output() readonly deleteClick: EventEmitter<UniqueId> = new EventEmitter();

  form: FormGroup;
  editMode = false;

  // Convenience getter for easy access to form fields 
  get f(): any {
    return this.form.controls;
  }

  // Messages via i18n
  get m(): any {
    return this.valSrv.messages;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly valSrv: UserValidationService) {
    super();
  }

  ngOnInit(): void {
    const resource = getOrNil(initialUser)(this.user);

    this.form = this.formBuilder.group({
      _id: resource._id,
      email: [
        resource.email,
        this.valSrv.validators.email
      ],
      password: [
        '',
        this.valSrv.validators.psssword
      ],       
      username: [ 
        resource.username,
        this.valSrv.validators.username
      ]
    });

    // Edit mode
    if (resource._id) {
      this.form.get('username').disable();
      this.editMode = true;
    } 
  }

  onDelete(callback: EventEmitter<UniqueId>): void {
    callback.emit(this.form.get('_id').value);
  }

  onCancel(callback: EventEmitter<void>): void {
    callback.emit();
  }

  onSave(callback: EventEmitter<User>): void {

    const resource = {
      _id: this.form.get('_id').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,  
      username: this.form.get('username').value
    };

    callback.emit(resource);
  }
}
