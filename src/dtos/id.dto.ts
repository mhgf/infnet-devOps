import { IsNumberString } from 'class-validator';

export class IdParam {
  @IsNumberString()
  id: string;

  get _id() {
    return Number(this.id);
  }
}
