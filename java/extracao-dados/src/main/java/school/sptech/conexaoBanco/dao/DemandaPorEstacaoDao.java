package school.sptech.conexaoBanco.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;

import java.util.ArrayList;
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

    public void inserirDados(Integer id, String ano, String mes, String linha, Integer fluxo, String estacao){
        jdbcTemplate.update("INSERT INTO demandaPorEstacao(id, fk_empresa, ano, mes, linha, fluxo, estacao) VALUES (?, 1, ?, ?, ?, ?, ?)", id, ano, mes, linha, fluxo, estacao);
    }

    public void inserirDadosBatch(List<DemandaPorEstacao> estacoes) {
        String sql = "INSERT INTO demandaPorEstacao (id, fk_empresa, ano, mes, linha, fluxo, estacao) VALUES (?, 1, ?, ?, ?, ?, ?)";
        List<Object[]> batchArgs = new ArrayList<>();
        for (DemandaPorEstacao estacao : estacoes) {
            batchArgs.add(new Object[]{
                    estacao.getId(),
                    estacao.getAno(),
                    estacao.getMes(),
                    estacao.getLinha(),
                    estacao.getFluxo(),
                    estacao.getEstacao()
            });
        }
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }

    public Integer existsById(Integer id) {
        return jdbcTemplate.queryForObject("SELECT EXISTS(SELECT id FROM demandaPorEstacao WHERE id = ?) AS ja_existe", Integer.class, id);
    }
}
