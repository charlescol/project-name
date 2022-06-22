import { CreateNoteDto } from './create-note.dto';

export namespace Validation {
  function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}

  export interface IStringValidation {
    IsAcceptable(s: string): boolean;
  }

  @staticImplements<IStringValidation>()
  export class UUIDValidator {
    static IsAcceptable(id: string): boolean {
      return true; //uuidValidate(id);
    }
  }

  @staticImplements<IStringValidation>()
  export class DateValidator  {
    static IsAcceptable(date: string): boolean {
      return !isNaN(Date.parse(date))
    }
  }

  @staticImplements<IStringValidation>()
  export class VersionValidator {
    static IsAcceptable(version: string): boolean {
      return version && version.length == 5;
    }
  }

  @staticImplements<IStringValidation>()
  export class TitleValidator {
    static IsAcceptable(title: string): boolean {
      return title && title.length <= 20;
    }
  }

  export class CreateDtoValidator {
    static IsAcceptable(dto: CreateNoteDto): boolean {
      return dto && UUIDValidator.IsAcceptable(dto.author) && DateValidator.IsAcceptable(dto.date) 
      && VersionValidator.IsAcceptable(dto.version) && TitleValidator.IsAcceptable(dto.title);
    }
  }

}