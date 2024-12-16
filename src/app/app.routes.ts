import { Routes } from '@angular/router';
import { NewTheaterRegistrationComponent } from './pages/admin/new-theater-registration/new-theater-registration.component';
import { NewMovieRegistrationComponent } from './pages/admin/new-movie-registration/new-movie-registration.component';
import { AddMovieShowsComponent } from './pages/admin/add-movie-shows/add-movie-shows.component';
import { MoviesListComponentComponent } from './shared/reusableComponents/movies-list-component/movies-list-component.component';
import { MovieDetailsComponentComponent } from './shared/reusableComponents/movie-details-component/movie-details-component.component';
import { MovieManageComponent } from './pages/admin/movie-manage/movie-manage.component';
import { MoviesPanelComponent } from './pages/admin/movies-panel/movies-panel.component';
import { TheatersListComponent } from './shared/reusableComponents/theaters-list/theaters-list.component';
import { MovieDetailsUserComponent } from './pages/user/movie-details-user/movie-details-user.component';
import { BookingComponent } from './pages/user/ticket-booking/booking/booking.component';
import { BookingDetailsComponent } from './pages/user/booking-details/booking-details.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { TheatersPanelComponent } from './pages/admin/theaters-panel/theaters-panel.component';
import { MovieShowsListComponent } from './pages/admin/movie-shows-list/movie-shows-list.component';
import { ManageTheatersComponent } from './pages/admin/manage-theaters/manage-theaters.component';
import { ManageShowComponent } from './pages/admin/manage-show/manage-show.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                component: MoviesListComponentComponent
            },
            {
                path: 'movie-details/:id',
                component: MovieDetailsUserComponent
            },
            {
                path: 'theaters-list',
                component: TheatersListComponent
            },
            {
                path: 'book-ticket/:id',
                component: BookingComponent
            },
            {
                path: 'booking-details/:id',
                component: BookingDetailsComponent
            },
            {
                path: 'my-bookings',
                component: MyBookingsComponent
            }
        ]
    },
    {
        path:'admin',
        children: [
            {
                path: 'theaters',
                component: TheatersPanelComponent
            },
            {
                path: 'movies',
                component: MoviesPanelComponent
            },
            {
                path: 'add-shows/:id',
                component: AddMovieShowsComponent
            },
            {
                path: 'add-new-movie',
                component: NewMovieRegistrationComponent
            },
            {
                path: 'movie-details/:id',
                component: MovieManageComponent
            },
            {
                path: 'add-new-theater',
                component: NewTheaterRegistrationComponent
            },
            {
                path:'movie-shows/:id',
                component: MovieShowsListComponent
            },
            {
                path: 'manage-theater/:id',
                component: ManageTheatersComponent
            },
            {
                path: 'manage-show/:id',
                component: ManageShowComponent
            },
            {
                path: '',
                redirectTo: 'movies',
                pathMatch: 'full'
            }
        ]
    }
];
