package school.sptech;

import school.sptech.apachePOI.LeitorExcel;
import school.sptech.infra.S3Provider;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

public class Workbook{
    public static void main(String[] args) throws IOException, SQLException {
        S3Client s3Client = new S3Provider().getS3Client();
        String bucketName = "dl-fluxo-certo";

        List<String> arquivos = Arrays.asList("curated-demanda-de-passageiros-por-estacao-2020-2024.xlsx", "curated-entrada-passageiros-por-linha-2020-2024.xlsx");

        System.out.println("Verificando se os arquivos .xlsx já existem");
        for (int i = 0; i < arquivos.size(); i++) {
            String nomeArquivo = arquivos.get(i);

            // Apagando o arquivo existente do bucket para atualiza-lo
            // Caminho do arquivo que você quer excluir
            Path caminhoGet = Path.of(nomeArquivo);

            if (Files.exists(caminhoGet)) {
                 try {
                     Files.delete(caminhoGet); // Deleta o arquivo
                     System.out.println("Arquivo deletado com sucesso!");
                 } catch (IOException e) {
                     System.out.println("Erro ao deletar o arquivo: " + e.getMessage());
                 }
            } else {
                System.out.println("Arquivo não existe");
           }
        }

        // Fazendo download dos arquivos do Bucket
        System.out.println("Fazendo download dos arquivos do bucket");
        try {
            List<S3Object> objects = s3Client.listObjects(ListObjectsRequest.builder().bucket(bucketName).build()).contents();
            for (S3Object object : objects) {
               GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(object.key())
                        .build();

                InputStream inputStream = s3Client.getObject(getObjectRequest, ResponseTransformer.toInputStream());
                Files.copy(inputStream, new File(object.key()).toPath());
                System.out.println("Arquivo baixado: " + object.key());
           }
        } catch (IOException | S3Exception e) {
            System.err.println("Erro ao fazer download dos arquivos: " + e.getMessage());
        }

        System.out.println("Iniciando leitura dos arquivos .xlsx");
        for (int i = 0; i < arquivos.size(); i++) {
            String nomeArquivo = arquivos.get(i);
            // Coloque o caminho para a pasta que estão os arquivos
            Path caminho = Path.of(nomeArquivo);

            InputStream arquivo = Files.newInputStream(caminho);

            LeitorExcel leitor = new LeitorExcel();
            leitor.extrairDados(nomeArquivo, arquivo);

            // Para quando parar de ler
            arquivo.close();
        }

        // Esse arquivo faz a conexão como banco de dados
        // Configure as variaveis de ambiente no IntelliJ
        // A pasta models é onde estão os objetos (tabelas do banco de dados que vamos usar)
        // A pasta dao é onde estão os métodos que interajem com o banco de dados dos objetos
        // O Workook é o executavel do projeto, ele é quem chama o LeitorExcel
        // O LeitorExcel é quem extrai os dados do arquivos .xlsx e insere no banco de dados, juntamente com os logs
    }
}
