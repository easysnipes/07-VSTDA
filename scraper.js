var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraper = express();

scraper.get('/scrape', function(req, res) {

    // The URL we will scrape from - in our example Anchorman 2.

    url = 'https://origin-web-scraping.herokuapp.com/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html) {

        if (!error) {

            var $ = cheerio.load(html);
            var jsonFull = [];

            $('.panel').each(function() {
                var data = $(this);

                var name = data.children().first().text().replace(/(\n)/, '').trim();
                var imageUrl = data.children().eq(1).children().first().attr('src');
                var author = data.children().eq(1).children().eq(1).text();
                var price = data.children().eq(1).children().eq(2).text();
                var json = { name: name, imageUrl: imageUrl, author: author, price: price };

                jsonFull.push(json);
            });

            fs.writeFile('books.json', JSON.stringify(jsonFull, null, 4), function(err) {});

        }
    });
});

scraper.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = scraper;