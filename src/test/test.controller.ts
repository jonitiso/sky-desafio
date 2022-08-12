import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { TestResponse } from './test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testSrv: TestService) {}

  @Get('users')
  async users(): Promise<TestResponse> {
    return await this.testSrv.getUsers();
  }
}
