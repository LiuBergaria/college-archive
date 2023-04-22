import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

import '../model/Weather.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = new DatabaseHelper.internal();
  factory DatabaseHelper() => _instance;
  static Database _db;

  DatabaseHelper.internal();

  Future<Database> get db async {
    if (_db != null) {
      return _db;
    }

    _db = await initDb();

    return _db;
  }

  initDb() async {
    String databasesPath = await getDatabasesPath();
    String path = join(databasesPath, 'weathers.db');
    var db = await openDatabase(path, version: 1, onCreate: _onCreate);

    return db;
  }

  void _onCreate(Database db, int newVersion) async {
    await db.execute(
        'CREATE TABLE weather(id INTEGER PRIMARY KEY, date TEXT, weather TEXT, min REAL, max REAL, preciptation REAL)');
  }

  Future<int> inserirWeather(Weather weather) async {
    var dbClient = await db;

    var result = await dbClient.insert("weather", weather.toMap());

    return result;
  }

  Future<List> getWeathers() async {
    var dbClient = await db;
    var result = await dbClient.query("weather", columns: [
      "id",
      "date",
      "weather",
      "min",
      "max",
      "preciptation",
    ]);

    return result.toList();
  }

  Future<int> getCount() async {
    var dbClient = await db;

    return Sqflite.firstIntValue(
        await dbClient.rawQuery('SELECT COUNT(*) FROM weather'));
  }

  Future<Weather> getWeather(int id) async {
    var dbClient = await db;
    List<Map> result = await dbClient.query("weather",
        columns: [
          "id",
          "date",
          "weather",
          "min",
          "max",
          "preciptation",
        ],
        where: 'id = ?',
        whereArgs: [id]);

    if (result.length > 0) {
      return new Weather.fromMap(result.first);
    }

    return null;
  }

  Future<int> deleteWeather(int id) async {
    var dbClient = await db;
    return await dbClient.delete("weather", where: 'id = ?', whereArgs: [id]);
  }

  Future<int> updateWeather(Weather weather) async {
    var dbClient = await db;
    return await dbClient.update("weather", weather.toMap(),
        where: "id = ?", whereArgs: [weather.id]);
  }

  Future close() async {
    var dbClient = await db;
    return dbClient.close();
  }
}
