import { faker } from '@faker-js/faker';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TaskRepository } from './database/repositories/task.repository';
import { UserRepository } from './database/repositories/user.repository';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private userRepo: UserRepository,
    private taskRepo: TaskRepository,
  ) {}

  async onApplicationBootstrap() {
    const countUser = await this.userRepo.count();
    if (countUser < 2) {
      for (let i = countUser + 1; i < 3; i++) {
        await this.userRepo.save({
          name: faker.person.fullName(),
          email: faker.internet.email(),
        });
      }
    }

    const taskCount = await this.taskRepo.count();

    if (taskCount < 4) {
      const [user1, user2] = await this.userRepo.find();

      await this.taskRepo.save([
        { description: faker.lorem.sentence(6), user: user1 },
        { description: faker.lorem.sentence(6), user: user1 },
        { description: faker.lorem.sentence(6), user: user2 },
        { description: faker.lorem.sentence(6), user: user2 },
      ]);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
