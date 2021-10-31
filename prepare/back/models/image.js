//* Image - 게시글에 들어있는 이미지 정보
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      // id가 기본적으로 들어있다
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );
  Image.associate = (db) => {
    // todo
  };
  return Image;
};
