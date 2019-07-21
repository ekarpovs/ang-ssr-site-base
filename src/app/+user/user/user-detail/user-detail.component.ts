import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';
import { getOrNil } from '~/app/shared';
import { initialUser, User } from '~/app/store';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild('delete') deleteRef: ElementRef;
  @ViewChild('submit') submitRef: ElementRef;
  @Input() user: User;
  @Output() readonly deleteClick: EventEmitter<UniqueId> = new EventEmitter();
  @Output() readonly saveClick: EventEmitter<User> = new EventEmitter();
  userForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    const resource = getOrNil(initialUser)(this.user);

    if (!resource._id) {
      (this.deleteRef as any).disabled = true;
    }

    this.userForm = this.formBuilder.group({
      _id: resource._id,
      name: [
        resource.name,
        {
          validators: [Validators.required, Validators.maxLength(255)],
          updateOn: 'blur'
        }
      ]
    });
  }

  onDelete(callback: EventEmitter<UniqueId>): void {
    callback.emit(this.userForm.get('_id').value);
  }

  onSave(callback: EventEmitter<User>): void {
    const resource = {
      _id: this.userForm.get('_id').value,
      name: this.userForm.get('name').value
    };

    callback.emit(resource);
  }
}
