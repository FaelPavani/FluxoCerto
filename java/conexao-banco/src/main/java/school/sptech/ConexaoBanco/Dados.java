package school.sptech.ConexaoBanco;

import java.sql.Date;
import java.time.LocalDate;

public class Dados {
    private Integer id;
    private java.sql.Date dataColeta;
    private String tipoDado;
    private String linha;

    public Dados() {
    }

    public Dados(java.sql.Date dataColeta, String tipoDado, String linha) {
        this.dataColeta = dataColeta;
        this.tipoDado = tipoDado;
        this.linha = linha;
    }

    public Integer getId() {
        return id;
    }

    public java.sql.Date getDataColeta() {
        return dataColeta;
    }

    public String getTipoDado() {
        return tipoDado;
    }

    public String getLinha() {
        return linha;
    }

    @Override
    public String toString() {
        return "Dados{" +
                "dataColeta=" + dataColeta +
                ", tipoDado='" + tipoDado + '\'' +
                ", linha='" + linha + '\'' +
                '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDataColeta(Date dataColeta) {
        this.dataColeta = dataColeta;
    }

    public void setTipoDado(String tipoDado) {
        this.tipoDado = tipoDado;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }
}
