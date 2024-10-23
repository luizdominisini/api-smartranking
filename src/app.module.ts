import { Module } from '@nestjs/common';
import JogadorModule from './models/jogador/jogador.module';

@Module({
  imports: [JogadorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
