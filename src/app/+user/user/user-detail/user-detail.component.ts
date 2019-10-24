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
  
  @Input() user: User;
  @Input() mode: string;

  @Output() readonly cancelClick: EventEmitter<void> = new EventEmitter();
  @Output() readonly saveClick: EventEmitter<User> = new EventEmitter();
  @Output() readonly deleteClick: EventEmitter<UniqueId> = new EventEmitter();

  form: FormGroup;

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
      firstname: [
        resource.firstname,
        this.valSrv.validators.firstname
      ],
      lastname: [
        resource.lastname,
        this.valSrv.validators.lastname
      ],
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

    if (this.mode === 'edit') {
      this.form.get('username').disable();
      this.form.get('password').clearValidators();
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
      ...this.user,
      ...this.form.value
    };

    callback.emit(resource);
  }
}
