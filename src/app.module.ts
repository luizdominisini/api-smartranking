import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import CategoriaModule from './models/categoria/categoria.module';
import JogadorModule from './models/jogador/jogador.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://smartRanking:${process.env.DB_PASSWORD}@smartranking.n9oxy.mongodb.net/?retryWrites=true&w=majority&appName=smartRanking`,
    ),
    JogadorModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
