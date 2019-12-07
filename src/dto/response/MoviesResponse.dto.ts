import { Actor } from "src/movies/interfaces/Actor.interface";
import { Gender } from "src/movies/interfaces/Gender.interface";

export interface MovieDetails{
    id:number;
    backdrop_path:string;
    poster_path:string;
    overview:string;
    title:string;
    vote_average:number;
    actors:Actor[];
    release_date:string;
    runtime:number;
    genres:Gender[]
}