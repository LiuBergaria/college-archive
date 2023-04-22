import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import './create.dart';
import './db/database_helper.dart';
import './model/Weather.dart';

class ListWeathers extends StatefulWidget {
  @override
  _ListWeathersState createState() => _ListWeathersState();
}

class _ListWeathersState extends State<ListWeathers> {
  List<Weather> items = new List();

  final f = new DateFormat('dd/MM/yyyy');

  DatabaseHelper db = new DatabaseHelper();

  @override
  void initState() {
    super.initState();

    db.getWeathers().then((weathers) {
      setState(() {
        weathers.forEach((weather) {
          items.add(Weather.fromMap(weather));
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Climas',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Climas'),
          centerTitle: true,
          backgroundColor: Colors.red,
        ),
        body: Center(
          child: ListView.builder(
              itemCount: items.length,
              padding: const EdgeInsets.all(15.0),
              itemBuilder: (context, position) {
                return Column(
                  children: [
                    Divider(height: 5.0),
                    ListTile(
                      title: Text(
                        items[position].weather,
                        style: TextStyle(
                          fontSize: 22.0,
                          color: Colors.deepOrangeAccent,
                        ),
                      ),
                      subtitle: Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Expanded(
                                child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                  Text(
                                      f.format(
                                          DateTime.parse(items[position].date)),
                                      style: new TextStyle(
                                        fontSize: 18.0,
                                      )),
                                  Text(
                                      '${items[position].min.toString()}° ~ ${items[position].max.toString()}°',
                                      style: new TextStyle(
                                        fontSize: 18.0,
                                      )),
                                  Text(
                                      '${items[position].preciptation.toString()}%',
                                      style: new TextStyle(
                                        fontSize: 18.0,
                                      ))
                                ])),
                            IconButton(
                                icon: const Icon(Icons.remove_circle_outline),
                                onPressed: () => _deleteWeather(
                                    context, items[position], position)),
                          ]),
                      leading: CircleAvatar(
                        backgroundColor: Colors.redAccent,
                        radius: 16.0,
                        child: Text(
                          '${items[position].id}',
                          style: TextStyle(
                            fontSize: 15.0,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      onTap: () => _navigateToWeather(context, items[position]),
                    ),
                  ],
                );
              }),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          backgroundColor: Colors.redAccent,
          onPressed: () => _createNewWeather(context),
        ),
      ),
    );
  }

  void _deleteWeather(
      BuildContext context, Weather weather, int position) async {
    db.deleteWeather(weather.id).then((weathers) {
      setState(() {
        items.removeAt(position);
      });
    });
  }

  void _navigateToWeather(BuildContext context, Weather weather) async {
    String result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => CreateWeather(weather)),
    );
    if (result == 'update') {
      db.getWeathers().then((weathers) {
        setState(() {
          items.clear();
          weathers.forEach((weather) {
            items.add(Weather.fromMap(weather));
          });
        });
      });
    }
  }

  void _createNewWeather(BuildContext context) async {
    //aguarda o retorno da página de cadastro
    String result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => CreateWeather(Weather.empty())),
    );
    //se o retorno for salvar, recarrega a lista
    if (result == 'save') {
      db.getWeathers().then((weathers) {
        setState(() {
          items.clear();
          weathers.forEach((weather) {
            items.add(Weather.fromMap(weather));
          });
        });
      });
    }
  }
}
