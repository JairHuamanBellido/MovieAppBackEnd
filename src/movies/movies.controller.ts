import { Controller, Get, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Response } from 'express';
import { Movie } from 'src/dto/response/MovieResponse.dto';

@Controller('api/movies')
export class MoviesController {



    constructor(private readonly movieService:MoviesService){}


    @Get("/popular")
    async findPopular(@Res() res:Response){

        const popularMovies =  await  this.movieService.findPopular();

        res.json(popularMovies);


    }
}
