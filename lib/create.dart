import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'dart:async';

import './model/Weather.dart';
import './db/database_helper.dart';

class CreateWeather extends StatefulWidget {
  final Weather weather;

  CreateWeather(this.weather);

  @override
  State<StatefulWidget> createState() => new _CreateWeatherState();
}

class _CreateWeatherState extends State<CreateWeather> {
  DatabaseHelper db = new DatabaseHelper();

  final f = new DateFormat('dd/MM/yyyy');

  DateTime _datePicked;
  TextEditingController _weatherController;
  TextEditingController _minController;
  TextEditingController _maxController;
  TextEditingController _preciptationController;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: _datePicked,
        firstDate: DateTime(1970),
        lastDate: DateTime(2100));

    if (picked != null && picked != _datePicked)
      setState(() {
        _datePicked = picked;
      });
  }

  @override
  void initState() {
    super.initState();

    _datePicked = DateTime.parse(widget.weather.date);
    _weatherController =
        new TextEditingController(text: widget.weather.weather);
    _minController =
        new TextEditingController(text: widget.weather.min.toString());
    _maxController =
        new TextEditingController(text: widget.weather.max.toString());
    _preciptationController =
        new TextEditingController(text: widget.weather.preciptation.toString());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Cadastro de Climas')),
        body: SingleChildScrollView(
          child: Container(
            margin: EdgeInsets.all(16),
            alignment: Alignment.center,
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.all(8),
                  child: Image.network(
                    'https://img.r7.com/images/2014/08/01/19wp6237ms_2c5n7mzbhg_file.jpg?dimensions=660x360&&amp;&amp;&amp;resize=660x360&amp;crop=1200x655+0+145',
                    width: 300,
                  ),
                ),
                Row(children: [
                  Expanded(child: Text(f.format(_datePicked))),
                  RaisedButton(
                    child: Text('Selecionar Data'),
                    onPressed: () {
                      _selectDate(context);
                    },
                  ),
                ]),
                TextField(
                  controller: _weatherController,
                  decoration: InputDecoration(labelText: 'Clima'),
                ),
                TextField(
                  controller: _minController,
                  decoration: InputDecoration(labelText: 'Temperatura Mínima'),
                  keyboardType: TextInputType.number,
                ),
                TextField(
                  controller: _maxController,
                  decoration: InputDecoration(labelText: 'Temperatura Máxima'),
                  keyboardType: TextInputType.number,
                ),
                TextField(
                  controller: _preciptationController,
                  decoration: InputDecoration(labelText: 'Precipitação'),
                  keyboardType: TextInputType.number,
                ),
                Container(
                    margin: const EdgeInsets.all(8),
                    child: RaisedButton(
                      child: (widget.weather.id != null)
                          ? Text('Alterar')
                          : Text('Inserir'),
                      onPressed: () {
                        if (widget.weather.id != null) {
                          db
                              .updateWeather(Weather.fromMap({
                            'id': widget.weather.id,
                            'date': _datePicked.toString(),
                            'weather': _weatherController.text,
                            'min': double.tryParse(_minController.text),
                            'max': double.tryParse(_maxController.text),
                            'preciptation':
                                double.tryParse(_preciptationController.text),
                          }))
                              .then((_) {
                            Navigator.pop(context, 'update');
                          });
                        } else {
                          db
                              .inserirWeather(Weather(
                            widget.weather.id,
                            _datePicked.toString(),
                            _weatherController.text,
                            double.tryParse(_minController.text),
                            double.tryParse(_maxController.text),
                            double.tryParse(_preciptationController.text),
                          ))
                              .then((_) {
                            Navigator.pop(context, 'save');
                          });
                        }
                      },
                    )),
              ],
            ),
          ),
        ));
  }
}
