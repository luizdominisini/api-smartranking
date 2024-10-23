import { Body, Controller, Get, Post } from '@nestjs/common';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorService from './jogador.service';

@Controller('api/v1/jogador')
export default class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Post()
  async criarAtualizarJogador(@Body() dados: CriarJogadorDto) {
    return this.jogadorService.criarAtualizarJogador(dados);
  }

  @Get()
  async listarJogadores() {
    return this.jogadorService.listarJogadores();
  }
}
