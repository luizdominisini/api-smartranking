import { Module } from '@nestjs/common';
import JogadorModule from './models/jogador/jogador.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://smartRanking:${process.env.DB_PASSWORD}@smartranking.n9oxy.mongodb.net/?retryWrites=true&w=majority&appName=smartRanking`,
    ),
    JogadorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
