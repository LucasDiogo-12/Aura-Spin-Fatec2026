package com.ads.lojinha;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {
    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping({"/api/clientes", "/api/cliente"})
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @GetMapping("/api/cliente/{codigo}")
    public ResponseEntity<Cliente> buscar(@PathVariable int codigo) {
        return repository.findById(codigo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping({"/api/cliente", "/api/cliente/"})
    public ResponseEntity<String> cadastrar(@RequestBody Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isBlank()
                || cliente.getEmail() == null || cliente.getEmail().isBlank()
                || cliente.getSenha() == null || cliente.getSenha().isBlank()) {
            return ResponseEntity.badRequest().body("Nome, email e senha são obrigatórios.");
        }
        cliente.setCodigo(0);
        if (cliente.getAtivo() == 0) cliente.setAtivo(1);
        Cliente salvo = repository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Cliente gravado com sucesso! " + salvo.getCodigo());
    }

    @PutMapping({"/api/cliente", "/api/cliente/"})
    public ResponseEntity<String> atualizar(@RequestBody Cliente cliente) {
        if (cliente.getCodigo() <= 0 || !repository.existsById(cliente.getCodigo())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        if (cliente.getNome() == null || cliente.getNome().isBlank()
                || cliente.getEmail() == null || cliente.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Nome e email são obrigatórios.");
        }
        repository.save(cliente);
        return ResponseEntity.ok("Cliente alterado com sucesso! " + cliente.getCodigo());
    }

    @DeleteMapping("/api/cliente/{codigo}")
    public ResponseEntity<String> excluir(@PathVariable int codigo) {
        if (!repository.existsById(codigo)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(codigo);
        return ResponseEntity.ok("Cliente removido com sucesso!");
    }

    // Mantém as rotas já utilizadas pelo fluxo de autenticação do frontend.
    @PostMapping("/api/cliente/login")
    public ResponseEntity<Cliente> login(@RequestBody Cliente dados) {
        Optional<Cliente> cliente = repository.fazerLogin(dados.getEmail(), dados.getSenha());
        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PatchMapping("/api/cliente/resetarSenha")
    public ResponseEntity<String> resetarSenha(@RequestBody Cliente dados) {
        if (dados.getEmail() == null || dados.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Informe o email.");
        }
        int alterados = repository.resetarSenha("Senha1234", dados.getEmail());
        if (alterados == 0) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Senha temporária definida. Configure o envio de email antes de usar em produção.");
    }

    @PatchMapping("/api/cliente/alterarSenha")
    public ResponseEntity<String> alterarSenha(@RequestBody Cliente dados) {
        if (dados.getEmail() == null || dados.getDocumento() == null || dados.getSenha() == null) {
            return ResponseEntity.badRequest().body("Informe email, documento e nova senha.");
        }
        int alterados = repository.alterarSenha(dados.getSenha(), dados.getDocumento(), dados.getEmail());
        if (alterados == 0) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados do cliente não conferem.");
        return ResponseEntity.ok("Senha alterada com sucesso!");
    }
}
