package school.sptech.conexaoBanco.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;

import java.util.List;

public class DemandaPorEstacaoDao {
    private final JdbcTemplate jdbcTemplate;

    public DemandaPorEstacaoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    CREATE TABLE demandaPorEstacao(
//        id INT PRIMARY KEY auto_increment,
//        fk_empresa INT,
//        ano INT,
//        mes VARCHAR(30),
//        linha VARCHAR(20),
//        fluxo INT,
//        estacao VARCHAR(40),
//        constraint fk_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
//        constraint check (linha in ("azul", "verde","vermelha"))
//    );

    public List<DemandaPorEstacao> findAll(){
        List<DemandaPorEstacao> dados = jdbcTemplate.query(
          "SELECT * FROM demandaPorEstacao", new BeanPropertyRowMapper<>(DemandaPorEstacao.class)
        );

        return dados;
    }

    public void inserirDados(String ano, String mes, String linha, Integer fluxo, String estacao){
        jdbcTemplate.update("INSERT INTO demandaPorEstacao(fk_empresa, ano, mes, linha, fluxo, estacao) VALUES (1, ?, ?, ?, ?, ?)", ano, mes, linha, fluxo, estacao);
    }
}
