// front/next.config.js, 잠깐 커스텀 웹팩을 설정하고 bundle-analyzer를 쓰자, 불변성을 지키기 위해서 immer 오픈소스 라이브러리 사용가능
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // true여야 실행된다
});

module.exports = withBundleAnalyzer({
  compress: true, // 파일을 압축한다(gzip: 파일 압축에 쓰이는 응용 소프트웨어)
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development', // 배포면 'production' 아니라면 'development'
      devtool: prod ? 'hidden-source-map' : 'eval', // 배포면 'hidden-source-map'(배포 환경에서 소스코드를 숨겨준다) 아니라면 'eval'
      plugins: [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)], // googling: 'webpack moment locale tree shaking'
    };
  },
});

// 참고: nextjs(공식문서)/docs/API-Reference/next.config.js
//! npm i cross-env 정확하게 받아야된다(유사 crossenv 해킹위험)
