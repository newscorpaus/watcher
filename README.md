# Watcher (DevFoundry Nov 2018)


## Phase 1

Creates cross platform workflows to allow

1. alerting if they fail and
2. investigation by business users to save on manual effort to investigate.

**Goal:** to model services calling into Watcher (don't invest time in setting)

### What problem does this solve?

1. Lets us respond coherently (across systems) to problems reported from the business.
2. Self help tool for the business.

For example, in the past we have had to deal with claims that article pages aren't updating without specific examples or proof. This tool will let us give the business a way to verify things for themselves. It will also let us have a cross teams perspective so we can follow a trail of events to talk about business facts.

### Use cases

#### 1. CAPI Article Update

* Update event from Wordpress.
* CAPI received the update
* CAPI processed the update
* CAPI published the update in SQS via Percolate
* CAPI invalidates the article in Akamai
* DCS received the CAPI Update and published it internally
* DCS invalidates the article in Tabula.
* DCS invalidates the article in Varnish.

#### 2. CAPI Legal Kill - do not solve, Kurator has a high level tool for this.

* Legal kill event from Kurator
* CAPI received the update
* CAPI processed the update
* CAPI published the update in SQS via Percolate
* CAPI invalidates the article in Akamai
* DCS received the CAPI Update and published it internally
* DCS invalidates the article in Tabula.
* DCS invalidates the article in Varnish.


#### Original

A service that can accept JSON events from a variety of systems and relate them to simple workflows - so we can see how our systems interoperate across Kurator, CAPI, TCOG, Wordpress, etc.. This is useful as it lets the business easily see whether certain things are done or not (e.g. legal kills). For a voice component, someone might subscribe to hear about events for a particular CAPI ID - e.g. "Tell me when XYZ123 is updated in TCOG".

## Phase 2

Voice assistant for phase 1, responding to Editor/Producer question, for example:

* "Alexa, have any articles failed in the last five minutes?"
* "Tell me about the dumb-blind-penguin."

**Goal:** Build an alexa skill responding to various questions, and find a way to uniquely identify an article (dumb-blind-pinguin) easier to say than a CAPI ID




## Phase 3

Abstract that Alexa skill to answer other business quiestions, for example :

* What was the Nielsen number for news.com.au last month => 3.000.000 page-views, 1th of the category general-news, growing 2% since October
* How many people are reading the top story of the Daily telegraph right now ? => 30.000 people are reading the top story "Silence your child once and for all with these 3 simple tips"
* How many people are visiting our sites on an iPhone 10 ? => In October, 32% of the visits were from iPhone 10



# Working Notes

## TODO

1) Create fake JSON events

just use manual fixtures to begin with .. a little script that generates a UUID for the CAPI ID, then takes an integer for how many events it should proceed with.

2) Create the endpoint that writes into Postgres

3) Create the validation logic

4) Create the API for UI integration.


