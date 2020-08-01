export default (store) => (next) => (action) => {
  if (action.promise instanceof Promise) {
    return action.promise.then(
      async (result) => {
        if (result.ok) {
          store.dispatch({
            type: `${action.type}_SUCCESS`,
            payload: await result.json(),
          });
        } else {
          store.dispatch({
            type: `${action.type}_FAILURE`,
            payload: await result.json(),
          });
        }
        next(action);
      },
      (err) => {
        store.dispatch({ type: `${action.type}_FAILURE`, payload: err });
        next(action);
      },
    );
  }
  next(action);

  return Promise.resolve();
};
