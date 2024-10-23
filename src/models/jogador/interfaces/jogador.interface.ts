export default interface JogadorInterface {
  readonly _id: string;
  readonly telefoneNumero: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
