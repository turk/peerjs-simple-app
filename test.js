var express = require('express');
const https = require('https');
const fs = require('fs');
var app = express();


var sslOptions = {
  key: fs.readFileSync('/home/chat/public_html/nodejs-ssl-example/ssl/www.chatrulet.online.key'),
  cert: fs.readFileSync('/home/chat/public_html/nodejs-ssl-example/ssl/sertifika-crt.crt'),
  requestCert: true,
  //ca: fs.readFileSync('/etc/ssl/certs/ca.crt'),
  rejectUnauthorized: false 
};

var PeerServer = require('peer').PeerServer;

var server = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('/home/chat/public_html/nodejs-ssl-example/ssl/www.chatrulet.online.key'),
    cert: fs.readFileSync('/home/chat/public_html/nodejs-ssl-example/ssl/sertifika-crt.crt')
  }
});
	
	function requireHTTPS(req, res, next) {
    if (!req.secure) {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);
	
app.use('/public', express.static('public'));

app.get('/1', function (req, res) {
   res.sendFile( __dirname + "/" + "1.html" );
})

app.get('/2', function (req, res) {
   res.sendFile( __dirname + "/" + "2.html" );
})



var httpServer = app.listen(80, function () {

  var host = httpServer.address().address
  var port = httpServer.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

var secureServer = https.createServer(sslOptions,app).listen(443, function(){
   console.log("Express server listening on port ");

});
