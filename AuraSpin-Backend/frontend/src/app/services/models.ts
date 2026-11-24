export interface ProdutoApi {
  codigo?: number; nome: string; descritivo?: string; valor: number;
  valorPromo?: number; quantidade?: number; destaque?: number; imagem?: string;
}
export interface ClienteApi {
  codigo?: number; nome: string; telefone?: string; documento?: string;
  senha: string; logradouro?: string; email: string; ativo?: number;
}
export interface PedidoApi {
  codigoPedido?: number; valorTotal: number; entrega: string; obs?: string;
  dataPedido: string; codigoCliente: number;
}
export interface ProdutoView {
  codigo: number; nome: string; descritivo: string; valor: number;
  imagem: string; quantidade: number; destaque: number;
}
