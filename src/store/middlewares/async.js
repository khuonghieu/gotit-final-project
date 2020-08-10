export default (store) => (next) => (action) => {
  if (action.promise instanceof Promise) {
    return action.promise.then(
      async (result) => {
        if (result.ok) {
          const successResult = await result.json();
          store.dispatch({
            type: `${action.type}_SUCCESS`,
            payload: successResult,
          });
          next(action);
          return {
            success: true,
            payload: successResult,
          };
        }
        const failResult = await result.json();
        store.dispatch({
          type: `${action.type}_FAILURE`,
          payload: failResult,
        });
        next(action);
        return {
          success: false,
          payload: failResult,
        };
      },
      async (err) => {
        store.dispatch({ type: `${action.type}_FAILURE`, payload: err });
        next(action);
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
