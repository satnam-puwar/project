import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTasks() {
    return this.appService.getAllTasks();
  }
  @Post('/add')
  async addTask(@Body() task: any) {
    const result = await this.appService.addTask(task);
    console.log(result, 'result');
    if (!result) throw new HttpException('task already exists', 401);
    return result;
  }
  @Delete('/delete/:task')
  async deleteTask(@Param() task: any) {
    const result = await this.appService.deleteTask(task);
    if (!result) throw new HttpException("task doesn't exists", 401);
    return result;
  }
  @Put(':task')
  async updateTask(@Param() task: any, @Body() data: any) {
    const result=await this.appService.updateTask(task, data);
    if(!result)throw new HttpException("task doesn't exists",401)
    return result
  }
}
