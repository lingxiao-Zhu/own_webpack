/**
 *
 * @param reducer
 * @param preloadedState
 * @param enhancer
 */
export default function createStore(reducer, preloadedState?, enhancer?) {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners: (() => void)[] | null = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  /*
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState() {
    return currentState;
  }

  function subscribe(listener: () => void) {
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    return function unsubscribe() {
      if (!isSubscribed) return;

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing.');
      }
    };
  }
}