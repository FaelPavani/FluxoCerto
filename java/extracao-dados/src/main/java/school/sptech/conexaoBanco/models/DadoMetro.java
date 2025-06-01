package school.sptech.conexaoBanco.models;

public abstract class DadoMetro {
    private Integer id;
    private Integer fkEmpresa;

    public DadoMetro() {
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

    @Override
    public String toString() {
        return "DadoMetro{" +
                "id=" + id +
                ", fkEmpresa=" + fkEmpresa +
                '}';
    }
}
