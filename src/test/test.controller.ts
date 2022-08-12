import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testSrv: TestService) {}

  @Get('users')
  async users() {
    return await this.testSrv.getUsers();
  }
}
