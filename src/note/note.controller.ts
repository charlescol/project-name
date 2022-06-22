import { Body, Controller, Delete, Get, HttpStatus, Request, NotAcceptableException, Post, Res, UseGuards, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './create-note.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiExtraModels, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Note } from './note.entity';

@ApiHeader({
  name: 'Bearer',
  description: 'User Access Token',
})
@Controller('note')
export class NoteController {
  constructor(private readonly appService: NoteService) { }

  /* Function to create new notes
     Input : createNoteDto : notes to add
     Ouput : (HTTP 201 CREATED)
  */
  @ApiOperation({ summary: 'Create new Note.' })
  @ApiResponse({
    status: 201,
    description: 'Note',
    type: Note,
  })
  @ApiBody({
    type: CreateNoteDto,
    description: 'Note data transfer object',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createNoteAsync(@Body() createNoteDto: CreateNoteDto, @Res() res: Response, @Request() req): Promise<void> {
    try {
      const item = await this.appService.createAsync(createNoteDto, req.user.userId);
      res.status(HttpStatus.CREATED).json(item);
    }
    catch (e) {
      this._catchError(e, res);
    }
  }
  /* Function to get one note
     Input : id (as string) of the note
     Ouput : json format : NoteEntity (HTTP 200 OK)
  */
  @ApiOperation({ summary: 'Get one Note.' })
  @ApiResponse({
    status: 200,
    description: 'Note',
    type: Note,
  })
  @ApiBody({
    type: String,
    description: 'Note\'s id.',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOneAsync(@Body() id: string, @Res() res: Response, @Request() req) {
    try {
      const item = await this.appService.findOneAsync(id["id"], req.user.userId)
      res.status(HttpStatus.OK).json(item);
    }
    catch (e) {
      this._catchError(e, res);
    }
  }
  /* Function to get all notes
     Input : void
     Ouput : json format : list of NoteEntity (HTTP 200 OK
  */
  @ApiOperation({ summary: 'Get all Notes.' })
  @ApiResponse({
    status: 200,
    description: 'Array of Notes',
    type: [Note],
  })
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAllAsync(@Res() res: Response) {
    try {
      const items = await this.appService.findAllAsync()
      res.status(HttpStatus.OK).json(items);
    }
    catch (e) {
      this._catchError(e, res);
    }
  }
  /* Function to remove one note
     Input : id (as string) of the note to remove
     Ouput : (HTTP 200 OK)
  */
  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiBody({
    type: String,
    description: 'Note\'s id.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteOneAsync(@Body() id: string, @Res() res: Response, @Request() req) {
    try {
      await this.appService.removeAsync(id["id"], req.user.userId);
      res.status(HttpStatus.OK).send();
    }
    catch (e) {
      this._catchError(e, res);
    }
  }
  /* Function which manages responses when an exception is raised 
     Input : e (Exception object), res (Response object)
     Ouput : void 
  */
  private _catchError(e, res): void {
    switch (true) {
      case (e instanceof NotAcceptableException || e instanceof NotFoundException): {
        res.status(HttpStatus.BAD_REQUEST).send();
        break;
      }
      case (e instanceof UnauthorizedException): {
        res.status(HttpStatus.UNAUTHORIZED).send();
        break;
      }
      default: {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}