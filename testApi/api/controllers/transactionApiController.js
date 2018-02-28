
'use strict';

//refactor later
var mysql = require('mysql');

//create table of ids
exports.add_peer_id = function(req, res) {

  //get peer id
  var peer_id = req.query.peerid;

  var con = connect();

  //add peer sql
  var sql = "INSERT INTO testdb.peer_ids (peer_id) VALUES (\"" + peer_id + "\");";
  con.query( sql, function(err, result){
    console.log("Added new peer id.");
    res.send("accepted");
  });
};
 
exports.start_transaction = function(req, res) {
  var need = req.query.need;
  //FOR NOW WE JUST DO WEBNODES, SO WE GET THE LIST OF PEER IDS HERE.

  var con = connect();

  //add transaction and get txid
  var sql = "INSERT INTO testdb.transactions (need_requested) VALUES (\"" + need + "\");";
  con.query( sql, function(err, result){
    //get txid
    console.log("Created transaction with id ", result.insertId);

    //get items
    var possibleWebnodes = getWebnodeAddresses();

    console.log(result);
    res.send({ txid: result.insertId.toString(), items: possibleWebnodes});
  });


};


exports.need_selected = function(req, res) {

  //look up user in row
  var txid = req.query.txid;

  var con = connect();

  var sql = "SELECT * FROM testdb.transactions WHERE id =\""+ txid + "\";";

  con.query( sql, function(err, result){
    //get txid
    console.log("Need has been selected");

    console.log(sql);

    console.log(result[0].need_requested);

    //get webnode ADDRESSES
    var webnodes = getWebnodeAddresses();

    res.send("TODO");
  });

//FOR NOW WE ARE ONLY DOING WEBNODE ADDRESSES SO WE DON'T NEED TO ADD.
//I AM GOING TO SEND THE INDEX OF THE ITEM FOR NOW
};

function connect(){
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "dishsoap"

  });
  return con;
}

function getWebnodeAddresses(){
  var con = connect();

  //add transaction and get txid
  var sql = "SELECT * FROM testdb.transactions;";
  var webnode_array = [];
  con.query( sql, function(err, result){
    //get txid
    console.log("listing webnodes " );

    result.forEach(function(element) {
       webnode_array.push(element.need_requested);
    });

    //console.log(result);
    return webnode_array;
  });
}
