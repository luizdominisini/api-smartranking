import { Document } from 'mongoose';
import JogadorInterface from '../../jogador/interfaces/jogador.interface';

export default interface CategoriaInterface extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Array<EventoInterface>;
  jogadores: Array<JogadorInterface>;
}

export interface EventoInterface {
  nome: string;
  operacao: string;
  valor: number;
}
