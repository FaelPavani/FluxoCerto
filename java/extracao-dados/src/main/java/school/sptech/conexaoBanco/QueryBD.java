package school.sptech.conexaoBanco;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.conexaoBanco.models.DemandaPorEstacao;
import school.sptech.conexaoBanco.models.EntradaPorLinha;
import school.sptech.conexaoBanco.models.Log;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class QueryBD {
    private final JdbcTemplate jdbcTemplate;

    public QueryBD(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void inserirLog(Integer fk_empresa, String status, String descricao, String origem){
        jdbcTemplate.update("INSERT INTO log(fk_empresa, statusResposta, dataColeta, descricao, origem) VALUES (1, ?, ?, ?, ?)", status, LocalDateTime.now(), descricao, origem);
    }

    public void inserirLogBatch(List<Log> logs) {
        String sql = "INSERT INTO log(fk_empresa, statusResposta, dataColeta, descricao, origem) VALUES (1, ?, ?, ?, ?)";
        List<Object[]> batchArgs = new ArrayList<>();
        for (Log log : logs) {
            batchArgs.add(new Object[]{
                    log.getStatusResposta(),
                    log.getDataColeta(),
                    log.getDescricao(),
                    log.getOrigem()
            });
        }
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }

    public void inserirEntradaBatch(List<EntradaPorLinha> entradas) {
        String sql = """
            INSERT INTO entradaPorLinha (id, fk_empresa, dataColeta, linha, fluxoTotal, mediaDia, maiorMaximaDiaria) 
            SELECT ?, 1, ?, ?, ?, ?, ?
            WHERE NOT EXISTS ( SELECT 1 FROM entradaPorLinha WHERE id = ? )
        """;
        List<Object[]> batchArgs = new ArrayList<>();
        for (EntradaPorLinha entrada : entradas) {
            batchArgs.add(new Object[]{
                    entrada.getId(),
                    entrada.getDataColeta(),
                    entrada.getLinha(),
                    entrada.getFluxoTotal(),
                    entrada.getMediaDia(),
                    entrada.getMaiorMaximaDiaria(),
                    entrada.getId()
            });
        }
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }

    public void inserirDemandaBatch(List<DemandaPorEstacao> estacoes) {
        String sql = """
            INSERT INTO demandaPorEstacao (id, fk_empresa, ano, mes, linha, fluxo, estacao) 
            SELECT ?, 1, ?, ?, ?, ?, ?
            WHERE NOT EXISTS ( SELECT 1 FROM demandaPorEstacao WHERE id = ? )
        """;
        List<Object[]> batchArgs = new ArrayList<>();
        for (DemandaPorEstacao estacao : estacoes) {
            batchArgs.add(new Object[]{
                    estacao.getId(),
                    estacao.getAno(),
                    estacao.getMes(),
                    estacao.getLinha(),
                    estacao.getFluxo(),
                    estacao.getEstacao(),
                    estacao.getId()
            });
        }
        jdbcTemplate.batchUpdate(sql, batchArgs);
    }
}
