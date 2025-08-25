import { Component, ViewChild } from '@angular/core';
import { CardholderService } from '../../core/services/cardholder.service';
import { AddCardholderDto, CardholderDto, EditCardholderDto, PagedResponse } from '../../models/cardholders';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { AddCardholderComponent } from './add-cardholder/add-cardholder.component';
import { EditCardholderComponent } from './edit-cardholder/edit-cardholder.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-cardholders',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatTooltipModule,
    MatSortModule
   ],
  templateUrl: './cardholders.html',
  styleUrls: ['./cardholders.scss'],
  standalone: true, 
})

export class Cardholders {
  total: number = 0;
  loading: boolean = true;
  dataSource = new MatTableDataSource<CardholderDto>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'phoneNumber', 'transactionCount', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cardholderService: CardholderService, private dialog: MatDialog) {
     this.dataSource.sortingDataAccessor = (item: CardholderDto, property: string) => {
        if (property === 'transactionCount') {
          return Number(item.transactionCount);
        }
      return (item as any)[property];
    };
  };

  ngOnInit(): void {
      this.loadCardholders();
    }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadCardholders() {
    this.loading = true;
    
    this.cardholderService.getCardholders().subscribe({
        next: (res: PagedResponse<CardholderDto>) => {
          this.dataSource.data = res.items;
          this.total = res.totalCount;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching cardholders', err);
          this.loading = false;
        }
    });
  }

  addCardholder() {
    const dialogRef = this.dialog.open(AddCardholderComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result?: AddCardholderDto) => {
      if (result){
        this.cardholderService.addCardholder(result).subscribe({
            next: () => {
              console.log('Cardholder added');
              this.loadCardholders();
            },
            error: (err) => console.error('Add failed', err)
        });
      }
    })
  }

  editCardholder(cardholder: CardholderDto) {
    const dialogRef = this.dialog.open(EditCardholderComponent, {
      width: '500px',
      data: cardholder
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.cardholderService.editCardholder(result.dto, result.id).subscribe({
            next: () => this.loadCardholders(),
            error: (err) => console.error('Update failed', err)
        })
      }
    })
  }

  deleteCardholder(cardholder: CardholderDto) {
    if (confirm(`Delete ${cardholder.firstName} ${cardholder.lastName}?`)) {
      this.cardholderService.deleteCardholder(cardholder.id).subscribe({
          next: () => this.loadCardholders(),
          error: (err) => console.error('Delete failed', err)
      });
    }
  }
}
