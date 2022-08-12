import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { TestResponse } from './test.dto';

@Injectable()
export class TestService {
  constructor(
    private readonly http: HttpService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async getUsers(): Promise<TestResponse> {
    const { data } = await this.http.axiosRef.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    // Campo address a eliminar
    const usersWithoutAddress = data.map((e) => ({
      ...e,
      address: undefined,
    }));

    // Ordernar por id descendente
    const usersSortByIdDesc = usersWithoutAddress.sort((a, b) => b.id - a.id);

    // Usuarios con id par
    const evenUsersById = data.filter((e) => e.id % 2 === 0);

    this.amqpConnection.publish('users', 'users-requested', {
      users: evenUsersById,
    });

    return usersSortByIdDesc;
  }
}
