const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;

// Normally, every controller looks like this:

// try {

// }
// catch(error){

// }

// You'll end up writing try...catch hundreds of times.

// Instead:

// exports.register = asyncHandler(
//   async (req, res) => {

//       // code

//   }
// );

// Any error automatically goes to the global error middleware.