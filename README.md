# Google TTS API

這是給 ginateacher 的語音伺服器，部署到 Vercel 後，網站就可以用 Google TTS 播放單字囉 🎧✨

## 部署方式：
1. 將此專案上傳至 GitHub
2. 到 Vercel 建立專案，連接你的 GitHub 倉庫
3. 加入 Google TTS 的金鑰（JSON 檔）為環境變數 GOOGLE_APPLICATION_CREDENTIALS
4. 部署完成後，可使用 `/api/tts?word=apple` 播放語音