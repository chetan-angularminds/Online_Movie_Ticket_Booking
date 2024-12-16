import { ObjectId } from 'mongodb';

export interface Movie {
  _id: ObjectId;
  title: string;
  description: string;
  duration: number;
  releaseDate: Date;
  genre: string[];
  language: string[];
  poster: string;
}

export interface Theater {
  _id: ObjectId;
  name: string;
}

export interface Show {
  movie: ObjectId;
  theater: ObjectId;
  showTime: string[];
  date: Date;
  availableSeats: number;
  bookedSeats: { row: number; seatNumber: number }[];
}