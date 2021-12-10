//* Comment - 사용자가 남긴 댓글 정보(typeScript 사용 시 type을 추론하기 편함, class 최적화 권장)
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        // UserId: 1
        // PostId: 3
      },
      {
        ModelName: 'Comment',
        TableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User); // 어떤 댓글을 작성자에 속해있다
    db.Comment.belongsTo(db.Post); // 어떤 댓글은 게시글에 속해있다
  }
};
