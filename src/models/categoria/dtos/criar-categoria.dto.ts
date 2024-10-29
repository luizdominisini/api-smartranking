import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { EventoInterface } from '../interfaces/categoria.interface';

export default class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty({ message: 'Categoria não pode ser vazio' })
  readonly categoria: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: EventoInterface[];
}
