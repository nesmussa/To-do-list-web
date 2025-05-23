import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { Crud } from './entities/crud.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Crud]),
  ],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}