import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CategoriaController from './categoria.controller';
import CategoriaService from './categoria.service';
import { CategoriaSchema } from './interfaces/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export default class CategoriaModule {}
