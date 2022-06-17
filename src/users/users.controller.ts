import {  Controller, Post, Res, Body, HttpStatus, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsereDto } from './create-user.dto';
import  { Response } from 'express'

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) { }

  @Post('user')
  async createUserAsync(@Body() createUsereDto: CreateUsereDto, @Res() res: Response): Promise<void> {
    try {
      await this.appService.createAsync(createUsereDto);
      res.status(HttpStatus.CREATED).send();
    }
    catch (e) {
        this._catchError(e, res);
    }
  }

  private _catchError(e, res) {
    switch (true) {
      case (e instanceof NotAcceptableException || e instanceof NotFoundException): {
        res.status(HttpStatus.BAD_REQUEST).send();
        break;
      }
      case (e instanceof UnauthorizedException) : {
        res.status(HttpStatus.UNAUTHORIZED).send();
        break;
      }
      default : {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }

}