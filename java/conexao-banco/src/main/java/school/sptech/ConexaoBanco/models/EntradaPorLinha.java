package school.sptech.ConexaoBanco.models;

import java.sql.Date;

public class EntradaPorLinha {
    private Integer id;
    private Integer fkEmpresa;
    private Date dataColeta;
    private String linha;
    private Integer fluxoTotal;
    private Integer mediaDia;
    private Integer maiorMaximaDiaria;

    public EntradaPorLinha() {
    }

    public EntradaPorLinha(Date dataColeta, String linha, Integer fluxoTotal, Integer mediaDia, Integer maiorMaximaDiaria) {
        this.dataColeta = dataColeta;
        this.linha = linha;
        this.fluxoTotal = fluxoTotal;
        this.mediaDia = mediaDia;
        this.maiorMaximaDiaria = maiorMaximaDiaria;
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

    public Date getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(Date dataColeta) {
        this.dataColeta = dataColeta;
    }

    public String getLinha() {
        return linha;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }

    public Integer getFluxoTotal() {
        return fluxoTotal;
    }

    public void setFluxoTotal(Integer fluxoTotal) {
        this.fluxoTotal = fluxoTotal;
    }

    public Integer getMediaDia() {
        return mediaDia;
    }

    public void setMediaDia(Integer mediaDia) {
        this.mediaDia = mediaDia;
    }

    public Integer getMaiorMaximaDiaria() {
        return maiorMaximaDiaria;
    }

    public void setMaiorMaximaDiaria(Integer maiorMaximaDiaria) {
        this.maiorMaximaDiaria = maiorMaximaDiaria;
    }

    @Override
    public String toString() {
        return "EntradaPorLinha{" +
                "id=" + id +
                ", fkEmpresa=" + fkEmpresa +
                ", dataColeta=" + dataColeta +
                ", linha='" + linha + '\'' +
                ", fluxoTotal=" + fluxoTotal +
                ", mediaDia=" + mediaDia +
                ", maiorMaximaDiaria=" + maiorMaximaDiaria +
                '}';
    }
}
