import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';
import JogadorController from './jogador.controller';
import JogadorService from './jogador.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  controllers: [JogadorController],
  providers: [JogadorService],
  exports: [JogadorService],
})
export default class JogadorModule {}
