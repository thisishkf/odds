const request = require('request');
const cheerio = require('cheerio');

const _getTTGO = function (id) {
    const API = 'http://sports.williamhill.com/bet/zh-hk/betting/e/#WHID#';
    return new Promise((resolve) => {
        const options = {
            method: 'GET',
            url: API.replace('#WHID#', id),
            gzip: true,
            headers: {
                'Accept': "text/html,application/xhtml+xml,application/',xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6',
                'Host': 'sports.williamhill.com',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            }
        };
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let data = {};
                $('.tableData').each(function () {
                    let _table = $(this);
                    let _span = _table.find('thead tr th').find('span[id*="ip_market_name_"]');
                    if (_span.text().trim() == '全場入球總數') {
                        _table.find('tbody').find('td').each(function () {
                            let _td = $(this);
                            switch (_td.find('.eventselection').text().trim()) {
                                case '沒有':
                                    data['0'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '一':
                                    data['1'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '二':
                                    data['2'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '三':
                                    data['3'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '四':
                                    data['4'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '五':
                                    data['5'] = _td.find('.eventprice').html().trim();
                                    break;
                                case '六個或以上':
                                    data['6'] = _td.find('.eventprice').html().trim();
                                    break;
                            }
                        });

                    }
                });
                resolve(data);
            }
        });
    });
};

module.exports = {
    getTTGO : _getTTGO
};