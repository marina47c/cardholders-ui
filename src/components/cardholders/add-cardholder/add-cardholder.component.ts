import { Component } from "@angular/core";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from "@angular/common";
import { AddCardholderDto } from "../../../models/cardholders";

@Component({
    selector: 'add-cardholder',
    imports: [CommonModule, MatDialogModule, MatInputModule, FormsModule, MatButtonModule],
    templateUrl: './add-cardholder.component.html',
    styleUrl: './add-cardholder.component.scss'
})

export class AddCardholderComponent {
    constructor(private dialogRef: MatDialogRef<AddCardholderComponent>) {}

    save(data: AddCardholderDto) {
        this.dialogRef.close(data);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
