package school.sptech.ConexaoBanco;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        DadosDao dado = new DadosDao(connection);

        // dado.inserirDados("lotacao", "verde");

        List<Dados> dados = dado.findAll();

        for (int i = 0; i < dados.size(); i++) {
            System.out.println(dados.get(i).toString());
        }


    }
}