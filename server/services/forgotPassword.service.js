const { ForgotPasswordModel } = require("../models");

const getRequestRecord = async function (id) {
  try {
    const record = await ForgotPasswordModel.findOne({
      where: {
        id,
      },
    });
    return record;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getRequestRecord,
};
