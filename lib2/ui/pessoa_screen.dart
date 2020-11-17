import 'package:flutter/material.dart';
import '../model/pessoa.dart';
import '../db/database_helper.dart';

class PessoaScreen extends StatefulWidget {
  final Pessoa pessoa;
  PessoaScreen(this.pessoa);
  @override
  State<StatefulWidget> createState() => new _PessoaScreenState();
}

class _PessoaScreenState extends State<PessoaScreen> {
  DatabaseHelper db = new DatabaseHelper();
  TextEditingController _nomeController;
  TextEditingController _telefoneController;
  @override
  void initState() {
    super.initState();
    _nomeController = new TextEditingController(text: widget.pessoa.nome);
    _telefoneController =
        new TextEditingController(text: widget.pessoa.telefone);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Pessoa')),
      body: Container(
        margin: EdgeInsets.all(15.0),
        alignment: Alignment.center,
        child: Column(
          children: [
            TextField(
              controller: _nomeController,
              decoration: InputDecoration(labelText: 'Nome'),
            ),
            Padding(padding: new EdgeInsets.all(5.0)),
            TextField(
              controller: _telefoneController,
              decoration: InputDecoration(labelText: 'Telefone'),
            ),
            Padding(padding: new EdgeInsets.all(5.0)),
            RaisedButton(
              child: (widget.pessoa.id != null)
                  ? Text('Alterar')
                  : Text('Inserir'),
              onPressed: () {
                if (widget.pessoa.id != null) {
                  db
                      .updatePessoa(Pessoa.fromMap({
                    'id': widget.pessoa.id,
                    'nome': _nomeController.text,
                    'telefone': _telefoneController.text
                  }))
                      .then((_) {
                    Navigator.pop(context, 'update');
                  });
                } else {
                  db
                      .inserirPessoa(Pessoa(
                          _nomeController.text, _telefoneController.text))
                      .then((_) {
                    Navigator.pop(context, 'save');
                  });
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
