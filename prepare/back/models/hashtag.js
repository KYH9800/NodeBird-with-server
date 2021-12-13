//* Hashtag - 게시글에 들어있는 해쉬태그 정보(typeScript 사용 시 type을 추론하기 편함, class 최적화 권장)
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        ModelName: 'Hashtag',
        TableName: 'hashtags',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};
