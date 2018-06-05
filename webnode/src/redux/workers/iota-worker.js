//import iota from "../services/iota";
//console.log('___________________', iota)

onmessage = event => { // eslint-disable-line
  console.log("Message Recieved in Worker")
  console.log(self)
}