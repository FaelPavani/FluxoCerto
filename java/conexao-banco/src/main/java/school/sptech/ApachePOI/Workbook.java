package school.sptech.apachePOI;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class Workbook{
    public static void main(String[] args) throws IOException {
        String nomeArquivo = "curated-demanda-de-passageiros-por-estacao-2020-2024.xlsx";
        // String nomeArquivo = "curated-demanda-de-passageiros-por-linha-2020-2024.xlsx";
        Path caminho = Path.of("C:\\faculdade\\FluxoCerto\\java\\conexao-banco\\src\\main\\java\\school\\sptech\\apachePOI\\arquivos\\" + nomeArquivo);
        InputStream arquivo = Files.newInputStream(caminho);

        LeitorExcel leitor = new LeitorExcel();
        leitor.extrairDados(nomeArquivo, arquivo);

        // Para quando parar de ler
        arquivo.close();
    }
}
