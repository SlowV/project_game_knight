package database;

import java.sql.*;

public class DbConnectSQLite {

    public static Connection instance;

    public static final String URL = "jdbc:sqlite:";
    public static String DB_NAME = "knight_game.db";

    public DbConnectSQLite() {
        try{
            instance = DriverManager.getConnection(URL + DB_NAME);
            DatabaseMetaData meta = instance.getMetaData();
            System.out.println("The driver name is " + meta.getDriverName());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Connection getInstance(){
        try {
            if(instance == null || instance.isClosed()){
                new DbConnectSQLite();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return instance;
    }

    public void createTable(){
        try {
            instance = DriverManager.getConnection(URL + DB_NAME);
            Statement stat = instance.createStatement();
            String sql = "create table if not exists " + UserTbl.TABLE_NAME + " ( " +
                    UserTbl.ID + " integer primary key autoincrement, " +
                    UserTbl.ACCOUNT + " text, " +
                    UserTbl.PASSWORD + " text, " +
                    UserTbl.CREATED_AT + " bigint, " +
                    UserTbl.UPDATED_AT + " bigint, " +
                    UserTbl.STATUS + " int)";
            stat.execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
