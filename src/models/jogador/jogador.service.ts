import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorInterface from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export default class JogadorService {
  private jogadores: JogadorInterface[] = [];
  private readonly logger = new Logger(JogadorService.name);

  async criarJogador({
    telefoneNumero,
    email,
    nome,
  }: CriarJogadorDto): Promise<JogadorInterface> {
    const jogadorEmailExiste = this.jogadores.find((v) => v.email == email);
    const jogadorTelefoneExiste = this.jogadores.find(
      (v) => v.telefoneNumero == telefoneNumero,
    );

    if (jogadorEmailExiste || jogadorTelefoneExiste) {
      throw new BadRequestException('Jogador já existe na base de dados.');
    }

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

    return jogador;
  }

  async atualizarJogador(email: string, nome: string) {
    const jogador = this.buscarJogadorPorEmail(email);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado na base de dados.');
    } else if (!nome) {
      throw new BadRequestException('Nome é obrigatório.');
    }

    jogador.nome = nome;
    return jogador;
  }

  async consultaJogadores(
    email: string,
  ): Promise<JogadorInterface | JogadorInterface[]> {
    if (email) {
      const jogador = this.buscarJogadorPorEmail(email);
      return jogador;
    }
    return this.jogadores;
  }

  async deletarJogador(email: string) {
    const jogador = this.buscarJogadorPorEmail(email);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado na base de dados.');
    }

    this.jogadores = this.jogadores.filter((v) => v.email !== jogador.email);
    return this.jogadores;
  }

  private buscarJogadorPorEmail(email: string) {
    const jogador = this.jogadores.find((v) => (v.email = email));
    return jogador;
  }
}
