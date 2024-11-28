const { searchForKeyword } = require("../service/search_question_service");
const { catchAsync } = require("../utils/catchAsync");

const SearchForKeyword = catchAsync(async (req, res) => {
  const { keyword, context } = req.body;
  const response = await searchForKeyword(keyword, context);
  console.log(response);
  return res.json({
    data: response,
  });
});

module.exports = { SearchForKeyword };
