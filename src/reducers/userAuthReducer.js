import CONSTANTS from '../actions/constants';

export const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  didUpdate: false,
  accounts: [
    {
      screen_name: 'Your Handle Here',
      total_followers: 'TBD',
      total_following: 'TBD',
      total_post: 'TBD',
      profile_img: 'https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg',
      location: '',
    },
  ],
  drawer: true,
  drawerContent: 'HOME',
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.USER_APICALL_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        didUpdate: action.didUpdate ?? state.didUpdate,
      };
    case CONSTANTS.USER_APICALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: action.currentUser ?? state.currentUser,
        didUpdate: action.didUpdate ?? state.didUpdate,
      };
    case CONSTANTS.USER_APICALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CONSTANTS.TOPIC_FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    // case CONSTANTS.TOPIC_FETCH_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: null,
    //   };
    case CONSTANTS.TOPIC_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CONSTANTS.DRAWER_SWITCH:
      return {
        ...state,
        error: null,
        drawer: !state.drawer,
      };
    case CONSTANTS.DRAWER_OPEN:
      return {
        ...state,
        error: null,
        drawerContent: action.payload,
      };
    case CONSTANTS.ACCOUNTS_FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CONSTANTS.ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accounts: [action.payload],
      };
    case CONSTANTS.ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CONSTANTS.TOGGLEUPDATE:
      return {
        ...state,
        didUpdate: action.payload || !state.didUpdate,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
