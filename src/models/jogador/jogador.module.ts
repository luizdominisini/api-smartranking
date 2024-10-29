import { Module } from '@nestjs/common';
import JogadorController from './jogador.controller';
import JogadorService from './jogador.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  controllers: [JogadorController],
  providers: [JogadorService],
})
export default class JogadorModule {}
