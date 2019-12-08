import { Controller, Get, Res, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Response } from 'express';


@Controller('api/movies')
export class MoviesController {



    constructor(private readonly movieService:MoviesService){}


    @Get("/popular")
    async findPopular(@Res() res:Response){

        const popularMovies =  await  this.movieService.findPopular();

        res.json(popularMovies);


    }

    @Get("/:id")
    async findById(@Res() res:Response, @Param() params){
        const movie = await this.movieService.findById(params.id)
        res.json(movie);
    }

    @Get("credits/:id")
    async findActorsByMovieId(@Res() res:Response, @Param() params){
        const movie = await this.movieService.findActorsByMovieId(params.id)
        res.json(movie);
    }

    @Get("/similar/:id")
    async findSilimarMovieById(@Res() res:Response, @Param() params){
        const movie = await this.movieService.findSimilarMovies(params.id)
        res.json(movie);
    }

}
