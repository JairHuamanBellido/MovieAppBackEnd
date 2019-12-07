import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { MoviePoster } from 'src/dto/response/MovieResponse.dto';
import axios from 'axios';
config();
@Injectable()
export class MoviesService {
    async findPopular(): Promise<MoviePoster[]> {
        //        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)

        const res = await axios.request<MoviePoster[]>({
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=1`,
            transformResponse: (r: MoviePoster[] | any ) => {
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

    async findById(id): Promise<any> {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
        );

        return res.data;
    }
}
