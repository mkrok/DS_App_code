const say = message => {
  try {
    app.TextToSpeech(message, 1.0, 1.0);
  } catch (e) { 
    console.error('Error speaking:', e);
  }
};

export default say;
