const { searchForKeyword } = require("../service/search_question_service");
const { catchAsync } = require("../utils/catchAsync");

const SearchForKeyword = catchAsync(async (req, res) => {
  const { keyword, context } = req.body;
  if (keyword.length > 20) {
    res.status(400).json({
      message: "Keyword must be less than 20 words",
    });
  }

  if (context.length > 200) {
    res.status(400).json({
      message: "Context must be less than 200 words",
    });
  }
  const response = await searchForKeyword(keyword, context);
  console.log(response);
  return res.json({
    data: response,
  });
});

module.exports = { SearchForKeyword };
