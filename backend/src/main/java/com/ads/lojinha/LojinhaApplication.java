package com.ads.lojinha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LojinhaApplication {
    public static void main(String[] args) {
        SpringApplication.run(LojinhaApplication.class, args);
    }

    @Bean
    CommandLineRunner carregarProdutosIniciais(ProdutoRepository produtos) {
        return args -> {
            if (produtos.count() == 0) {
                String[][] dados = {
                    {"Fidget Spinner Clássico Azul", "Modelo clássico azul com rolamento central", "19.90"},
                    {"Fidget Spinner Clássico Verde", "Modelo clássico verde com rolamento central", "19.90"},
                    {"Fidget Spinner Clássico Vermelho", "Modelo clássico vermelho com rolamento central", "19.90"},
                    {"Fidget Spinner Metálico Dourado", "Acabamento metálico dourado", "39.90"},
                    {"Fidget Spinner Metálico Prateado", "Acabamento metálico prateado", "39.90"},
                    {"Fidget Spinner Camuflado", "Estampa camuflada e peso balanceado", "24.90"},
                    {"Fidget Spinner Rosa", "Modelo rosa colecionável", "29.90"}
                };
                int destaque = 1;
                for (String[] dado : dados) {
                    Produto p = new Produto();
                    p.setNome(dado[0]); p.setDescritivo(dado[1]);
                    p.setValor(Double.parseDouble(dado[2])); p.setValorPromo(0);
                    p.setQuantidade(20); p.setDestaque(destaque++);
                    produtos.save(p);
                }
            }
        };
    }
}
