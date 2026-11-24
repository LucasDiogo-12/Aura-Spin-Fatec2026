import { ProdutoApi, ProdutoView } from './models';

export function mapProduto(p: ProdutoApi): ProdutoView {
  const n = (p.nome || '').toLowerCase();
  let imagem = p.imagem || 'assets/AuraSpin.png';
  if (!p.imagem) {
    if (n.includes('azul')) imagem = 'assets/FS_Azul.png';
    else if (n.includes('verde')) imagem = 'assets/FS_Verde.png';
    else if (n.includes('vermelho')) imagem = 'assets/FS_Vermelho.png';
    else if (n.includes('dourado')) imagem = 'assets/FS-Dourado.png';
    else if (n.includes('prateado')) imagem = 'assets/FS-Prateado.png';
    else if (n.includes('rosa')) imagem = 'assets/FS-Rosa.png';
    else if (n.includes('roxo')) imagem = 'assets/FS-Roxo.png';
    else if (n.includes('camuflado')) imagem = 'assets/FS-Camuflado.png';
  }
  return {
    codigo: p.codigo ?? 0, nome: p.nome, descritivo: p.descritivo || '',
    valor: p.valorPromo && p.valorPromo > 0 ? p.valorPromo : p.valor,
    imagem, quantidade: p.quantidade ?? 0, destaque: p.destaque ?? 0
  };
}
