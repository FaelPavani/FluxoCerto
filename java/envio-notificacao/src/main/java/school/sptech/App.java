package school.sptech;

import org.json.JSONObject;

import java.io.IOException;

public class App {

    public static void main(String[] args) throws IOException, InterruptedException {

        JSONObject json = new JSONObject();

        json.put("text", "Usuário removido do sistema com sucesso!");

        Slack.enviarMensagem(json);
    }
}
