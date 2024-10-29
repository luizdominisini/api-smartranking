import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import CategoriaService from './categoria.service';
import AtualizarCategoriaDto from './dtos/atualizar-categoria.dto';
import CriarCategoriaDto from './dtos/criar-categoria.dto';
import CategoriaInterface from './interfaces/categoria.interface';

@Controller('api/v1/categoria')
export default class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async criarCategoria(
    @Body() dados: CriarCategoriaDto,
  ): Promise<CategoriaInterface> {
    return this.categoriaService.criarCategoria(dados);
  }

  @Get()
  async consultaCategoria(): Promise<CategoriaInterface[]> {
    return this.categoriaService.consultaCategoria();
  }

  @Get(':categoria')
  async consultaCategoriaPeloId(
    @Param('categoria') categoria: string,
  ): Promise<CategoriaInterface> {
    return this.categoriaService.consultaCategoriaPeloId(categoria);
  }

  @Put(':categoria')
  async atualizarCategoria(
    @Param('categoria') categoria: string,
    @Body() dados: AtualizarCategoriaDto,
  ): Promise<void> {
    return this.categoriaService.atualizarCategoria(categoria, dados);
  }

  @Delete(':categoria')
  async deletarCategoria(@Param('categoria') categoria: string): Promise<void> {
    return this.categoriaService.deletarCategoria(categoria);
  }

  @Post(':categoria/jogadores/:_id')
  async atribuirCategoriaAjogador(@Param() params: string[]): Promise<void> {
    return this.categoriaService.atribuirCategoriaAjogador(params);
  }
}
