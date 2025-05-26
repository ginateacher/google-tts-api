const express = require('express');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const app = express();
app.use(express.json());

app.post('/api/speak', async (req, res) => {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const client = new TextToSpeechClient({ credentials });

  const request = {
    input: { text: req.body.text || '你好，我是語音測試' },
    voice: { languageCode: 'zh-TW', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  res.set('Content-Type', 'audio/mpeg');
  res.send(response.audioContent);
});

app.listen(3000, () => {
  console.log('🚀 TTS 服務已啟動在 port 3000');
});
