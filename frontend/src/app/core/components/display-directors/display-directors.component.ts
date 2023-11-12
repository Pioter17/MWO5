import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { filter } from 'rxjs';
import { Director } from '../../interfaces/director';
import { ApiDirectorService } from '../../services/api-director.service';
import { AddDirectorDialogComponent } from '../add-director-dialog/add-director-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display-directors',
  templateUrl: './display-directors.component.html',
  styleUrls: ['./display-directors.component.scss']
})
export class DisplayDirectorsComponent {
  show = false;
  filtered = false;
  directors: Director[] = [];
  displayedDirectors: Director[] = [];
  search: string;
  displayedColumns: string[] = ['Imie i nazwisko', 'narodowosc', 'wiek', 'buttons'];
  @ViewChild(MatTable) table: MatTable<Director>;

  constructor(
    private dialog: MatDialog,
  ){}

  api = inject(ApiDirectorService);

  length = 40
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.displayedDirectors = [];
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = 10;
    this.pageIndex = e.pageIndex;
    for(let i=this.pageIndex*10; i<this.pageIndex*10+10;i++){
      if(this.directors[i]){
        this.displayedDirectors.push(this.directors[i])
      }
    }
  }


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
    this.displayedDirectors = [];
    this.showDirectors();
    this.pageIndex = 0;
    this.api.getDirectors().subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
      this.length = this.directors.length;
      for(let i=0; i<10;i++){
        if(this.directors[i]){
          this.displayedDirectors.push(this.directors[i])
        }
      }
      this.table.renderRows();
    })
  }

  getFilteredDirectors(){
    this.filtered = true;
    this.directors = [];
    this.displayedDirectors = [];
    this.pageIndex = 0;
    this.api.getFilteredDirectors(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
      this.length = this.directors.length;
      for(let i=0; i<10;i++){
        if(this.directors[i]){
          this.displayedDirectors.push(this.directors[i])
        }
      }
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
          this.length += 1;
          this.displayedDirectors = [];
          for(let i=this.pageIndex*10; i<this.pageIndex*10+10;i++){
            if(this.directors[i]){
              this.displayedDirectors.push(this.directors[i])
            }
          }
          this.table.renderRows();
        },);
    });
  }

  updateDirector(id: number, index: number){
    const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data:{
        ...this.displayedDirectors[index],
        isEdit: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.putDirector(id, res).subscribe(
        (response) => {
          let newDirector: Director = response;
          this.displayedDirectors[index] = newDirector;
          this.directors[this.pageSize*this.pageIndex+index] = newDirector;
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
          this.length -= 1;
          this.table.renderRows();
        },);
        this.displayedDirectors.splice(index, 1);
        this.directors.splice(this.pageSize*this.pageIndex+index,1);
        this.pageSize -= 1;
    });
  }
}
