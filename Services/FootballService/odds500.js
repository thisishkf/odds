/**
 * @create 2018-07-20
 * @author Sam Ho <hkf1113@gmail.com>
 */
const request = require('request');
const cheerio = require('cheerio');

/**
 * 
 * @param {String}  id   Match ID in ODDS.500.com
 * @return {JSON}   JSON data of HAD Odds
 */
const _getCRS = function (id) {
    const API = 'http://odds.500.com/fenxi/bifen-#MATCHID#.shtml?ctype=2';
    return new Promise((resolve) => {
        const options = {
            method: 'GET',
            url: API.replace('#MATCHID#', id),
            gzip: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Host': 'odds.500.com',
                'Upgrade-Insecure-Requests': '1',
                'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            }
        };
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let data = {};
                $('.pub_table').find('tr').each(function (_trIndex) {
                    let _tr = $(this);
                    if (_trIndex == 0) {
                        _tr.find('th').each(function () {
                            let _th = $(this);
                            let score = _th.find('strong').html();
                            switch (score) {
                                case '4:4':
                                    data['SM1MD'] = [];
                                    break;
                                case '4:3':
                                    data['SM1MH'] = [];
                                    data['SM1MA'] = [];
                                    break;
                                case null:
                                    break;
                                default:
                                    let temp = score.split(':');
                                    data[`S0${temp[0]}0${temp[1]}`] = [];
                                    data[`S0${temp[1]}0${temp[0]}`] = [];
                            }
                        });
                    } else {
                        _tr.find('td').each(function (_tdIndex) {
                            let _td = $(this);
                            let matches = _td.html().match(/<span .*>(.*)<\/span>(.*)/);
                            switch (_tdIndex) {
                                case 3:
                                    data['S0100'].push(matches[1]);
                                    data['S0001'].push(matches[2]);
                                    break;
                                case 4:
                                    data['S0200'].push(matches[1]);
                                    data['S0002'].push(matches[2]);
                                    break;
                                case 5:
                                    data['S0201'].push(matches[1]);
                                    data['S0102'].push(matches[2]);
                                    break;
                                case 6:
                                    data['S0300'].push(matches[1]);
                                    data['S0003'].push(matches[2]);
                                    break;
                                case 7:
                                    data['S0301'].push(matches[1]);
                                    data['S0103'].push(matches[2]);
                                    break;
                                case 8:
                                    data['S0302'].push(matches[1]);
                                    data['S0203'].push(matches[2]);
                                    break;
                                case 9:
                                    data['S0400'].push(matches[1]);
                                    data['S0004'].push(matches[2]);
                                    break;
                                case 10:
                                    data['S0401'].push(matches[1]);
                                    data['S0104'].push(matches[2]);
                                    break;
                                case 11:
                                    data['S0402'].push(matches[1]);
                                    data['S0204'].push(matches[2]);
                                    break;
                                case 12:
                                    data['SM1MH'].push(matches[1]);
                                    data['SM1MA'].push(matches[2]);
                                    break;
                                case 13:
                                    data['S0000'].push(_td.html());
                                    break;
                                case 14:
                                    data['S0101'].push(_td.html());
                                    break;
                                case 15:
                                    data['S0202'].push(_td.html());
                                    break;
                                case 16:
                                    data['S0303'].push(_td.html());
                                    break;
                                case 17:
                                    data['SM1MD'].push(_td.html());
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                });
                resolve(data);
            }
        });
    });
}

const _addODDS500ID = function (hkjc_id, odds500_id) {
    mongodb.get()
        .collection('match')
        .update({ id: hkjc_id }, { "$set": { odds500ID: odds500_id } })
}

module.exports = {
    getCRS: _getCRS,
    addODDS500ID: _addODDS500ID
}