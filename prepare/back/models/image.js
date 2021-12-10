//* Image - 게시글에 들어있는 이미지 정보(typeScript 사용 시 type을 추론하기 편함, class 최적화 권장)
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다
        src: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
      },
      {
        ModelName: 'Image',
        TableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};
