// Imports all models
var db = require('../models');

// Requires express
var express = require('express');

// Requires tools for scraping articles
var cheerio = require('cheerio');
var request = require('request');

module.exports = function (app) {

// Scrapes NPR for news articles
app.get('/scrape', function(req, res) {

	request('http://www.npr.org/sections/news/', function(error, response, html) {

			const $ = cheerio.load(html);

			console.log($('article.item').length)

			$('article.item').each(function(i, element) {

					var headline = $(element).find('.item-info').find('.title').find('a').text();
					var summary = $(element).find('.item-info').find('.teaser').find('a').text();
					var link = $(element).find('.item-info').find('.title').children().attr('href');
					var date = $(element).find('.item-info').find('.teaser').find('a').find('time').attr('datetime');

					var headlineObject = {
							headline: headline,
							summary: summary, 
							link: link,
							date: date
					}

					db.Headline.create(headlineObject, function(error) {
							if (error) console.log('Article already exists: ' + headlineObject.headline)
							else {
									console.log('New article: ' + headlineObject.headline);
							}

							if (i == ($('article.item').length - 1)) {
									res.json('Scrape is complete!')
							}
					})
			});
	})
});
}