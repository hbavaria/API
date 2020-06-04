using Oe.Application.Client;
using Oe.Application.DataContracts;
using Oe.Application.DataContracts.Authentication;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace WebApi
{
    class Program
    {
        static void Main(string[] args)
        {
            int port = 5051;
            Console.WriteLine($@"
Usage:
    DVL.DeltaVLiveAuthToken.exe         - start api on port {port} (default)
    DVL.DeltaVLiveAuthToken.exe 8080    - start api on port 8080
    DVL.DeltaVLiveAuthToken.exe -h      - show this help
");
            foreach (string arg in args)
            {
                //Run as a service if our argument is there
                switch (arg.ToLower())
                {
                    case "-h":
                    case "/h": return;  // we showed the help, now quit
                    default:
                        if (int.TryParse(args[0], out port)) break;
                        break;
                }
            }

            Console.WriteLine($@"
Fetch examples:
    http://localhost:{port}/  - retrieves an auth request body to be used in
                              a browser app to retrieve an auth cookie
");

            Go(port);
            while (Console.ReadKey().Key != ConsoleKey.Escape) ;
        }

        static Guid instanceToken = default(Guid);

        static async void Go2(int port = 5051)
        {
            //Console.WindowWidth = 150;

            var prefix = $"http://+:{port}/";
            var listener = new HttpListener();
            listener.Prefixes.Add(prefix);
            listener.Start();
            Console.WriteLine($"Listening: {prefix}");

            for (; ; )
            {
                HttpListenerContext context = await listener.GetContextAsync();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                if (request.RawUrl != "/")
                {
                    response.StatusCode = 404;
                    response.Close();
                    continue;
                }

                var json = await getJsonRequest();
                Console.WriteLine(json);

                response.ContentType = "application/json; charset=utf-8";
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(json);
                response.Close(buffer, false);
            }
            //listener.Stop();
        }

        private static async Task<string> getJsonRequest()
        {
            var oeClient = new OeClient();

            if (instanceToken == default(Guid))
            {
                // Connect the client instance
                var instResponse = await oeClient.RequestAsync<AddInstanceResponse>(new AddInstanceRequest()).ConfigureAwait(true);
                instanceToken = instResponse.InstanceToken;
                Console.WriteLine($"\nInstance Token: {instResponse.InstanceToken}");
            }
            // Authenticate the client instance
            var authResponse = await oeClient.RequestAsync<AuthenticationTokenResponse>(new AuthenticationTokenRequest(instanceToken.ToString())).ConfigureAwait(true);
            var json = $@"{{
    ""authenticationToken"": ""{authResponse.Token}"",
    ""address"": ""{oeClient.Address}"",
    ""returnUrl"" : """",
    ""OpHubInstanceID"" : ""{instanceToken}""
}}";
            return json;
        }

        static async void Go(int port = 5051)
        {
            TcpListener server = new TcpListener(IPAddress.Any, port);
            server.Start();
            Console.WriteLine($"Listening on port: {port}");

            for (; ; )
            {
                TcpClient client = server.AcceptTcpClient();  //if a connection exists, the server will accept it
                NetworkStream stream = client.GetStream(); //networkstream is used to send/receive messages
                //stream.ReadTimeout = 1000;
                try
                {
                    var bytes = new byte[256];   // 'GET / '
                    var n = stream.Read(bytes, 0, bytes.Length);
                    var text = System.Text.Encoding.ASCII.GetString(bytes, 0, n).Split(new[] { ' ' }, 3);
                    Console.WriteLine("Received: {0}", string.Join(" ", text));
                    if (text.Length < 3 || !(text[0] == "POST" || text[0] == "GET") || text[1] != "/")
                    {
                        var head = System.Text.Encoding.Default.GetBytes("HTTP/1.1 404 Not Found\r\n\r\n");
                        stream.Write(head, 0, head.Length);
                    }
                    else
                    {
                        var body = System.Text.Encoding.Default.GetBytes(await getJsonRequest());  //conversion string => byte array
                        var head = System.Text.Encoding.Default.GetBytes($@"HTTP/1.1 200 OK
Content-Length: {body.Length}
Content-Type: application/json
Connection: Closed

");  //conversion string => byte array
                        stream.Write(head, 0, head.Length);
                        stream.Write(body, 0, body.Length);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                finally
                {
                    //stream.Close();
                }
            }
        }
    }
}
