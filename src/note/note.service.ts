import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './create-note.dto';
import { SharedBusinessErrors } from 'src/shared/shared.business-errors';
import { Validation } from './note.validator';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository : Repository<Note>
  ) {}

  FindAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  Create(createNoteDto : CreateNoteDto) : Promise<Note>{
    if(!Validation.CreateDtoValidator.IsAcceptable(createNoteDto)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - Dto');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note = this.noteRepository.create(createNoteDto)
    return this.noteRepository.save(note);
  } 

  async FindOneAsync(id: string): Promise<Note> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const note =  await this.noteRepository.createQueryBuilder().whereInIds(id).getOne();
    if(!note) throw new NotFoundException();
    return note;
  }

  async RemoveAsync(id: string): Promise<DeleteResult> {
    if(!Validation.UUIDValidator.IsAcceptable(id)) {
      Logger.error(SharedBusinessErrors.InvalidItem, 'NoteService - id');
      throw new NotAcceptableException(SharedBusinessErrors.InvalidItem);
    }
    const result = await this.noteRepository.delete(id);
    if (!result.affected) throw new NotFoundException();
    return result;
  }
}



