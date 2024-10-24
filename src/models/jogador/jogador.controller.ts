import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorService from './jogador.service';

@Controller('api/v1/jogador')
export default class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Post()
  async criarJogador(@Body() dados: CriarJogadorDto) {
    return this.jogadorService.criarJogador(dados);
  }

  @Get(':email?')
  async consultaJogadores(@Param('email') email: string) {
    return this.jogadorService.consultaJogadores(email);
  }

  @Put(':email')
  async atualizarJogador(
    @Param('email') email: string,
    @Body('nome') nome: string,
  ) {
    return this.jogadorService.atualizarJogador(email, nome);
  }

  @Delete(':email')
  async deletarJogador(@Param('email') email: string) {
    return this.jogadorService.deletarJogador(email);
  }
}
