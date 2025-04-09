package school.sptech.ConexaoBanco.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.ConexaoBanco.models.DemandaPorEstacao;
import school.sptech.ConexaoBanco.models.EntradaPorLinha;

import java.sql.Date;
import java.util.List;

public class EntradaPorLinhaDao {
    private final JdbcTemplate jdbcTemplate;

    public EntradaPorLinhaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    CREATE TABLE entradaPorLinha(
//        id INT PRIMARY KEY auto_increment,
//        fk_empresa INT,
//        dataColeta DATE,
//        linha VARCHAR(20),
//        fluxoTotal INT,
//        mediaDia INT,
//        maiorMaximaDiaria INT,
//        constraint fk_linhaEmpresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
//        constraint check (linha in ("azul", "verde","vermelha"))
//    );

    public List<EntradaPorLinha> findAll(){
        List<EntradaPorLinha> dados = jdbcTemplate.query(
          "SELECT * FROM entradaPorLinha", new BeanPropertyRowMapper<>(EntradaPorLinha.class)
        );

        return dados;
    }

    public void inserirDados(Date dataColeta, String linha, Integer fluxoTotal, Integer mediaDia, Integer maiorMaximaDiaria){
        jdbcTemplate.update("INSERT INTO entradaPorLinha(fk_empresa, dataColeta, linha, fluxoTotal, mediaDia, maiorMaximaDiaria) VALUES (1, ?, ?, ?, ?, ?)", dataColeta, linha, fluxoTotal, mediaDia, maiorMaximaDiaria);
    }
}
