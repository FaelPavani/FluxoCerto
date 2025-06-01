package school.sptech.infra;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {

    private static HttpClient client = HttpClient.newHttpClient();
    private static final String url = System.getenv("URL_WEBHOOK");

    public static void enviarMensagem(JSONObject content) throws IOException, InterruptedException {
        if (url == null || !url.startsWith("https://")) {
            throw new IllegalArgumentException("Webhook URL inválida ou não configurada.");
        }

        HttpRequest request = HttpRequest.newBuilder(
                    URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.printf("Status: %s%n", response.statusCode());
        System.out.printf("Response: %s%n", response.body());
    }
}
