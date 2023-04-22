class Weather {
  int _id;
  String _date = DateTime.now().toString();
  String _weather = '';
  double _min = 20;
  double _max = 20;
  double _preciptation = 0;

  Weather.empty();

  Weather(this._id, this._date, this._weather, this._min, this._max,
      this._preciptation);

  Weather.map(dynamic obj) {
    this._id = obj['id'];
    this._date = obj['date'];
    this._weather = obj['weather'];
    this._min = obj['min'];
    this._max = obj['max'];
    this._preciptation = obj['preciptation'];
  }

  int get id => _id;
  String get date => _date;
  String get weather => _weather;
  double get min => _min;
  double get max => _max;
  double get preciptation => _preciptation;

  Map<String, dynamic> toMap() {
    var map = new Map<String, dynamic>();

    if (_id != null) {
      map['id'] = _id;
    }

    map['date'] = _date;
    map['weather'] = _weather;
    map['min'] = _min;
    map['max'] = _max;
    map['preciptation'] = _preciptation;

    return map;
  }

  Weather.fromMap(Map<String, dynamic> map) {
    this._id = map['id'];
    this._date = map['date'];
    this._weather = map['weather'];
    this._min = map['min'];
    this._max = map['max'];
    this._preciptation = map['preciptation'];
  }
}
