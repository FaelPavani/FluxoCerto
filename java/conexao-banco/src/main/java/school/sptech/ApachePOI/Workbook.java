package school.sptech.ApachePOI;

import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import school.sptech.LeitorExcel;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Workbook{
    public static void main(String[] args) throws IOException {
        String nomeArquivo = "nome-arquivo.xlsx";
        Path caminho = Path.of(nomeArquivo);
        InputStream arquivo = Files.newInputStream(caminho);

        LeitorExcel leitor = new LeitorExcel();
        List<?> dadosExtraidos = leitor.extrairDados(nomeArquivo, arquivo);

        // Para quando parar de ler
        arquivo.close();

        // Acessando a primeira planilha
        // Sheet sheet = workbook.getSheetAt(0);

        // Acessando a primeira linha da planilha
        // Row row = sheet.getRow(0);

        // Acessando a primeira célula da linha
        // Cell cell = row.getCell(0);

        // Para pegar o valor de uma célula do tipo String
        // String valor = cell.getStringCellValue();
    }
}
