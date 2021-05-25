# react-va

### React Ventrane Analytics Module

[![npm version](https://img.shields.io/npm/v/@ventrane/react-va.svg?style=flat-square)](https://www.npmjs.com/package/@ventrane/react-va)
[![npm downloads](https://img.shields.io/npm/dm/@ventrane/react-va.svg?style=flat-square)](https://www.npmjs.com/package/@ventrane/react-va)

This is a JavaScript module that can be used to include Ventrane Analytics tracking code in a website or app that uses [React](https://facebook.github.io/react/) for its front-end codebase.

If you use `react-va` too, we'd love your feedback. Feel free to file [issues, ideas and pull requests against this repo](https://github.com/Ventrane-Open-Source/react-va/issues).

## Installation

With [npm](https://www.npmjs.com/):

```bash
npm i @ventrane/react-va
```

## Usage


1. Initializing VA:

Pass the initialize method where it will be accessible to all your pages. For example: `App.js`

```js
import { initialize } from '@ventrane/react-va';

initialize('Va-905cb');
```

2. Track Page Views

```js
import { pageView } from '@ventrane/react-va';
const pagePath = window.location.pathname + window.location.search;
const accessId = get accessId from your Project Ventrane Analytics Dashboard;
const APIKey = get APIKey from your Project Ventrane Analytics Dashboard;

pageView(pagePath, accessId, APIKey);
```

2. Track clicks

```js
import { click } from '@ventrane/react-va';
const accessId = get accessId from your Project Ventrane Analytics Dashboard;
const APIKey = get APIKey from your Project Ventrane Analytics Dashboard;

click(buttonName, accessId, APIKey);
```

## API

#### initialize(platformName)

VA must be initialized using this function before any of the other tracking functions will record any data. The platform Name can be seen under Configuration Keys in your Project's Ventrane Analytics Dashboard.

---

## Development
### Submitting changes/fixes

Follow instructions inside [CONTRIBUTING.md](https://github.com/Ventrane-Open-Source/react-va/blob/main/CONTRIBUTING.md)
