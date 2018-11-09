/// <reference types='node' />

// global types for Watcher
declare namespace Watcher {
    interface Callback {
        (err?: Error, result?: object | string): void;
    }
}
