const asyncHandler = (reqHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqHandler(req, res, next)).catch((error) => next(error));
  };
};
export { asyncHandler };

/**
reqhandler created & passes to asyncHandler then it passes to middleware Or controller
Example:
const fn = () => {};
const getMethod = asyncHandler(fn);
-THE FINAL METHOD WHICH EXECUTED
getMethod(req, res, next);
 * 
 */
