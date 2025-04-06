package school.sptech.ConexaoBanco;

import org.springframework.jdbc.core.JdbcTemplate;

public class Main {

    public static void main(String[] args) {

        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getConnection();

    }
}