//* Post - 게시글 정보
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', // MySQL에는 posts 테이블 생성
    {
      // id가 기본적으로 들어있다
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // PostId를 RetweetId로 별칭을 정하자
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
    }
  );
  // sequelize 관계 설정 (1 : N)
  //* 관계를 잘 따져보자, 하나가 여러개를 가질 수 있는지, 여러개가 하나 가질 수 있는지
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 게시글은 작성자에 속해있다
    db.Post.belongsToMany(db.Hashtag); // 다 : 다 관계
    db.Post.hasMany(db.Comment); // 한 사람이 여러개의 댓글을 작성 할 수 있다
    db.Post.hasMany(db.Image);
    // post에 좋아요를 누른 사람들
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // through: 중간 테이블의 이름을 정의
    db.Post.belongsTo(db.Post, { as: 'RetweetId' }); // 1 : N
  };
  return Post;
};
