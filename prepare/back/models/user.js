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
        unique: true, // 고유한 값: true
      },
      nickname: {
        type: DataTypes.STRING(30), //? STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME..
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
  // sequelize 관계 설정하기
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 한 사람이 Post(게시글)를 여러개 가질 수 있다(작성자는 한명)
    db.User.hasMany(db.Comment); // 한 사람이 댓글을 여러개 쓸 수 있다(작성자는 한명)
    // as로 별칭을 정하는 것이 좋다
    // through: 테이블 이름을 변경
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 내가 좋아요를 누른 게시물
    // foreignKey: column의 key를 변경, 같은 테이블일때 먼저 찾는 것을 정의 (반대로 생각하면 된다)
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User;
};

// 사용자 정보 1 : 1, db.User.hasOne(db.UserInfo); >> db.UserInfo.belongsTo(db.User);
