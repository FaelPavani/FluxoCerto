package school.sptech.conexaoBanco.models;

import java.sql.Date;

public class EntradaPorLinha extends DadoMetro {
    private Date dataColeta;
    private String linha;
    private Integer fluxoTotal;
    private Integer mediaDia;
    private Integer maiorMaximaDiaria;

    public EntradaPorLinha() {
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
                "dataColeta=" + dataColeta +
                ", linha='" + linha + '\'' +
                ", fluxoTotal=" + fluxoTotal +
                ", mediaDia=" + mediaDia +
                ", maiorMaximaDiaria=" + maiorMaximaDiaria +
                '}';
    }
}
