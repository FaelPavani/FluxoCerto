package school.sptech.apachePOI;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

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

public class LeitorExcel {

    public void extrairDados(String nomeArquivo, InputStream arquivo) {
        DBConnectionProvider dbConnectionProvider = new DBConnectionProvider();
        JdbcTemplate connection = dbConnectionProvider.getJdbcTemplate();

        DemandaPorEstacaoDao estacaoDao = new DemandaPorEstacaoDao(connection);
        // Não esquece de criar o objeto de conexão com o banco
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

            if(nomeArquivo == "curated-demanda-de-passageiros-por-linha-2020-2024.xlsx") {

                // Você vai criar a lógica do outro arquivo aqui baseado no que já existe

            } else if(nomeArquivo == "curated-demanda-de-passageiros-por-estacao-2020-2024.xlsx") {
                // Iterando sobre as linhas da planilha
                // Isso ja vem do repositório do professor
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

                    // Verifica se a linha já existe no banco de dados
                    // Esse método não existe no EntradaPorEstacaoDao, vc tem que criar ele lá
                    Integer linhaJaExiste = estacaoDao.existsById(row.getRowNum());

                    if (linhaJaExiste == 0) {
                        // Extraindo valor das células e criando objeto Livro
                        System.out.println("Lendo linha " + row.getRowNum());

                        // Cria o objeto DemandaPorEstacao apenas para facilitar a inserção no banco
                        DemandaPorEstacao estacaoObj = new DemandaPorEstacao();

                        // Aqui ele seta os valores do objeto de acordo com a célula
                        estacaoObj.setAno(String.valueOf(row.getCell(0).getNumericCellValue()));
                        estacaoObj.setLinha(row.getCell(1).getStringCellValue());
                        estacaoObj.setEstacao(row.getCell(2).getStringCellValue());
                        estacaoObj.setMes(row.getCell(3).getStringCellValue());
                        estacaoObj.setFluxo((int) (row.getCell(4).getNumericCellValue()));

                        // Ele pega o ano como numerico double, então é necessário tirar o .0 que ele coloca no final
                        String ano = estacaoObj.getAno().replace(".0", "");
                        String linha = estacaoObj.getLinha();
                        String mes = estacaoObj.getMes();
                        String estacao = estacaoObj.getEstacao();
                        Integer fluxo = estacaoObj.getFluxo();

                        estacaoDao.inserirDados(row.getRowNum(), ano, mes, linha, fluxo, estacao);
                        logDao.inserirLog(1, "200", "Leitura da linha %s do arquivo %s finalizada com sucesso".formatted(row.getRowNum(), nomeArquivo), "LeitorExcelDemanda");
                    } else {
                        // Caso a linha já exista no banco, não insere novamente
                        System.out.println("Linha " + row.getRowNum() + " ja existe no banco");
                    }
                }
            }
            // Fechando o workbook após a leitura
            workbook.close();

            // Insere o Log de leitura finalizada
            logDao.inserirLog(1, "200", "Leitura do arquivo %s completa".formatted(nomeArquivo), "LeitorExcelDemanda");

            System.out.println("\nLeitura do arquivo finalizada\n");
        } catch (IOException e) {
            logDao.inserirLog(1, "500", e.getMessage(), "LeitorExcelDemanda");
            // Caso ocorra algum erro durante a leitura do arquivo uma exceção será lançada
            throw new RuntimeException(e);
        }
    }

    // Método para converter Date para LocalDate
    private LocalDate converterDate(Date data) {
        return data.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
}