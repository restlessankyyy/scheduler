const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

async function analyzeText(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;
  console.log(`Text sentiment: ${sentiment.score}`);
  return sentiment.score;
}

module.exports = { analyzeText };