import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Movie, MovieResponse } from '../../interfaces/movie';
import { ApiMovieService } from '../../services/api-movie-service.service';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.scss']
})
export class DisplayMoviesComponent {
  show = false;
  filtered = false;
  movies: Movie[] = [];
  displayedMovies: Movie[] = [];
  search: string;
  displayedColumns: string[] = ['tytul', 'rezyser', 'producent', 'dlugosc', 'ocena', 'buttons'];
  @ViewChild(MatTable) table: MatTable<Movie>;

  constructor(
    private dialog: MatDialog,
  ){}

  api = inject(ApiMovieService);

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
    this.displayedMovies = [];
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = 10;
    this.pageIndex = e.pageIndex;
    for(let i=this.pageIndex*10; i<this.pageIndex*10+10;i++){
      if(this.movies[i]){
        this.displayedMovies.push(this.movies[i])
      }
    }
  }

  showMovies(){
    this.show = true;
  }

  hideMovies(){
    this.show = false;
  }

  getMovies(){
    this.filtered = false;
    this.movies = [];
    this.displayedMovies = [];
    this.showMovies();
    this.pageIndex = 0;
    this.api.getMovies().subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
      this.length = this.movies.length;
      for(let i=0; i<10;i++){
        if(this.movies[i]){
          this.displayedMovies.push(this.movies[i]);
        }
      }
      this.table.renderRows();
    })
  }

  getFilteredMovies(){
    this.filtered = true;
    this.movies = [];
    this.displayedMovies = [];
    this.pageIndex = 0;
    this.api.getFilteredMovies(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
      this.length = this.movies.length;
      for(let i=0; i<10;i++){
        if(this.movies[i]){
          this.displayedMovies.push(this.movies[i]);
        }
      }
      this.table.renderRows();
    })
  }

  addMovie(){
    const dialogRef = this.dialog.open(AddMovieDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.postMovie(res).subscribe(
        (response) => {
          let newMovie: Movie = response.data;
          this.movies.push(newMovie);
          this.length += 1;
          this.displayedMovies = [];
          for(let i=this.pageIndex*10; i<this.pageIndex*10+10;i++){
            if(this.movies[i]){
              this.displayedMovies.push(this.movies[i])
            }
          }
          this.table.renderRows();
        },);
    });
  }

  updateMovie(id: number, index: number){
    const dialogRef = this.dialog.open(AddMovieDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data:{
        ...this.displayedMovies[index],
        isEdit: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.putMovie(id, res).subscribe(
        (response : MovieResponse) => {
          let newMovie: Movie = response.data;
          this.displayedMovies[index] = newMovie;
          this.movies[this.pageSize*this.pageIndex+index] = newMovie;
          this.table.renderRows();
        }
      )
    });
  }

  deleteMovie(id: number, index: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '200px',
      minHeight: '100px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.api.deleteMovie(id).subscribe(
        (response) => {
          this.length -= 1;
          this.table.renderRows();
        },);
      this.displayedMovies.splice(index, 1);
      this.movies.splice(this.pageSize*this.pageIndex+index,1);
      this.pageSize -= 1;
    });
  }


}
