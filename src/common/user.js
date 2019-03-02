export var getUserSession = function() {
  return localStorage.getItem("session_id");
};
export var setUserSession = function() {
  return localStorage.setItem("session_id");
};
