const reducer = (state = {
  counter: 8,
  newsData: 'my data'
}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        counter: state.counter + 1
      })
    case 'DECREMENT':
      return Object.assign({}, state, {
        counter: state.counter - 1
      })
  }

  return state;
}

export default reducer;