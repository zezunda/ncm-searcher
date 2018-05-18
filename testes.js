request({ url: url }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        const $ = require('cheerio').load(body);
        $('#tbl-produtos .text-center a').each(function(i, elm) {
            let title = $(this).children('img').attr("alt").trim().split(' - ');
            let name = title[1];
            let href = $(this).attr('href');
            console.log(name);
            console.log(baseUrl + href);
        });
    }
});


const ncmMatch = /[0-9]{4}\.[0-9]{2}\.[0-9]{2}/g;

request({ url: url }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        const $ = require('cheerio').load(body);
        $('#tbl-produtos .product-list-item').each(function (i, elm) {
           let itemTitle = $(this).find('img')[0].attribs['title'];
           let codeName = itemTitle.split(' - ');
           let barCode = codeName[0];
           let name = codeName[1];
           let itemNcm = $(this).find('.list-unstyled li').text().match(ncmMatch);
           let ncm = (itemNcm) ? itemNcm[0] : ''
           console.log('----------------------------------------------------------------');
           console.log(barCode, name, ncm);
        });
    }
});

request({ url: url }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        const $ = require('cheerio').load(body);
        $('#tbl-produtos .text-center a').each(function (i, elm) {
            try {
                let title = $(this).children('img').attr("alt").trim().split(' - ');
                let barCode = title[0];
                let name = title[1];
                let href = $(this).attr('href');
                console.log(barCode, name, baseUrl + href);
            } catch (error) {
                console.log(error);
            }
        });
    }
});

request({ url: 'https://cosmos.bluesoft.com.br/produtos/7891000812006-lamem-carne' }, function (error, response, body) {

    if (error) return reject(error);

    const $ = require('cheerio').load(body);

    let title = $('.ncm-name').text();
    let itemNcm = title.match(ncmMatch);

    let ncm = (itemNcm) ? itemNcm[0] : ''
    let description = title.replace(ncmMatch, '').replace('-', '').trim();
    let cest = $('.cest-name').text().split('-')[0].trim();
    let img = $('.product-thumbnail').children()[0].attribs['src'];
    let item = itemToJson(ncm, cest, description, img);
});
