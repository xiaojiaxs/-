//检测手机号
function checkMobile(str) {
  var re = /^1\d{10}$/;
  return re.test(str);
}
//检测验证码
function checkCode(str) {
  var re = /^\d{4}$/;
  return re.test(str);
}
//检测密码
function checkPassword(str, min, max) {
  return str.length >= min && str.length <= max;
}
