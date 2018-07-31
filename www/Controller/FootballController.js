'use strict';
const express = require('express');

const { HKJCService, analyseService } = require(__dirname + '/../Services/FootballService');
const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper'); 
var _router = express.Router();


_router.get('/matches/index', async function (req, res) {
	let model = getmodel('www', ['football/matches.js']);
	model.main.data = await HKJCService.getMatchList();
	_render(res, 'football/matches/index.ejs', model);

});

_router.get('/analyse/:hkjc_id/:odds500_id/:wh_id', async function (req, res) {
	let { hkjc_id, odds500_id, wh_id } = req.params;
	let model = getmodel('www', ['football/analyse.js']);
	model.main.data = await analyseService.analyse(hkjc_id, odds500_id, wh_id);
	_render(res, 'football/matches/analyse.ejs', model);
});

_router.post('/init/analyse', async function (req, res) {
	let { hkjc_id, odds500_id, wh_id } = req.body;
	await analyseService.initAnaylseData(hkjc_id, odds500_id, wh_id);
	res.redirect(`/football/analyse/${hkjc_id}/${odds500_id}/${wh_id}`);
})

_router.get('/data/:hkjc_id', async function (req, res) {
	let model = getmodel('www', ['football/data.js']);
	model.main.data = await(HKJCService.getMatch(req.params.hkjc_id));
	_render(res, 'football/matches/data.ejs', model);
});

_router.get('/data/getChart/:hkjc_id', async function (req, res) {
	let hkjc_id = req.params.hkjc_id;
	let data = await HKJCService.getAllOdds(hkjc_id);
	makeAjax(res, true, HKJCService.makeChart(data))
});

module.exports = _router;
