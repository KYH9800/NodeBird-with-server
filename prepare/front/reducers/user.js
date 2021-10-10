export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// action creactor
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};
export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state, // 바꾸지 않을 데이터는 참조관계 유지
        isLoggedIn: true,
        me: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
