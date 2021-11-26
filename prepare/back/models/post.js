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
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'RetweetId' }); // post.addRetweetId
  }; // add, get, set, remove
  return Post;
};
