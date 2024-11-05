import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JogadorValicaoPipe } from '../../common/pipes/validacao.pipe';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorService from './jogador.service';

@Controller('api/v1/jogador')
export default class JogadorController {
  constructor(private readonly jogadorService: JogadorService) {}

  @Post()
  async criarJogador(@Body() dados: CriarJogadorDto) {
    return this.jogadorService.criarJogador(dados);
  }

  @Get(':_id?')
  async consultaJogadores(@Param('_id') _id: string) {
    return this.jogadorService.consultaJogadores(_id);
  }

  @Put(':_id')
  async atualizarJogador(
    @Param('_id') _id: string,
    @Body('nome') nome: string,
  ) {
    return this.jogadorService.atualizarJogador(_id, nome);
  }

  @Delete(':_id')
  async deletarJogador(@Param('_id', JogadorValicaoPipe) _id: string) {
    return this.jogadorService.deletarJogador(_id);
  }
}
