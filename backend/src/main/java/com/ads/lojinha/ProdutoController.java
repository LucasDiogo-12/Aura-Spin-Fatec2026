package com.ads.lojinha;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {
    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    // Listagem: mantém a rota plural utilizada pelo frontend e também oferece a singular.
    @GetMapping({"/api/produtos", "/api/produto"})
    public List<Produto> listar() {
        return repository.findAll();
    }

    @GetMapping("/api/produto/{codigo}")
    public ResponseEntity<Produto> buscar(@PathVariable int codigo) {
        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping({"/api/produto", "/api/produto/"})
    public ResponseEntity<String> cadastrar(@RequestBody Produto produto) {
        if (produto.getNome() == null || produto.getNome().isBlank()) {
            return ResponseEntity.badRequest().body("Informe o nome do produto.");
        }
        if (produto.getValor() <= 0) {
            return ResponseEntity.badRequest().body("Informe um valor maior que zero.");
        }
        // Garante INSERT mesmo se o cliente enviar um código por engano.
        produto.setCodigo(0);
        Produto salvo = repository.save(produto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Produto gravado com sucesso! " + salvo.getCodigo());
    }

    @PutMapping({"/api/produto", "/api/produto/"})
    public ResponseEntity<String> atualizar(@RequestBody Produto produto) {
        if (produto.getCodigo() <= 0 || !repository.existsById(produto.getCodigo())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        if (produto.getNome() == null || produto.getNome().isBlank() || produto.getValor() <= 0) {
            return ResponseEntity.badRequest().body("Informe nome e valor maior que zero.");
        }
        repository.save(produto);
        return ResponseEntity.ok("Produto alterado com sucesso! " + produto.getCodigo());
    }

    @DeleteMapping("/api/produto/{codigo}")
    public ResponseEntity<String> excluir(@PathVariable int codigo) {
        if (!repository.existsById(codigo)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(codigo);
        return ResponseEntity.ok("Produto removido com sucesso!");
    }

    @GetMapping("/api/produto/vitrine")
    public List<Produto> vitrine() {
        return repository.carregaVitrine();
    }

    @GetMapping("/api/produto/busca/{termo}")
    public List<Produto> buscarPorNome(@PathVariable String termo) {
        return repository.fazerBusca("%" + termo + "%");
    }
}
