/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/**
 * React Ventrane Analytics Module
 *
 * @package react-va
 * @author  Ventrane Open-source
 * @creator Anayo Oleru
 */

/**
 * Utilities
 */

import socketIOClient from 'socket.io-client';
import { customAlphabet } from 'nanoid';

import info from './utils/info.js';
import warn from './utils/warn.js';
import trim from './utils/trim.js';

const REACTVA_URL = 'https://analytics.ventraneapis.com';
const LOCATION_URL = 'https://extreme-ip-lookup.com/json/';

export const socket = socketIOClient(REACTVA_URL, {
  transports: ['websocket'],
});

const userIdentity = customAlphabet('1234567890abcdef', 3);
const IdFromStorage = localStorage.getItem('VA-online-ID');
// get and stringigfyit
// const data = localStorage.getItem('VA-online-data');

const data = () => {
  try {
    const value = localStorage.getItem('VA-online-data');
    return value !== undefined || null ? JSON.parse(value) : null;
  } catch (error) {
    return warn(error);
  }
};

const newData = {
  platformName: '',
  location: {},
};

export const deviceType = () => {
  const ua = navigator.userAgent;
  let device;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }
  return device;
};

export const initialize = (platformName) => {
  const projectName = trim(platformName);
  if (data !== null && projectName === '') {
    return warn(
      'You need to pass your platformName to Initialize Method to initialize Ventrane Analytics. Copy the platform name from your dashboard and pass it as a params;',
    );
  }

  fetch(LOCATION_URL)
    .then((res) => res.json())
    .then((locate) => {
      const { country, city, continent } = locate;
      // const device = deviceType();

      const ua = navigator.userAgent;
      let device;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device = 'tablet';
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua,
        )
      ) {
        device = 'mobile';
      } else {
        device = 'desktop';
      }

      // console.log();

      // generate a unique new userID and save it to local-storage
      localStorage.setItem('VA-online-ID', userIdentity());
      // set up user data
      newData.location = { country, city, continent };
      newData.platformName = projectName;
      localStorage.setItem('VA-online-data', JSON.stringify(newData));

      socket.emit('online', {
        platformName,
        country,
        device,
      });
    })
    .catch((error) => warn(error));
};

export const pageView = (page, projectId, APIKey) => {
  // if no page use window.location.pathname + window.location.search
  if (data() === undefined || data() === null) {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate pageView',
    );
  }
  if (data() && data().platformName === '') {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate pageView',
    );
  }

  const accessKey = trim(projectId);
  const apiKey = trim(APIKey);
  const path = trim(page);

  if (!path || path === '') {
    return warn(
      'page is required, page name or the identity of the page should be passed to the `page(pageName)` method',
    );
  }

  if (!accessKey) {
    return warn(
      'Access Key is required, copy access key from your VA dashboard and paste here.',
    );
  }

  if (!apiKey) {
    return warn(
      'API Key is required, copy API key from your VA dashboard and pass as params to this method',
    );
  }

  if (!IdFromStorage || IdFromStorage === null) {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate pageView',
    );
  }

  const ua = navigator.userAgent;
  let device;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  // const { country, city, continent } = data.location;
  info(data());
  fetch(`${REACTVA_URL}/api/v1/page/visit/${accessKey}`, {
    method: 'POST',
    body: JSON.stringify({
      page: path,
      APIKey: apiKey,
      device,
      visitorId: IdFromStorage,
      country: data().location.country,
      city: data().location.city,
      continent: data().location.continent,
    }),
    headers: {
      'Content-Type': 'Application/json',
      Accept: 'Application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      socket.emit('pageView', {
        platformName: data().platformName,
      });
    })
    .catch((error) => warn(error));
};

export const click = (button, projectId, APIKey) => {
  // if no button use platform name
  if (data() === undefined || data() === null) {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate click',
    );
  }
  if (data() && data().platformName === '') {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate click',
    );
  }

  const buttonName = trim(button);
  const accessKey = trim(projectId);
  const apiKey = trim(APIKey);

  if (!buttonName || buttonName === '') {
    return warn(
      'button name is required, button name or the identity of the button should be passed to the `click(buttonName)` method',
    );
  }

  if (!accessKey) {
    return warn(
      'Access Key is required, copy access key from your VA dashboard and paste here.',
    );
  }

  if (!apiKey) {
    return warn(
      'API Key is required, copy API key from your VA dashboard and pass as params to this method',
    );
  }

  if (!IdFromStorage || IdFromStorage === null) {
    return warn(
      'You need to initialize VA with the `initialize` method to successfully integrate click',
    );
  }

  const ua = navigator.userAgent;
  let device;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  // const {
  //   country, city, continent,
  // } = data.location;
  fetch(`${REACTVA_URL}/api/v1/button/click/${accessKey}`, {
    method: 'POST',
    body: JSON.stringify({
      button,
      APIKey: apiKey,
      device,
      visitorId: IdFromStorage,
      country: data().location.country,
      city: data().location.city,
      continent: data().location.continent,
    }),
    headers: {
      'Content-Type': 'Application/json',
      Accept: 'Application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      socket.emit('click', {
        platformName: data().platformName,
      });
    })
    .catch((error) => warn(error));
};
