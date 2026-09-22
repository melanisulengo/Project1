const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const dateTimeET = require("./src/dateTimeET");

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Melani, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="veebiprogrammeerimine_2026_ID.png" alt=""> \n';
const pageBody = '\t<h1>Melani, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	console.log("Päring " + req.url);
	let currentURL = url.parse(req.url, true);
	console.log("Parsituna: " + currentURL.pathname);
	//console.log("Parsituna: " + currentURL.port);
	
	if(currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write("Veebiserver käivitus");
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("<p> Täna on " + dateTimeET.day() + ", " + dateTimeET.date(1) + ". Kell on " + dateTimeET.time() + "</p>");
		res.write(pageFoot);
		return res.end();
	}
	else if (currentURL.pathname === "/vanasona"){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write("Veebiserver käivitus");
		res.write(pageHead);
		res.write(pageBanner);
		//res.write(pageBody);
		res.write("\t<h1>Tänane eesti vanasõna</h1>\n<p>Siin näed tänast vanasõna</p>\n\t<hr>");
		res.write(pageFoot);
		return res.end();
	}
	else if (currentURL.pathname === "/veebiprogrammeerimine_2026_ID.png") {
		//liidame kättesaamatu kataloogi jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		try{
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch(err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=ut8"});
			return res.end("Pilti ei leitud");
		}
	}
	/*	else if (currentURL.pathname === "/veebiprogrammeerimine_2026_ID.png") {
		//liidame kättesaamatu kataloogi jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		fs.readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/png"});
				return res.end(data);
			}
		});
	}*/
	else{
		return res.end("Viga 404. Ei leia sellist lehte.");
	}
}).listen(5218);

//res.write("<p>Täna on " + dateTimeET.date() + "."</p>")