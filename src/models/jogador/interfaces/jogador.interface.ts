export default interface JogadorInterface {
  readonly _id: string;
  telefoneNumero: string;
  email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
