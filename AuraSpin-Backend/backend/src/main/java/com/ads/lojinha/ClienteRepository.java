package com.ads.lojinha;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    @Query(value = "select * from cliente where ativo=1 and email=:email and senha=:senha", nativeQuery = true)
    Optional<Cliente> fazerLogin(@Param("email") String email, @Param("senha") String senha);

    @Modifying
    @Transactional
    @Query(value = "update cliente set senha=:senhaTemp, ativo=0 where email=:email", nativeQuery = true)
    int resetarSenha(@Param("senhaTemp") String senhaTemp, @Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "update cliente set senha=:novaSenha, ativo=1 where email=:email and documento=:documento", nativeQuery = true)
    int alterarSenha(@Param("novaSenha") String novaSenha,
                     @Param("documento") String documento,
                     @Param("email") String email);
}
