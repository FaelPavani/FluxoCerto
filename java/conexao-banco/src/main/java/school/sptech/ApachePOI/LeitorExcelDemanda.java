package school.sptech.apachePOI;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.DBConnectionProvider;
import school.sptech.conexaoBanco.dao.DemandaPorEstacaoDao;
import school.sptech.conexaoBanco.dao.LogDao;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;

public class LeitorExcelDemanda {

    public List<?> extrairDados(String nomeArquivo, InputStream arquivo) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();
        DemandaPorEstacaoDao demandaDao = new DemandaPorEstacaoDao(connection);
        LogDao logDao = new LogDao(connection);

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

            List<DemandaPorEstacao> dadosExtraidos = new ArrayList<>();
            Integer indice = 0;

            // Iterando sobre as linhas da planilha
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    System.out.println("\nLendo cabeçalho");

                    for (int i = 0; i < 4; i++) {
                        String coluna = row.getCell(i).getStringCellValue();
                        System.out.println("Coluna " + i + ": " + coluna);
                    }

                    System.out.println("--------------------");
                    continue;
                }
                indice++;

                // Extraindo valor das células e criando objeto Livro
                System.out.println("Lendo linha " + row.getRowNum());

               DemandaPorEstacao demanda = new DemandaPorEstacao();

               // demanda.setId((int) row.getCell(0).getNumericCellValue());
               demanda.setAno(String.valueOf(row.getCell(0).getNumericCellValue()));
               demanda.setLinha(row.getCell(1).getStringCellValue());
               demanda.setEstacao(row.getCell(2).getStringCellValue());
               demanda.setMes(row.getCell(3).getStringCellValue());
               demanda.setFluxo((int) (row.getCell(4).getNumericCellValue()));
               dadosExtraidos.add(demanda);

                String ano = demanda.getAno().replace(".0", "");
                String linha = demanda.getLinha();
                String mes = demanda.getMes();
                String estacao = demanda.getEstacao();
                Integer fluxo = demanda.getFluxo();

                demandaDao.inserirDados(ano, mes, linha, fluxo, estacao);
                logDao.inserirLog(1, "200", "Leitura da linha %s do arquivo %s finalizada com sucesso".formatted(row.getRowNum(), nomeArquivo), "LeitorExcelDemanda");
            }

            // Fechando o workbook após a leitura
            workbook.close();

            logDao.inserirLog(1, "200", "Leitura do arquivo %s finalizada com sucesso".formatted(nomeArquivo), "LeitorExcelDemanda");

            System.out.println("\nLeitura do arquivo finalizada\n");

            return dadosExtraidos;
        } catch (IOException e) {
            logDao.inserirLog(1, "500", e.getMessage(), "LeitorExcelDemanda");
            // Caso ocorra algum erro durante a leitura do arquivo uma exceção será lançada
            throw new RuntimeException(e);
        }
    }

    private LocalDate converterDate(Date data) {
        return data.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
}