const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3'); // multer를 통해 S3로 올릴때 사용
const AWS = require('aws-sdk'); // S3 접근권한 얻을 때 사용

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

// console.log(process.env.S3_ACCESS_KEY_ID, process.env.S3_ACCESS_KEY_ID);
// AWS.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID, // .env로 보안 설정
//   scretAccessKey: process.env.S3_SECRET_ACCESS_KEY, // .env로 보안 설정
//   region: 'ap-northeast-2', // aws에 설정한 나의 위치: 아시아 태평양(서울)
// });
// 개발모드
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // filename: 고윤혁.png > 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 고윤혁
      done(null, basename + new Date().getTime() + ext); // 고윤혁2021070424239281.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 파일크기: 20MB
}); // 지금은 하드디스크에 저장하지만 AWS 배포 시 storage 옵션만 S3 서비스로 갈아끼울 예정

// // 이미지 업로드: fs, multer npm 라이브러리 사이트 참고, 배포모드
// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(), // 이렇게까지 하면 S3의 권한을 얻음, key랑 accessKey로
//     bucket: 'coding-factory-s3',
//     key(req, file, cd) {
//       cd(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, // 파일크기: 20MB
// });

//* 생성하기 (postman Tools)
// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g); // 해쉬태그를 꺼내온다
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [노드, true][리액트, true]
      await post.addHashtags(result.map((v) => v[0])); // 첫 번째 것만 추출해서 findOrCreate({...})
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image }))); // 이미지를 여러 개 올리면 image: [고윤혁.png, 태연.png]
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image }); // 이미지를 하나만 올리면 image: 고윤혁.png
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // POST /post

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files); // 업로드가 어떻게 됬는지 정보들이 담겨있음
  res.json(req.files.map((v) => v.filename)); // 어디로 업로드 되었는지에 대한 파일명들을 프론트로 보내줌
}); // POST /post/images

// router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
//   console.log(req.files); // 업로드가 어떻게 됬는지 정보들이 담겨있음
//   res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/'))); // original에서 thumb 이미지를 가져옴
//   // location 자체에 주소가 담겨있음, PostFrom에 image src에 그대로 전달(backURL 필요 X)
// }); // POST /post/images, // upload.array(), upload.single(), upload.none()

// 게시글 하나만 불러오기(공유하기)
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글 입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // GET /post/1

// 리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.'); // 남이 나의 게시글 리트윗, 그걸 또 내가 리트윗 할 수 없음(조건문 참조)
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗 했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // POST /post/1/retweet

// 댓글 작성
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // POST /post/1/commment

// LIKE && UNLIKE
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // PATCH /post/post.id/like

// 게시글 수정
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  const hashtags = req.body.content.match(/#[^\s#]+/g); // 해쉬태그를 꺼내온다
  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id, // 이렇게 하면 다른 사람이 못 지움(해당 작성자만 지울수 있음)
        },
      }
    );
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [노드, true][리액트, true]
      await post.setHashtags(result.map((v) => v[0])); // setHashtags
    }
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // PATCH /post

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // DELETE /post/post.id/like

//* 게시글 삭제하기
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id, // 이렇게 하면 다른 사람이 못 지움(해당 작성자만 지울수 있음)
      },
    }); // destroy: 파괴하다
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
}); // DELETE /post

module.exports = router;
