package school.sptech.infra;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class DBConnectionProvider {

    private final JdbcTemplate jdbcTemplate;
    private final BasicDataSource basicDataSource;

    public DBConnectionProvider() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(System.getenv("DB_HOST"));
        basicDataSource.setUsername(System.getenv("DB_USERNAME"));
        basicDataSource.setPassword(System.getenv("DB_PASSWORD"));
        // DB_HOST=jdbc:mysql://localhost:3306/fluxocerto;DB_PASSWORD=urubu100;DB_USERNAME=admin

        this.basicDataSource = basicDataSource;
        this.jdbcTemplate = new JdbcTemplate(basicDataSource);
    }

    public BasicDataSource getBasicDataSource() {
        return basicDataSource;
    }

    public JdbcTemplate getJdbcTemplate(){ return jdbcTemplate; }
}
