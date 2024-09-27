const catchAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res))
		.then((data) => {
			if (data) {
				res.json(data);
			}
		})
		.catch((err) => next(err));
};
module.exports = { catchAsync };
