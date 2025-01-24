const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 443; // HTTPS 포트

// SSL 인증서 로드
const sslOptions = {
    key: fs.readFileSync('./localhost-key.pem'), // 키 파일
    cert: fs.readFileSync('./localhost.pem'),   // 인증서 파일
};

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

// React의 index.html 반환
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// HTTPS 서버 실행
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running at https://localhost:${PORT}`);
});
