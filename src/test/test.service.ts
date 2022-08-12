import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TestService {
  constructor(
    private readonly http: HttpService,
    @Inject('USERS_SERVICE') private readonly busClient: ClientProxy,
  ) {}

  async getUsers(): Promise<any> {
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

    console.log('evenUsersById', evenUsersById);

    // Evento a la cola
    this.busClient.emit('users-requested', {
      users: evenUsersById,
    });

    return usersSortByIdDesc;
  }
}
