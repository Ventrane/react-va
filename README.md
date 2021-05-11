# react-va
React Ventrane Analytics 

This is a JavaScript module that can be used to include Ventrane Analytics tracking code in a website or app that uses React for its front-end codebase.

If you use react-va too, we'd love your feedback. Feel free to file issues, ideas and pull requests against this repo.

## Add Ventrane Analytics to your React Project

Installation

npm install react-va --save

Setup and Initializing GA

import ReactVA from 'react-va';
<!-- Go to your dashboard, copy and paste the platform name, accessKey and APIKey -->
ReactVA.setApi(platformName, accessKey, APIKey);
ReactVA.initialize('UA-000000-01');

Set PageViews

<!-- default pageviews is window.location.pathname + window.location.search, but you can pass in any pageview you especially want to access -->
ReactVA.pageView()

Set clicks
<!-- pass in the name of the button -->
ReactVA.click();
