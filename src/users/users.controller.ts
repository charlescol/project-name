import {  Controller, Post, Res, Body, HttpStatus, NotAcceptableException, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsereDto } from './create-user.dto';
import  { Response } from 'express'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) { }
  /* Function to create new user
     Input : createUserDTO : user to add
     Ouput : (HTTP 201 CREATED)
  */
  @ApiOperation({ summary: 'Creates new User.' })
  @ApiResponse({
    status: 201,
    description: 'User',
    type: User,
  })
  @ApiBody({
    type: CreateUsereDto,
    description: 'User data transfer object',
  })
  @Post('user')
  async createUserAsync(@Body() createUsereDto: CreateUsereDto, @Res() res: Response): Promise<void> {
    try {
      const {password, ...result} = await this.appService.createAsync(createUsereDto);
      res.status(HttpStatus.CREATED).json(result);
    }
    catch (e) {
        this._catchError(e, res);
    }
  }

  private _catchError(e , res) {
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
        Logger.error(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }

}