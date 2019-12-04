import { Injectable } from '@nestjs/common';
import {  config} from "dotenv";
import { Movie } from 'src/dto/response/MovieResponse.dto';
import axios from "axios";
config();
@Injectable()
export class MoviesService {



    async findPopular():Promise<Movie>{

        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`) 
        
        // const res  = await axios.request<Movie>({
        //     url: `https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`,
        //     transformResponse: (r: Movie | any) => JSON.parse(r)
            
        // })



        return res.data.results;
    }
    
}
