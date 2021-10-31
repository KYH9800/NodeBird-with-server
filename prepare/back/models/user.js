//* User - 사용자 정보
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', // MySQL에는 users 테이블 생성
    {
      // id가 기본적으로 들어있다
      // row(행, 가로)
      email: {
        // column(열, 세로)
        type: DataTypes.STRING(30), // 조건: 이메일 글자 수 30글자 이내
        allowNull: false, // 필수여부: false-필수, true-필수 X
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME..
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100), // password는 암호화를 하기 떄문에 문자열이 길어진다
        allowNull: false, // 필수
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  User.associate = (db) => {
    // todo
  };
  return User;
};
