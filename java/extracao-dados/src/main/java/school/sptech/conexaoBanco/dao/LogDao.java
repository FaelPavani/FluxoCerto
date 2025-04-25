package school.sptech.conexaoBanco.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;
import school.sptech.conexaoBanco.models.Log;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class LogDao {
    private final JdbcTemplate jdbcTemplate;

    public LogDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // create table log (
    //    id int primary key auto_increment,
    //    fk_empresa INT,
    //    statusResposta VARCHAR(5),
    //    dataColeta datetime,
    //    descricao varchar(200),
    //    origem varchar(50),
    //    constraint fk_logEmpresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
    // );

    public List<Log> findAll(){
        List<Log> logs = jdbcTemplate.query(
                "SELECT * FROM log", new BeanPropertyRowMapper<>(Log.class)
        );
        return logs;
    }

    public void inserirLog(Integer fk_empresa, String status, String descricao, String origem){
        jdbcTemplate.update("INSERT INTO log(fk_empresa, statusResposta, dataColeta, descricao, origem) VALUES (1, ?, ?, ?, ?)", status, LocalDateTime.now(), descricao, origem);
    }

    public void inserirLogBatch(List<Log> logs) {
        String sql = "INSERT INTO log(fk_empresa, statusResposta, dataColeta, descricao, origem) VALUES (1, ?, ?, ?, ?)";
        List<Object[]> batchArgs = new ArrayList<>();
        for (Log log : logs) {
            batchArgs.add(new Object[]{
                    log.getStatusResposta(),
                    log.getDataColeta(),
                    log.getDescricao(),
                    log.getOrigem()
            });
        }
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }
}
