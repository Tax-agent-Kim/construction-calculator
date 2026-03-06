<?php
// CORS 헤더 설정
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// 네이버 API 설정
$client_id = "UVU4OwaLbJt_pmKF9zeV";
$client_secret = "GqNvLpe3Yi";
$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '건설업';

// 네이버 API 호출
$url = "https://openapi.naver.com/v1/search/news.json";
$url .= "?query=" . urlencode($keyword);
$url .= "&display=10&sort=date";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "X-Naver-Client-Id: " . $client_id,
    "X-Naver-Client-Secret: " . $client_secret
));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 200) {
    echo $response;
} else {
    echo json_encode(array(
        'error' => true,
        'message' => 'API 호출 실패',
        'http_code' => $http_code
    ));
}
?>
