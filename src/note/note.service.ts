import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './create-note.dto';
import { SharedBusinessErrors } from '../shared/shared.business-errors';
import { Validation } from './note.validator';
import { Constants } from './constant';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository : Repository<Note>
  ) {}

    /* Find All Items
    INPUT : 
      void
    OUPUT : 
      Note[] array
  */

  async findAllAsync(): Promise<Note[]> {
    return await this.noteRepository.find();
  }
  /* Create an Element with a DTO and the user id.
    INPUT : 
      id : UUID of the item
      userID : author of the item
    OUPUT : 
      Note object
  */
  createAsync(createNoteDto : CreateNoteDto, userID:string) : Promise<Note>{

    let dto = {author : userID, version : Constants.version,  ...createNoteDto}
    if(!Validation.CreateDtoValidator.IsAcceptable(dto)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - Dto');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note = this.noteRepository.create(dto)
    return this.noteRepository.save(note);
  } 

  /* Find an element by its id in the database. An exception is raised if an element is empty or the author not correspounds.
    INPUT : 
      id : UUID of the item
      userID : author of the item
    OUPUT : 
      Note object
  */
  async findOneAsync(id: string, userID:string): Promise<Note> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note =  await this.noteRepository.createQueryBuilder().whereInIds(id).getOne();
    if(!note) throw new NotFoundException();
    if(note.author != userID) {
      Logger.error("Invalid Author ID");
      throw new NotAcceptableException();
    } 
    return note;
  }
  /* Remove an Element with a DTO and the user id. An exception is raised if element is empty or author not correspound.
    INPUT : 
      id : UUID of the item
      userID : author of the item
    OUPUT : 
      Note object
  */
  async removeAsync(id: string, userID:string): Promise<DeleteResult> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    await this.findOneAsync(id, userID);
    const result = await this.noteRepository.delete(id);
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}



