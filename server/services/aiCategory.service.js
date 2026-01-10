const { GoogleGenAI } = require("@google/genai");

const genAi = new GoogleGenAI({});

const generateCategory = async function (expenseDescription) {
  const response = await genAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate one category under which ${expenseDescription} falls. Give the category without using any symbols. Just put the expense under one category`,
  });

  return response.text;
};

module.exports = {
  generateCategory,
};
