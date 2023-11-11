import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { filter } from 'rxjs';
import { Director } from '../../interfaces/director';
import { ApiDirectorService } from '../../services/api-director.service';
import { AddDirectorDialogComponent } from '../add-director-dialog/add-director-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-display-directors',
  templateUrl: './display-directors.component.html',
  styleUrls: ['./display-directors.component.scss']
})
export class DisplayDirectorsComponent {
  show = false;
  filtered = false;
  directors: Director[] = [];
  search: string;
  displayedColumns: string[] = ['Imie i nazwisko', 'narodowosc', 'wiek', 'buttons'];
  @ViewChild(MatTable) table: MatTable<Director>;

  constructor(
    private dialog: MatDialog,
  ){}

  api = inject(ApiDirectorService);

  private showDirectors(){
    this.show = true;
  }

  hideDirectors(){
    this.show = false;
  }

  getDirectors(){
    this.search = "";
    this.filtered = false;
    this.directors = [];
    this.showDirectors();
    this.api.getDirectors().subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
      this.table.renderRows();
    })
  }

  getFilteredDirectors(){
    this.filtered = true;
    this.directors = [];
    this.api.getFilteredDirectors(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
      this.table.renderRows();
    })
  }

  addDirector(){
    const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.postDirector(res).subscribe(
        (response) => {
          let newDirector: Director = response;
          this.directors.push(newDirector);
        },);
        this.table.renderRows();
    });
  }

  updateDirector(id: number, index: number){
    const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data:{
        ...this.directors[index],
        isEdit: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.putDirector(id, res).subscribe(
        (response) => {
          let newDirector: Director = response;
          this.directors[index] = newDirector;
          this.table.renderRows();
        }
      )
    });
  }

  deleteDirector(id: number, index: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '200px',
      minHeight: '100px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.api.deleteDirector(id).subscribe(
        (response) => {
          this.table.renderRows();
        },);
      this.directors.splice(index, 1);
    });
  }
}
