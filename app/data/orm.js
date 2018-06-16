var connection = require("../data/connection.js");

function printUserName(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (User name => 'User Name')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}
// Object for all our SQL statement functions.
var orm = {
  allMovies: function (colName,table,cb) {
    var queryString = "SELECT " + colName+",";
    queryString += " COUNT(*) AS C FROM " + table;
    queryString += " GROUP BY " + colName;
    queryString += " HAVING C > 1";
    queryString += " ORDER BY C DESC";
    // console.log("\n"+queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  allCharacters: function(colName,table,movieCol,movieName,cb){
    var queryString = "SELECT " + colName;
    queryString += " FROM "+table;
    queryString += " WHERE "+movieCol;
    queryString += " = "+"'"+movieName+"'"+";";
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  all: function (tableInput, mm) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      mm(result);
    });
  },
  create: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
  delete: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
  allChatMessages: function ( colName, col2Name, table, cb){
    let queryString = "SELECT " + colName + ","+ col2Name;
    queryString += " FROM " + table; 

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      
      cb(result);
    });
  },

  postComments : function (username, comment, cb){

      let queryString =  ` INSERT into usersBlog  ( user,  comments  ) VALUES ( 
        '${username}' , '${comment}' );
      `
      connection.query(queryString, function (err, result) {
        if (err) {
          throw err;
        }
        
        cb(result);
      });
  },
};

// Export the orm object for the model (marvel.js).
module.exports = orm;