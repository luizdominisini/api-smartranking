export default interface JogadorInterface extends Document {
  telefoneNumero: string;
  email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
