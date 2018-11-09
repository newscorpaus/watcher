"use strict";
/*
    Update event from Wordpress.
    CAPI received the update
    CAPI processed the update
    CAPI published the update in SQS via Percolate
    CAPI invalidates the article in Akamai
    DCS received the CAPI Update and published it internally
    DCS invalidates the article in Tabula.
    DCS invalidates the article in Varnish.

    # Naming

    Event - Origin - Verb

*/
Object.defineProperty(exports, "__esModule", { value: true });
const workflow = [
    'Wordpress Update',
    'CAPI Wordpress Update Received',
    'CAPI Update Saved',
    'CAPI Update Published',
    'DCS CAPI Update Received',
    'DCS Update Published',
    'DCS Tabula Update Received',
    'DCS Varnish Update Received'
];
exports.workflow = workflow;
//# sourceMappingURL=update.js.map