/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const fetch = require('cross-fetch');
const siteDictionnary = {
  'nca': 'news.com.au',
  'news.com.au': 'news.com.au',
  'N C A': 'news.com.au',
  'the daily telegraph': 'dailytelegraph.com.au',
  'D T': 'dailytelegraph.com.au',
  'deetee': 'dailytelegraph.com.au',
  'the deetee': 'dailytelegraph.com.au',
  'dailytelegraph': 'dailytelegraph.com.au',
  'daily telegraph': 'dailytelegraph.com.au',
  'the herald sun': 'heraldsun.com.au',
  'H S': 'heraldsun.com.au',
  'eychess': 'heraldsun.com.au',
  'the eychess': 'heraldsun.com.au',
  'heraldsun': 'heraldsun.com.au',
  'herald sun': 'heraldsun.com.au'
}

const request = async (url) => {
  console.log('request()', url);
  const response = await fetch(url);
  const json = await response.json();
  console.log('request() json', json);
  return json;
};

console.log('Lambda executing');



// ------------------------------------------------------------
// Article Status
// ------------------------------------------------------------
const StatusHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest' && request.intent.name === 'StatusIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`The article ${handlerInput.requestEnvelope.request.intent.slots.articleId.value} is stuck in WP publishing. Do you want to know anything else ?`)
      .reprompt('What do you want next ?')
      .getResponse();
  },
};

// ------------------------------------------------------------
// Chartbeat
// ------------------------------------------------------------
const ChartbeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest' && request.intent.name === 'ChartBeatIntent');
  },
  async handle(handlerInput) {
    console.log('ChartbeatHandler.handle');
    const site = handlerInput.requestEnvelope.request.intent.slots.site.value;
    const siteNormalized = siteDictionnary[site];
    console.log('siteNormalized', siteNormalized);

    // https://api.chartbeat.com/live/toppages/v3/?apikey=55d4b82e24d28d821dac0fc802dac83f&host=dailytelegraph.com.au
    let data = await request(`https://api.chartbeat.com/live/toppages/v3/?apikey=55d4b82e24d28d821dac0fc802dac83f&host=${siteNormalized}`);
    
    console.log('data', data.pages);

    return handlerInput.responseBuilder
      .speak(`The top story for ${siteNormalized} is <voice name="Russell"><prosody rate="120%">${data.pages[1].title.split('|')[0]}</prosody></voice>, ${data.pages[1].stats.people} people are currently reading it. Do you want to know anything else ?`)
      .reprompt('What do you want next ?')
      .getResponse();
  }
};

// ------------------------------------------------------------
// Article publishing
// ------------------------------------------------------------
const ArticlePublishingHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest' && request.intent.name === 'ArticlePublishingIntent');
  },
  async handle(handlerInput) {
    console.log('ArticlePublishingHandler.handle');

    let data = await request(`https://devfoundry.herokuapp.com/article-updates/report`);
    
    console.log('data', data.pages);
    let speak = `Over the last hour, ${data.complete.length} ${(data.complete.length==1)?'article was':'articles were'} successfully published and ${data.pending.length} ${(data.pending.length==1)?'is':'are'} pending.`
    if(data.failed.length) speak += ` You might want to get in touch with support desk, as I'm seeing ${data.failed.length} in an abnormal state.`;

    return handlerInput.responseBuilder
      .speak(speak)
      .reprompt('What do you want next ?')
      .getResponse();
  }
};















// ------------------------------------------------------------
// Launch
// ------------------------------------------------------------
const LaunchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Hey there, what can I help you with today?')
      .reprompt('What do you want next ?')
      .getResponse();
  },
};
// ------------------------------------------------------------
// Default handlers
// ------------------------------------------------------------
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};





// ------------------------------------------------------------
// Const
// ------------------------------------------------------------

const HELP_MESSAGE = 'You can ask me about top stories, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';



// ------------------------------------------------------------
// Bootstrap
// ------------------------------------------------------------

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    StatusHandler,
    ChartbeatHandler,
    ArticlePublishingHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
