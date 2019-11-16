const axios = require('axios');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	
	const parseURL = url.parse(req.url);

	if(parseURL.pathname != '/')
	{
		res.statusCode = 404;
		res.end('Page Not Found!');
	}

	const queryObj = querystring.parse(parseURL.query);
	
	if(!queryObj.repo)
	{
		res.statusCode = 404;
		res.end('Invalid Query!');
	}


	(async() => {
		try{
			const rep = await axios.get('http://api.github.com/repos/'+queryObj.repo);
			const a = rep.data.stargazers_count;
			const b = rep.data.open_issues_count;
			res.end('Repo : ' + queryObj.repo + '\nstargazers_count : ' + a + '\nopen_issues_count : ' + b);
		} catch (err){
			res.statusCode = 404;
			res.end('Repository not found!');
		}		
	})();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

	

