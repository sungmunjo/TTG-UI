import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 이미지에 필요한 파일만 .next/standalone 으로 모아준다
  output: "standalone",
  // 아직 작업 중인 코드의 lint 에러(미사용 변수 등) 때문에 배포 빌드가 막히지 않게 한다.
  // lint 는 `npm run lint` 로 따로 확인한다.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
