const args = process.argv;
var filename = args[2];

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream(filename)
});

rd.on('line', function(line) {
	getSrcTag = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/gi;
	getImgUrl = /src="(.*)"/;
	res = line.match(getSrcTag);

	const fs = require('fs');
	let writeStream = fs.createWriteStream('imgUrlList.txt');

	res.forEach(function(element) {
	  writeStream.write(element.match(getImgUrl)[1] + "\r\n", 'UTF-8');
	});

	writeStream.on('finish', () => {  
	    console.log('wrote all url to file');
	});

	writeStream.end();  
});