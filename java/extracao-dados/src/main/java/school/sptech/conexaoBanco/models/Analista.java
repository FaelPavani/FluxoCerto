package school.sptech.conexaoBanco.models;

public class Analista extends Funcionario{
    private String linha;
    private Gestor responsavel;

    public Analista(Integer id, String nome, String cpf, String email, String telefone, String linha, Gestor responsavel) {
        super(id, nome, cpf, email, telefone);
        this.linha = linha;
        this.responsavel = responsavel;
    }

    public String getLinha() {
        return linha;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }

    public Gestor getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Gestor responsavel) {
        this.responsavel = responsavel;
    }

    @Override
    public String toString() {
        return "Analista{" +
                "linha='" + linha + '\'' +
                ", responsavel=" + responsavel +
                '}';
    }
}
