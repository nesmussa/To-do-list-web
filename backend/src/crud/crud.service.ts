import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { Repository } from 'typeorm';
import {Crud} from './entities/crud.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CrudService {
  constructor(
  @InjectRepository(Crud)
  private readonly crudrepostery: Repository<Crud>) {}
  async create(createCrudDto: CreateCrudDto) {
    const task = this.crudrepostery.create(createCrudDto)
    return await this.crudrepostery.save(task);
  }

  async findAll() {
    return await this.crudrepostery.find()
  }

  async findOne(id: number) {
    return await this.crudrepostery.find({where:{id}});
  }

  async update(id: number, updateCrudDto: UpdateCrudDto) {
    const updatableTask = await this.crudrepostery.findOneBy({ id }); // Use findOneBy

    if (!updatableTask) {
      throw new NotFoundException(`Task with ID ${id} not found for update`); // Use NestJS NotFoundException
    }
    Object.assign(updatableTask, updateCrudDto);
    return await this.crudrepostery.save(updatableTask);
  }
  async remove(id: number) {
   const task= await this.crudrepostery.findOneBy({ id });
   if(!task){
     throw new NotFoundError("There is no task with this")
   }
  
   return await this.crudrepostery.remove(task);
  }
  }

