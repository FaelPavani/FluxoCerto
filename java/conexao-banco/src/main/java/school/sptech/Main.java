package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.ConexaoBanco.DBConnectionProvider;
import school.sptech.ConexaoBanco.dao.DemandaPorEstacaoDao;
import school.sptech.ConexaoBanco.dao.EntradaPorLinhaDao;
import school.sptech.ConexaoBanco.models.DemandaPorEstacao;
import school.sptech.ConexaoBanco.models.EntradaPorLinha;

import java.sql.Date;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        DemandaPorEstacaoDao dado = new DemandaPorEstacaoDao(connection);
        EntradaPorLinhaDao entrada = new EntradaPorLinhaDao(connection);

        // entrada.inserirDados(Date.valueOf("2021-02-01"), "verde", 23, 10, 13);
        // dado.inserirDados(2021, "janeiro", "verde", 23, "Vila Madalena");

        List<DemandaPorEstacao> dados = dado.findAll();
        List<EntradaPorLinha> entradas = entrada.findAll();

        for (DemandaPorEstacao demanda : dados) {
            System.out.println(demanda.toString());
        }

        for (EntradaPorLinha dadoAtual : entradas) {
            System.out.println(dadoAtual.toString());
        }


    }
}