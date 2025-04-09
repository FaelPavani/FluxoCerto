package school.sptech.ConexaoBanco;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDate;
import java.util.List;

public class DadosDao {
    private final JdbcTemplate jdbcTemplate;

    public DadosDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    create table dados (
    //    id int primary key auto_increment,
    //    dataColeta date,
    //    tipoDado varchar(45),
    //    linha varchar(10),
    //    constraint chkLinha check (linha in ("azul", "verde","vermelha"))
//    );

    public List<Dados> findAll(){
        List<Dados> dados = jdbcTemplate.query(
          "SELECT * FROM dados", new BeanPropertyRowMapper<>(Dados.class)
        );

        return dados;
    }

    public void inserirDados(String tipoDado, String linha){
        jdbcTemplate.update("INSERT INTO dados(dataColeta, tipoDado, linha) VALUES (?, ?, ?)", LocalDate.now(), tipoDado, linha);
    }
}
