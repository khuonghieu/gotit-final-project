export default (store) => (next) => (action) => {
  if (action.promise instanceof Promise) {
    return action.promise.then(
      async (result) => {
        if (result.ok) {
          next(action);
          const successResult = await result.json();
          store.dispatch({
            type: `${action.type}_SUCCESS`,
            payload: successResult,
          });
          return {
            success: true,
            payload: successResult,
          };
        }
        next(action);
        const failResult = await result.json();
        store.dispatch({
          type: `${action.type}_FAILURE`,
          payload: failResult,
        });
        return {
          success: false,
          payload: failResult,
        };
      },
      async (err) => {
        next(action);
        store.dispatch({ type: `${action.type}_FAILURE`, payload: err });
        return {
          success: false,
          payload: await err,
        };
      },
    );
  }
  next(action);

  return Promise.resolve();
};
