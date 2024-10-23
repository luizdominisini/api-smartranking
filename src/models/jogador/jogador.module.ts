import { Module } from '@nestjs/common';
import JogadorController from './jogador.controller';
import JogadorService from './jogador.service';

@Module({
  controllers: [JogadorController],
  providers: [JogadorService],
})
export default class JogadorModule {}
