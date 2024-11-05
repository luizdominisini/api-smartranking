import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import JogadorModule from '../jogador/jogador.module';
import CategoriaController from './categoria.controller';
import CategoriaService from './categoria.service';
import { CategoriaSchema } from './interfaces/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadorModule,
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export default class CategoriaModule {}
