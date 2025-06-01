package school.sptech.conexaoBanco.models;

import java.time.LocalDateTime;

public class Log extends DadoMetro {
    private String statusResposta;
    private LocalDateTime dataColeta;
    private String descricao;
    private String origem;

    public Log(Integer fk_empresa, String statusResposta, String descricao, String origem) {
        super.setFkEmpresa(fk_empresa);
        this.statusResposta = statusResposta;
        this.dataColeta = LocalDateTime.now();
        this.descricao = descricao;
        this.origem = origem;
    }

    public String getStatusResposta() {
        return statusResposta;
    }

    public LocalDateTime getDataColeta() {
        return dataColeta;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getOrigem() {
        return origem;
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + super.getId() +
                ", fk_empresa=" + super.getFkEmpresa() +
                ", statusResposta='" + statusResposta + '\'' +
                ", dataColeta=" + dataColeta +
                ", descricao='" + descricao + '\'' +
                ", origem='" + origem + '\'' +
                '}';
    }
}
