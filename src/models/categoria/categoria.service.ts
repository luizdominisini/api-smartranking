import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AtualizarCategoriaDto from './dtos/atualizar-categoria.dto';
import CriarCategoriaDto from './dtos/criar-categoria.dto';
import CategoriaInterface from './interfaces/categoria.interface';

@Injectable()
export default class CategoriaService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<CategoriaInterface>,
  ) {}

  async criarCategoria({
    categoria,
    descricao,
    eventos,
  }: CriarCategoriaDto): Promise<CategoriaInterface> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(
        'Categoria já cadastrada na base de dados.',
      );
    }

    const categoriaCriada = await this.categoriaModel.create({
      categoria,
      descricao,
      eventos,
    });
    await categoriaCriada.save();
    return categoriaCriada;
  }

  async consultaCategoria(): Promise<CategoriaInterface[]> {
    return this.categoriaModel
      .find()
      .populate('jogador', { strictPopulate: false })
      .exec();
  }

  async consultaCategoriaPeloId(
    categoria: string,
  ): Promise<CategoriaInterface> {
    try {
      const cat = this.categoriaModel.findOne({ categoria });
      if (!cat) {
        throw new NotFoundException(
          'Categoria não encontrada na base de dados.',
        );
      }

      return cat;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar categoria pelo Id');
    }
  }

  async atualizarCategoria(
    categoria: string,
    dados: AtualizarCategoriaDto,
  ): Promise<void> {
    const cat = await this.consultaCategoriaPeloId(categoria);

    if (!cat) {
      throw new NotFoundException('Categoria não encontrada na base de dados');
    }

    await this.categoriaModel
      .findOneAndUpdate(
        { categoria },
        {
          $set: dados,
        },
      )
      .exec();
  }

  async deletarCategoria(categoria: string): Promise<void> {
    const cat = await this.consultaCategoriaPeloId(categoria);

    if (!cat) {
      throw new NotFoundException('Categoria não encontrada na base de dados');
    }

    await this.categoriaModel.deleteOne({ categoria }).exec();
  }

  async atribuirCategoriaAjogador(params: string[]): Promise<void> {
    const categoria = params['categoria'];
    const _id = params['_id'];

    const categoriaEncontrada = await this.consultaCategoriaPeloId(categoria);

    if (!categoriaEncontrada) {
      throw new NotFoundException('Categoria não encontrada na base de dados.');
    }

    categoriaEncontrada.jogadores.push(_id);
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
