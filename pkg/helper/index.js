const extractTokenFromHeader = (req) => {
	const [type, token] = req.headers.authorization?.split(" ") ?? [];
	return type === "Bearer" ? token : undefined;
};

module.exports = { extractTokenFromHeader };
