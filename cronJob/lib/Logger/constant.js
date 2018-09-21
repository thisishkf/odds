const color = {
	reset	: "\x1b[0m",
	black	: "\x1b[30m",
	red		: "\x1b[31m",
	green	: "\x1b[32m",
	yellow	: "\x1b[33m",
	blue	: "\x1b[34m",
	magenta	: "\x1b[35m",
	cyan	: "\x1b[36m",
	white	: "\x1b[37m",
	default : "\x1b[39m"
};

const level = {
	all		: 70,
	trace	: 60,
	debug	: 50,
	info	: 40,
	warn	: 30,
	error	: 20,
	fatal	: 10,
	off		: 0
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

module.exports = {
	color : color,
	level : level,
	days  : days
};
