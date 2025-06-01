package school.sptech.conexaoBanco.models;

public class DemandaPorEstacao extends DadoMetro {
    private String ano;
    private String mes;
    private String linha;
    private Integer fluxo;
    private String estacao;

    public DemandaPorEstacao() {
    }

    public DemandaPorEstacao(String ano, String mes, String linha, Integer fluxo, String estacao) {
        this.ano = ano;
        this.mes = mes;
        this.linha = linha;
        this.fluxo = fluxo;
        this.estacao = estacao;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getLinha() {
        return linha;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }

    public Integer getFluxo() {
        return fluxo;
    }

    public void setFluxo(Integer fluxo) {
        this.fluxo = fluxo;
    }

    public String getEstacao() {
        return estacao;
    }

    public void setEstacao(String estacao) {
        this.estacao = estacao;
    }

    @Override
    public String toString() {
        return "DemandaPorEstacao{" +
                "id=" + super.getId() +
                ", fkEmpresa=" + super.getFkEmpresa() +
                ", ano=" + ano +
                ", mes='" + mes + '\'' +
                ", linha='" + linha + '\'' +
                ", fluxo=" + fluxo +
                ", estacao='" + estacao + '\'' +
                '}';
    }
}
