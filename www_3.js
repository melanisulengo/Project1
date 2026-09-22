const http = require("http");
const dateTimeET = require("./src/dateTimeET");

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Melani, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Melani, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Veebiserver käivitus");
	res.write(pageHead);
	res.write(pageBody);
	res.write("<p> Täna on " + dateTimeET.day() + ", " + dateTimeET.date(1) + ". Kell on " + dateTimeET.time() + "</p>");
	res.write(pageFoot);
	return res.end();
}).listen(5218);

//res.write("<p>Täna on " + dateTimeET.date() + "."</p>")