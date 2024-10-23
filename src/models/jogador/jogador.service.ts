import { Injectable, Logger } from '@nestjs/common';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorInterface from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class JogadorService {
  private jogadores: JogadorInterface[] = [];
  private readonly logger = new Logger(JogadorService.name);

  async criarAtualizarJogador(dados: CriarJogadorDto) {
    await this.criar(dados);
    return JSON.stringify({ ...dados });
  }

  private criar({ telefoneNumero, email, nome }: CriarJogadorDto) {
    const jogador: JogadorInterface = {
      _id: uuidv4(),
      nome: nome,
      telefoneNumero: telefoneNumero,
      email: email,
      posicaoRanking: 1,
      ranking: 'A',
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log('criaJogadorDto: ', jogador);
    this.jogadores.push(jogador);
  }

  async listarJogadores() {
    return JSON.stringify({ ...this.jogadores });
  }
}
