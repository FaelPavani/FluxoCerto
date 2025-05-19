package school.sptech.model;

import java.util.ArrayList;
import java.util.List;

public class Empresa {
    private Integer id;
    private String nomeFantasia;
    private String razaoSocial;
    private String cnpj;
    private String nomeResponsavel;
    private String email;
    private List<Funcionario> funcionarios;

    public Empresa(Integer id, String nomeFantasia, String razaoSocial, String cnpj, String nomeResponsavel, String email) {
        this.id = id;
        this.nomeFantasia = nomeFantasia;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.nomeResponsavel = nomeResponsavel;
        this.email = email;
        this.funcionarios = new ArrayList<Funcionario>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    @Override
    public String toString() {
        return "Empresa{" +
                "id=" + id +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", cnpj='" + cnpj + '\'' +
                ", nomeResponsavel='" + nomeResponsavel + '\'' +
                ", email='" + email + '\'' +
                ", funcionarios=" + funcionarios +
                '}';
    }
}
