class Pessoa {
  int _id;
  String _nome;
  String _telefone;
  //construtor da classe
  Pessoa(this._nome, this._telefone);
  //converte dados de vetor para objeto
  Pessoa.map(dynamic obj) {
    this._id = obj['id'];
    this._nome = obj['nome'];
    this._telefone = obj['telefone'];
  }
  // encapsulamento
  int get id => _id;
  String get nome => _nome;
  String get telefone => _telefone;
  //converte o objeto em um map
  Map<String, dynamic> toMap() {
    var map = new Map<String, dynamic>();
    if (_id != null) {
      map['id'] = _id;
    }
    map['nome'] = _nome;
    map['telefone'] = _telefone;
    return map;
  }

  //converte map em um objeto
  Pessoa.fromMap(Map<String, dynamic> map) {
    this._id = map['id'];
    this._nome = map['nome'];
    this._telefone = map['telefone'];
  }
}
