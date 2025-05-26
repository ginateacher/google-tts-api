const textToSpeech = require('@google-cloud/text-to-speech');

// 讀取 GOOGLE_TTS_KEY_JSON 環境變數（字串），並解析為 JSON
const key = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const client = new textToSpeech.TextToSpeechClient({ credentials: key });

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const word = req.query.word;
  if (!word) {
    res.status(400).send('Missing word');
    return;
  }

  const request = {
    input: { text: word },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('TTS Error:', err);
    res.status(500).send('TTS Failed');
  }
};
