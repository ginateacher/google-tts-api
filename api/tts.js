const textToSpeech = require('@google-cloud/text-to-speech');
const express = require('express');
const app = express();
const client = new textToSpeech.TextToSpeechClient();

app.get('/api/tts', async (req, res) => {
  const word = req.query.word;
  if (!word) return res.status(400).send('Missing word');
  const request = {
    input: { text: word },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('TTS Error:', err);
    res.status(500).send('TTS Failed');
  }
});

module.exports = app;
