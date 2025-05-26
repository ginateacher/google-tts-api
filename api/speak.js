const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const client = new TextToSpeechClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const request = {
    input: { text: req.body.text || '你好，我是語音測試' },
    voice: { languageCode: 'zh-TW', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(response.audioContent);
};
