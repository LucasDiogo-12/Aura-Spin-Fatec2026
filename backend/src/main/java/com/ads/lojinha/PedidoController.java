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
public class PedidoController {
    private final PedidoRepository repository;

    public PedidoController(PedidoRepository repository) {
        this.repository = repository;
    }

    @GetMapping({"/api/pedidos", "/api/pedido"})
    public List<Pedido> listar() {
        return repository.findAll();
    }

    @GetMapping("/api/pedido/{codigo}")
    public ResponseEntity<Pedido> buscar(@PathVariable int codigo) {
        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping({"/api/pedido", "/api/pedido/"})
    public ResponseEntity<String> cadastrar(@RequestBody Pedido pedido) {
        if (pedido.getCodigoCliente() <= 0 || pedido.getValorTotal() <= 0
                || pedido.getEntrega() == null || pedido.getEntrega().isBlank()
                || pedido.getDataPedido() == null) {
            return ResponseEntity.badRequest().body("Informe cliente, valor, entrega e data do pedido.");
        }
        pedido.setCodigoPedido(0);
        Pedido salvo = repository.save(pedido);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Pedido gravado com sucesso! " + salvo.getCodigoPedido());
    }

    @PutMapping({"/api/pedido", "/api/pedido/"})
    public ResponseEntity<String> atualizar(@RequestBody Pedido pedido) {
        if (pedido.getCodigoPedido() <= 0 || !repository.existsById(pedido.getCodigoPedido())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido não encontrado.");
        }
        if (pedido.getCodigoCliente() <= 0 || pedido.getValorTotal() <= 0
                || pedido.getEntrega() == null || pedido.getEntrega().isBlank()
                || pedido.getDataPedido() == null) {
            return ResponseEntity.badRequest().body("Informe cliente, valor, entrega e data do pedido.");
        }
        repository.save(pedido);
        return ResponseEntity.ok("Pedido alterado com sucesso! " + pedido.getCodigoPedido());
    }

    @DeleteMapping("/api/pedido/{codigo}")
    public ResponseEntity<String> excluir(@PathVariable int codigo) {
        if (!repository.existsById(codigo)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(codigo);
        return ResponseEntity.ok("Pedido removido com sucesso!");
    }
}
