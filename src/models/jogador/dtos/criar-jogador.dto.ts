import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class CriarJogadorDto {
  @IsString()
  @MaxLength(11)
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  readonly telefoneNumero: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  readonly nome: string;
}
