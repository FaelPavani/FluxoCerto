package school.sptech.conexaoBanco.models;

public class DemandaPorEstacao {
    private Integer id;
    private Integer fkEmpresa;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
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
                "id=" + id +
                ", fkEmpresa=" + fkEmpresa +
                ", ano=" + ano +
                ", mes='" + mes + '\'' +
                ", linha='" + linha + '\'' +
                ", fluxo=" + fluxo +
                ", estacao='" + estacao + '\'' +
                '}';
    }
}
