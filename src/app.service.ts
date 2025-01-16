import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class AppService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  async getAllTasks() {
    return await this.knex('tasks').select('*');
  }
  async findTask(task){
    const existingTask = await this.knex('tasks').where('task', task.task).first();
    return existingTask
  }
  async addTask(task) {
    const existingTask=this.findTask(task)
    if (existingTask) return null;
    await this.knex('tasks').insert(task);
    return { message: `task inserted ${task.task}` };
  }
  async deleteTask(task) {
    const existingTask=await this.findTask(task)
    if(!existingTask)return null;
    await this.knex('tasks').where('task', task.task).del();
    return { message: `task deleted ${task.task}` };
  }
  async updateTask(task,data){
    const alreadyExists=await this.findTask(task)
    if(!alreadyExists)return null;
   return await this.knex('tasks').where('task',task.task).update({task:data.task},"*")
  }
}
