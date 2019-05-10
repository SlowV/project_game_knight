package Knight;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.google.gson.Gson;
import database.DbConnectSQLite;
import model.Account;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

public class ServerGame  {
    public static void main(String[] args) {
        HashMap<Long, SocketIOClient> socketMap = new HashMap<>();

        DbConnectSQLite connect = new DbConnectSQLite();
        Connection conn = DbConnectSQLite.getInstance();
        try {
            System.out.println(conn.getMetaData());

        } catch (SQLException e) {
            e.printStackTrace();
        }

        connect.createTable();

        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(8088);
        SocketIOServer server = new SocketIOServer(config);

        server.start();
        System.out.println("Server running...");

        server.addConnectListener(socketIOClient -> {
            System.out.println("IP connect: " + socketIOClient.getRemoteAddress());
            socketIOClient.joinRoom("Game");
        });

        server.addDisconnectListener(socketIOClient -> {
            System.out.println("IP disconnect: " + socketIOClient.getRemoteAddress());
        });

        server.addEventListener("AccountLogin", Account.class, (socketIOClient, account, ackRequest) -> {
            Account account1 = new Account(account.getAccount(), account.getPassword());
            System.out.println(socketIOClient.getRemoteAddress()+ " post data :" + account1.toString());
            socketMap.put(account1.getId(), socketIOClient);

            socketIOClient.sendEvent("UserInfo" ,new Gson().toJson(account1));
        });

    }

}
