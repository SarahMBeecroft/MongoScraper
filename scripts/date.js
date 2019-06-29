var makeDate  = function() {

  var d = new Date();
  var formattedDate = '';

  // Add 1 to month because index starts at 0
  formattedDate += (d.getMonth() + 1) + '_';
  formattedDate += d.getDate() + "_";
  formattedDate += d.getFullYear();

  return formattedDate;
};

module.exports = makeDate;