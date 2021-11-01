//* Comment - 사용자가 남긴 댓글 정보
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      // id가 기본적으로 들어있다
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // UserId: { 1, 2, 5.. }, // ex: 1번 사용자가 작성헸다
    // PostId: { 1, 3, 5, 6.. }, // ex: 그리고 3번 게시글 안에 달린 댓글이다
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  // sequelize 관계 설정
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 어떤 댓글을 작성자에 속해있다
    db.Comment.belongsTo(db.Post); // 어떤 댓글은 게시글에 속해있다
  };
  return Comment;
};
