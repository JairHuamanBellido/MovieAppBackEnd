import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { MoviePoster } from 'src/dto/response/MovieResponse.dto';
import axios from 'axios';
import { Actor } from './interfaces/Actor.interface';
import { MovieDetails } from 'src/dto/response/MoviesResponse.dto';
config();
@Injectable()
export class MoviesService {
    async findPopular(): Promise<MoviePoster[]> {
        //        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)

        const res = await axios.request<MoviePoster[]>({
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=1`,
            transformResponse: (r: MoviePoster[] | any) => {
                const response: MoviePoster[] = [];

                const results = JSON.parse(r).results;

                results.forEach(element => {
                    const { title, poster_path, id } = element;

                    const movie: MoviePoster = {
                        id: id,
                        poster_path: poster_path,
                        title: title,
                        release_date: element.release_date.slice(0, 4) || null,
                    };

                    response.push(movie);
                });

                return response;
            },
        });

        return res.data;
    }

    async findById(id): Promise<MovieDetails> {
        const res = await axios.request<MovieDetails>({
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
            transformResponse: async (r: MovieDetails | any) => {
                const result: MovieDetails = JSON.parse(r);

                let response: MovieDetails = {
                    id: result.id,
                    actors: await this.findActorsByMovieId(result.id),
                    backdrop_path: result.backdrop_path,
                    genres: result.genres,
                    overview: result.overview,
                    poster_path: result.poster_path,
                    release_date: result.release_date,
                    runtime: result.runtime,
                    title: result.title,
                    vote_average: result.vote_average,
                };

                return response;
            },
        });

        return res.data;
    }

    async findActorsByMovieId(id): Promise<Actor[]> {
        const res = await axios.request<Actor[]>({
            url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`,
            transformResponse: (r: Actor[] | any) => {
                const actors: Actor[] = [];

                const results: Actor[] = JSON.parse(r).cast.slice(0, 4);
                results.forEach(actor => {
                    const { name, character, profile_path } = actor;

                    actors.push({
                        character: character,
                        name: name,
                        profile_path: profile_path,
                    });
                });
                return actors;
            },
        });

        return res.data;
    }
}
