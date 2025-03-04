package com.school.sptech;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        System.out.println("\n        Tela de login");
        System.out.println("==============================");

        System.out.print("Digite seu email: ");
        String email = leitor.nextLine();
        System.out.print("Digite sua senha: ");
        String senha = leitor.nextLine();

        LocalDateTime dataLogin = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        System.out.println("==============================");
        System.out.println("1 - Dashboard geral \n2 - Escolher Linha \n3 - Página de perfil\n");
        System.out.print("Qual pagina deseja acessar? ");
        Integer selecao = leitor.nextInt();

        String pagina = "";
        if (selecao == 1) {
            pagina = "Dashboard geral";
        } else if (selecao == 2) {
            pagina = "Escolher Linha";
        } else if (selecao == 3) {
            pagina = "Perfil";
        }

        LocalDateTime dataPagina = LocalDateTime.now();
        System.out.println("==============================\n");
        System.out.println("Log do sistema");
        System.out.println(dataLogin.format(formatter) + " - O usuário com email " + email + " entrou no sistema.");
        System.out.println(dataPagina.format(formatter) + " - O usuario " + email + " acessou a página '" + pagina + "'.");

    }
}