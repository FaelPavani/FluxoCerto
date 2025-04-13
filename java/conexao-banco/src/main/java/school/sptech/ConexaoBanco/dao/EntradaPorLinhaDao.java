package school.sptech.conexaoBanco.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.models.EntradaPorLinha;

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

    public void inserirDados(Integer id, Date dataColeta, String linha, Integer fluxoTotal, Integer mediaDia, Integer maiorMaximaDiaria){
        jdbcTemplate.update("INSERT INTO entradaPorLinha(id, fk_empresa, dataColeta, linha, fluxoTotal, mediaDia, maiorMaximaDiaria) VALUES (?, 1, ?, ?, ?, ?, ?)", id, dataColeta, linha, fluxoTotal, mediaDia, maiorMaximaDiaria);
    }

    public Integer existsById(Integer id) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT id FROM entradaPorLinha WHERE id = ?) AS ja_existe", Integer.class, id);
    }
}
