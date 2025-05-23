package school.sptech.apachePOI;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.DBConnectionProvider;
import school.sptech.conexaoBanco.dao.DemandaPorEstacaoDao;
import school.sptech.conexaoBanco.dao.EntradaPorLinhaDao;
import school.sptech.conexaoBanco.dao.LogDao;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;
import school.sptech.conexaoBanco.models.EntradaPorLinha;
import school.sptech.conexaoBanco.models.Log;
import school.sptech.slack.Slack;

public class LeitorExcel {

    DBConnectionProvider dbConnectionProvider;
    JdbcTemplate jdbcTemplate;
    Connection connection;

    public void extrairDados(String nomeArquivo, InputStream arquivo) throws SQLException {
        dbConnectionProvider = new DBConnectionProvider();
        jdbcTemplate = dbConnectionProvider.getJdbcTemplate();
        connection = dbConnectionProvider.getBasicDataSource().getConnection();
        connection.setAutoCommit(false);

        LogDao logDao = new LogDao(jdbcTemplate);
        List<Log> logBatch = new ArrayList<>();

        try {
            System.out.println("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

            // Criando um objeto Workbook a partir do arquivo recebido
            Workbook workbook;
            if (nomeArquivo.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }
            Sheet sheet = workbook.getSheetAt(0);

            if(nomeArquivo.equals("curated-entrada-passageiros-por-linha-2020-2024.xlsx")) {
                System.out.println("");
                System.out.println("Começando a leitura do arquivo %s".formatted(nomeArquivo));

                this.leituraEntradaPorLinha(sheet, logBatch, logDao, nomeArquivo);
            } else if(nomeArquivo.equals("curated-demanda-de-passageiros-por-estacao-2020-2024.xlsx")) {
                System.out.println("");
                System.out.println("Começando a leitura do arquivo %s".formatted(nomeArquivo));

                this.leituraDemandaPorEstacao(sheet, logBatch, logDao, nomeArquivo);
            }
            // Fechando o workbook após a leitura
            workbook.close();

            // Insere o Log de leitura finalizada
            logDao.inserirLog(1, "200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcel");
            connection.commit();
            System.out.println("\nLeitura do arquivo finalizada\n");

            this.enviarMensagem(String.format("Leitura do arquivo %s finalizada com sucesso!", nomeArquivo));
        } catch (IOException e) {
            logDao.inserirLog(1, "500", e.getMessage(), "LeitorExcel");
            connection.commit();
            // Caso ocorra algum erro durante a leitura do arquivo uma exceção será lançada
            throw new RuntimeException(e);
        }
        connection.close();
    }

    public void leituraEntradaPorLinha(Sheet sheet, List<Log> logBatch, LogDao logDao, String nomeArquivo) throws SQLException {
        EntradaPorLinhaDao entradaDao = new EntradaPorLinhaDao(jdbcTemplate);
        List<EntradaPorLinha> entradasBatch = new ArrayList<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }
            // Cria o objeto EntradaPorLinha apenas para facilitar a inserção no banco
            EntradaPorLinha entradaObj = new EntradaPorLinha();

            // Aqui ele seta os valores do objeto de acordo com a célula
            entradaObj.setId(row.getRowNum());
            entradaObj.setDataColeta(Date.valueOf(LocalDate.parse(row.getCell(0).getStringCellValue())));
            entradaObj.setLinha(row.getCell(1).getStringCellValue());
            // O (int) é para definir que vai ser um inteiro, ja que o getNumericValue pega um Double
            entradaObj.setFluxoTotal((int) row.getCell(2).getNumericCellValue());
            entradaObj.setMediaDia((int) row.getCell(3).getNumericCellValue());
            entradaObj.setMaiorMaximaDiaria((int) (row.getCell(4).getNumericCellValue()));

            entradasBatch.add(entradaObj);
            Log logObj = new Log(1, "200", "Leitura da linha %s do arquivo %s finalizada com sucesso".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            System.out.println("Leitura da linha %s finalizada com sucesso".formatted(row.getRowNum()));
            logBatch.add(logObj);
        }
        System.out.println("====================================================================================================================");
        System.out.println("Inserindo os dados do arquivo " + nomeArquivo);
        entradaDao.inserirDadosBatch(entradasBatch);
        logDao.inserirLogBatch(logBatch);
        connection.commit();
    }

    public void leituraDemandaPorEstacao(Sheet sheet, List<Log> logBatch, LogDao logDao, String nomeArquivo) throws SQLException {
        DemandaPorEstacaoDao estacaoDao = new DemandaPorEstacaoDao(jdbcTemplate);
        List<DemandaPorEstacao> estacoesBatch = new ArrayList<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }
            // Cria o objeto DemandaPorEstacao apenas para facilitar a inserção no banco
            DemandaPorEstacao estacaoObj = new DemandaPorEstacao();

            // Aqui ele seta os valores do objeto de acordo com a célula
            estacaoObj.setId(row.getRowNum());
            estacaoObj.setAno(String.valueOf(row.getCell(0).getNumericCellValue()).replace(".0", ""));
            estacaoObj.setLinha(row.getCell(1).getStringCellValue());
            estacaoObj.setEstacao(row.getCell(2).getStringCellValue());
            estacaoObj.setMes(row.getCell(3).getStringCellValue());
            // O (int) é para definir que vai ser um inteiro, ja que o getNumericValue pega um Double
            estacaoObj.setFluxo((int) (row.getCell(4).getNumericCellValue()));

            estacoesBatch.add(estacaoObj);
            Log logObj = new Log(1, "200", "Leitura da linha %s do arquivo %s finalizada com sucesso".formatted(row.getRowNum(), nomeArquivo), "LeitorExcel");
            System.out.println("Leitura da linha %s finalizada com sucesso".formatted(row.getRowNum(), nomeArquivo));
            logBatch.add(logObj);
        }
        System.out.println("====================================================================================================================");
        System.out.println("Inserindo os dados do arquivo " + nomeArquivo);
        estacaoDao.inserirDadosBatch(estacoesBatch);
        logDao.inserirLogBatch(logBatch);
        connection.commit();
    }

    public void enviarMensagem(String mensagem){
        JSONObject json = new JSONObject();
        json.put("text", mensagem);
        try {
            Slack.enviarMensagem(json);
        } catch (IOException | InterruptedException e) {
            System.out.println("Erro ao enviar mensagem para o slack: " + e.getMessage());
        }
    }
}