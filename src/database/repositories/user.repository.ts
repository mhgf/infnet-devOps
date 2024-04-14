import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserModel } from '../Entities/user.model';

@Injectable()
export class UserRepository extends Repository<UserModel> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(UserModel, dataSource.createEntityManager());
  }
}
