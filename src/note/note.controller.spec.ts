import { Test } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import {v4 as uuidv4} from 'uuid';
import { Logger } from '@nestjs/common';
import { CreateNoteDto } from './create-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { execPath } from 'process';
var httpMocks = require('node-mocks-http');


describe('NoteController', () => {
  let noteController: NoteController;
  let noteService: NoteService;

  let createRandomNote = () =>  {
    let id = uuidv4();
    let authorID = uuidv4();
    const now = new Date()
    const date = now.getFullYear() + ':' + now.getMonth() + ':' + now.getDay();
    return new Note(id, date, '01.00', authorID, 'Title', 'Content');
    }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [NoteController],
        providers: [{
            provide: NoteService,
            useValue:{
             findAllAsync: jest.fn(async function () {return [createRandomNote()];} ),
             create : jest.fn(function (createDTO, id)  {return createRandomNote();}),
             findOneAsync : jest.fn(async function(id: string, userID:string) {return createRandomNote();})
            },
          }],
      }).compile();

    noteService = moduleRef.get<NoteService>(NoteService);
    noteController = moduleRef.get<NoteController>(NoteController);
  });

  describe('getAllAsync', () => {
    it('should return an array of notes', async () => {
        const result = [];
        var response = httpMocks.createResponse();
        noteController.getAllAsync(response);

        expect(noteService.findAllAsync).toHaveBeenCalled();
        //expect().toBe(result);
    });

//   describe('createNote', () => {

//     it('should return a note', async () => {
//         const result = [];
//         var response = httpMocks.createResponse();
//         var req = httpMocks.createRequest();

//         let note = createRandomNote();
//         let dto = new CreateNoteDto(note.date, note.version, note.author, note.title, note.content);

//         noteController.createNote(dto, response, req);

//         expect(noteController).toBeDefined();

//         expect(noteService.create).toHaveBeenCalled();
//     });
//   });

  describe('getOneAsync', () => {

    it('should return a note', async () => {
        const result = [];
        var response = httpMocks.createResponse();
        var req = httpMocks.createRequest({
            params: {
                id: 42
              }
        });

        let note = createRandomNote();
        let dto = new CreateNoteDto(note.date, note.version, note.author, note.title, note.content);

        noteController.getOneAsync(note.id, response, req);
        expect(noteController).toBeDefined();
        expect(noteService.findOneAsync).toHaveBeenCalledWith(note.id);
    });
  });
})});