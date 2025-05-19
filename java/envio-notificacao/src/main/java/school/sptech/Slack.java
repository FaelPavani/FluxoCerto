package school.sptech;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {

    private static HttpClient client = HttpClient.newHttpClient();
    private static final String url = "https://hooks.slack.com/services/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";

    public static void enviarMensagem(JSONObject content) throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder(
                    URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.printf("Status: %s%n", response.statusCode());
        System.out.printf("Response: %s%n", response.body());
        System.out.println(response);
    }
}
