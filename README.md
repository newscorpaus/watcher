# Watcher

Creates cross platform workflows to allow (1) alerting if they fail and (2) investigation by business users to save on manual effort to investigate.

Goal, to model services calling into Watcher (don't invest time in setting)

## What problem does this solve?

(1) Lets us respond coherently (across systems) to problems reported from the business.

(2) Self help tool for the business.

For example, in the past we have had to deal with claims that article pages aren't updating without specific examples or proof.

This tool will let us give the business a way to verify things for themselves.

It will also let us have a cross teams perspective so we can follow a trail of events to talk about business facts.

## Use cases

### 1. CAPI Article Update

Update event from Wordpress.
CAPI received the update
CAPI processed the update
CAPI published the update in SQS via Percolate
CAPI invalidates the article in Akamai
DCS received the CAPI Update and published it internally
DCS invalidates the article in Tabula.
DCS invalidates the article in Varnish.


Editor/Producer question - "Alexa, have any articles failed in the last five minutes?"
Editor/Producer question - "Tell me about the dumb blind penguin."



### 2. CAPI Legal Kill - do not solve, Kurator has a high level tool for this.

Legal kill event from Kurator
CAPI received the update
CAPI processed the update
CAPI published the update in SQS via Percolate
CAPI invalidates the article in Akamai
DCS received the CAPI Update and published it internally
DCS invalidates the article in Tabula.
DCS invalidates the article in Varnish.


### Original
A service that can accept JSON events from a variety of systems and relate them to simple workflows - so we can see how our systems interoperate across Kurator, CAPI, TCOG, Wordpress, etc.. This is useful as it lets the business easily see whether certain things are done or not (e.g. legal kills). For a voice component, someone might subscribe to hear about events for a particular CAPI ID - e.g. "Tell me when XYZ123 is updated in TCOG".
