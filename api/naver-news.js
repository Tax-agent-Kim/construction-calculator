// ========================================
// Vercel Serverless Function
// 파일 위치: /api/naver-news.js
// ========================================

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS 요청 처리 (CORS Preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // GET 파라미터 추출
  const { keyword = '건설업', display = '10' } = req.query;
  
  // 네이버 API 설정
  const CLIENT_ID = 'UVU4OwaLbJt_pmKF9zeV';
  const CLIENT_SECRET = 'GqNvLpe3Yi';
  
  try {
    // 네이버 뉴스 API 호출
    const naverUrl = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}&display=${display}&sort=date`;
    
    const response = await fetch(naverUrl, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET
      }
    });
    
    if (!response.ok) {
      throw new Error(`네이버 API 오류: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 성공 응답
    res.status(200).json(data);
    
  } catch (error) {
    // 에러 응답
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
}
