const CONSTANTS = {
  BASE_URL: 'http://ec2-54-221-52-14.compute-1.amazonaws.com',
  USER_REGISTER: '/user/signup',
  USER_LOGIN: '/login',
  USER_EDIT: '/user/update',
  USER_INFO: '/user/email',
  PROFILE_PICTURE: '/media',
  ADD_CONTACT: '/user/add-contact',
  GET_CONTACTS: '/user/contacts',
  VALIDATE_TOKEN: '/auth/validateToken?token=',
  CREATE_EVENT: '/event/create',
  UPDATE_EVENT: '/event/update',
  GET_EVENT_BY_ID: '/event',
  GET_EVENT_BY_USER_ID: 'user/events',
  CREATE_INVITATION: '/invitation/create',
};
//http://localhost:8080
export default CONSTANTS;