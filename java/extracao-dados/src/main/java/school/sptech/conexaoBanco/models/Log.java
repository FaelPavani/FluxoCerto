package school.sptech.conexaoBanco.models;

import java.time.LocalDateTime;

public class Log {
    private Integer id;
    private Integer fk_empresa;
    private String statusResposta;
    private LocalDateTime dataColeta;
    private String descricao;
    private String origem;

    public Log() {}

    public Log(Integer fk_empresa, String statusResposta, String descricao, String origem) {
        this.fk_empresa = fk_empresa;
        this.statusResposta = statusResposta;
        this.dataColeta = LocalDateTime.now();
        this.descricao = descricao;
        this.origem = origem;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFk_empresa() {
        return fk_empresa;
    }

    public void setFk_empresa(Integer fk_empresa) {
        this.fk_empresa = fk_empresa;
    }

    public String getStatusResposta() {
        return statusResposta;
    }

    public void setStatusResposta(String statusResposta) {
        this.statusResposta = statusResposta;
    }

    public LocalDateTime getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(LocalDateTime dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", fk_empresa=" + fk_empresa +
                ", statusResposta='" + statusResposta + '\'' +
                ", dataColeta=" + dataColeta +
                ", descricao='" + descricao + '\'' +
                ", origem='" + origem + '\'' +
                '}';
    }
}
