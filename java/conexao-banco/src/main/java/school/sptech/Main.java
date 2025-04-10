package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.DBConnectionProvider;
import school.sptech.conexaoBanco.dao.DemandaPorEstacaoDao;
import school.sptech.conexaoBanco.dao.EntradaPorLinhaDao;
import school.sptech.conexaoBanco.dao.LogDao;
import school.sptech.conexaoBanco.models.Log;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        DemandaPorEstacaoDao dado = new DemandaPorEstacaoDao(connection);
        EntradaPorLinhaDao entrada = new EntradaPorLinhaDao(connection);
        LogDao log = new LogDao(connection);

        // entrada.inserirDados(Date.valueOf("2021-02-01"), "verde", 23, 10, 13);
        // dado.inserirDados(2021, "janeiro", "verde", 23, "Vila Madalena");
        // log.inserirLog(1, "500", "Teste de log erro", "Main");

        // List<DemandaPorEstacao> dados = dado.findAll();
        // List<EntradaPorLinha> entradas = entrada.findAll();
        List<Log> logs = log.findAll();

        // for (DemandaPorEstacao demanda : dados) {
        //    System.out.println(demanda.toString());
        // }

        // for (EntradaPorLinha dadoAtual : entradas) {
        //    System.out.println(dadoAtual.toString());
        // }

        for (Log logAtual : logs) {
            System.out.println(logAtual.toString());
        }
    }
}