import express from 'express';

const router = express.Router();

const getKoreaTime = () => {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 변환
  return koreaTime;
};

router.get('/', (req, res) => {
  const koreaTime = getKoreaTime();

  res.json({
    status: 'ok',
    uptime: `${Math.floor(process.uptime())} seconds`,
    serverTime: {
      iso: koreaTime.toISOString(),
      local: koreaTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    },
  });
});

export default router;
