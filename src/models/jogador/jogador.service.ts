import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getSomenteNumero from '../../geral/conversao.service';
import CriarJogadorDto from './dtos/criar-jogador.dto';
import JogadorInterface from './interfaces/jogador.interface';

@Injectable()
export default class JogadorService {
  private readonly logger = new Logger(JogadorService.name);

  constructor(
    @InjectModel('Jogador')
    private readonly jogadorModel: Model<JogadorInterface>,
  ) {}

  async criarJogador({
    telefoneNumero,
    email,
    nome,
  }: CriarJogadorDto): Promise<JogadorInterface> {
    const jogadorEmailExiste = await this.buscarJogadorPorEmail(email);

    const jogadorTelefoneExiste = await this.jogadorModel
      .findOne({
        telefoneNumero,
      })
      .exec();

    if (jogadorEmailExiste || jogadorTelefoneExiste) {
      throw new BadRequestException('Jogador já existe na base de dados.');
    }

    const telefoneNumeroFormatado = getSomenteNumero(telefoneNumero);

    const jogador = await this.jogadorModel.create({
      telefoneNumero: '+55' + telefoneNumeroFormatado,
      email,
      nome,
    });
    await jogador.save();
    return jogador;
  }

  async atualizarJogador(_id: string, nome: string): Promise<void> {
    const jogador = await this.buscarJogadorPorID(_id);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado na base de dados.');
    } else if (!nome) {
      throw new BadRequestException('Nome é obrigatório.');
    }
    await this.jogadorModel
      .updateOne(jogador, {
        nome: nome,
      })
      .exec();
    return;
  }

  async consultaJogadores(
    _id: string,
  ): Promise<JogadorInterface | JogadorInterface[]> {
    if (_id) {
      const jogador = await this.buscarJogadorPorID(_id);
      if (!jogador) {
        throw new NotFoundException('Jogador não encontrado na base de dados.');
      }
      return jogador;
    }
    return this.jogadorModel.find().exec();
  }

  async deletarJogador(_id: string): Promise<void> {
    const jogador = await this.buscarJogadorPorID(_id);

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado na base de dados.');
    }

    await this.jogadorModel.deleteOne(jogador).exec();
    return;
  }

  async buscarJogadorPorID(_id: string): Promise<JogadorInterface> {
    try {
      const jogador = await this.jogadorModel.findOne({ _id });
      return jogador;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar Jogador Pelo Id');
    }
  }

  private async buscarJogadorPorEmail(
    email: string,
  ): Promise<JogadorInterface> {
    try {
      const jogador = await this.jogadorModel.findOne({ email });
      return jogador;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar Jogador Pelo Email');
    }
  }
}
