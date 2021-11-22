exports.isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 비어있으면 다음 미들웨어로 간다
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLogedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 비어있으면 다음 미들웨어로 간다
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근이 가능합니다.');
  }
};
