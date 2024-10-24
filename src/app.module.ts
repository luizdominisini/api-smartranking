import { Module } from '@nestjs/common';
import JogadorModule from './models/jogador/jogador.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot(), JogadorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
