import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from "@angular/common";
import { CardholderDto, EditCardholderDto } from "../../../models/cardholders";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'edit-cardholder',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './edit-cardholder.component.html',
    styleUrls: ['./edit-cardholder.component.scss']
})

export class EditCardholderComponent {
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<EditCardholderComponent>, 
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: CardholderDto
    ) {
        this.form = this.fb.group({
            firstName: [ data.firstName, Validators.required],
            lastName: [data.lastName, Validators.required],
            address: [data.address],
            phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^\+\d+$/)]],
            transactionCount: [data.transactionCount, [Validators.required, Validators.min(0)]],
        });
    }

    save() {
        if (this.form.invalid) return;
        this.dialogRef.close({ id: this.data.id, dto: this.form.value });
    }

    cancel() {
        this.dialogRef.close(null);
    }
}