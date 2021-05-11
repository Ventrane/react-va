/* eslint-disable consistent-return */
/**
 * React Ventrane Analytics Module
 *
 * @package react-va
 * @author  Ventrane Open-source <anayo_oleru@outlook.com>
 *
 */

/**
 * Utilities
 */

import socketIOClient from 'socket.io-client';
import { customAlphabet } from 'nanoid';

import info from './utils/info';
import warn from './utils/warn';
import trim from './utils/trim';

const REACTVA_URL = 'https://analytics.ventraneapis.com';
const LOCATION_URL = 'https://extreme-ip-lookup.com/json/';

export const socket = socketIOClient(REACTVA_URL, {
  transports: ['websocket'],
});

const userIdentity = customAlphabet('1234567890abcdef', 3);
const IdFromStorage = localStorage.getItem('VA-online-ID');

const ReactVA = () => {
  const data = {
    platformName: '',
    projectId: '',
    APIKey: '',
    location: {},
  };

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  };

  const initialize = () => {
    if (data.platformName === '') {
      return warn('You need to setup API with the setAPI method to initialize Ventrane Analytics');
    }
    fetch(LOCATION_URL)
      .then((res) => res.json())
      .then((locate) => {
        const { country, city, continent } = locate;
        const device = deviceType();

        //   generate a unique new userID and save it to local-storage
        //   check if there's an ID already and if the date of the ID is correct...
        localStorage.setItem('VA-online-ID', userIdentity());

        data.location = { country, city, continent };

        socket.emit('online', {
          platformName: data.platformName,
          country,
          device: device(),
        });
      })
      .catch((error) => error);
  };

  const pageView = (page) => {
    // if no page use window.location.pathname + window.location.search
    if (data.platformName === '') {
      return warn('You need to setup API with the `setAPI` method to successfully integrate pageView');
    }
    const {
      country, city, continent, APIKey,
    } = data.location;
    fetch(`${REACTVA_URL}/api/v1/page/visit/${data.projectId}`, {
      method: 'POST',
      body: JSON.stringify({
        page,
        APIKey,
        device: deviceType(),
        visitorId: IdFromStorage,
        country,
        city,
        continent,
      }),
      headers: {
        'Content-Type': 'Application/json',
        Accept: 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((locate) => {
        console.log(locate, '>>>>>>>');
        // check if it's successful then save
        socket.emit('pageView', {
          platformName: data.platformName,
        });
      })
      .catch((error) => error);
  };

  const click = (button) => {
    // if no button use platform name
    if (data.platformName === '') {
      return warn('You need to setup API with the `setAPI` method to successfully integrate click');
    }
    const {
      country, city, continent, APIKey,
    } = data.location;
    fetch(`${REACTVA_URL}/api/v1/button/click/${data.projectId}`, {
      method: 'POST',
      body: JSON.stringify({
        button,
        APIKey,
        device: deviceType(),
        visitorId: IdFromStorage,
        country,
        city,
        continent,
      }),
      headers: {
        'Content-Type': 'Application/json',
        Accept: 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((locate) => {
        console.log(locate, '>>>>>>>');
        socket.emit('click', {
          platformName: data.platformName,
        });
      })
      .catch((error) => error);
  };

  const setApi = (platformName, accessKey, APIKey) => {
    if (!platformName || !accessKey || !APIKey) {
      return info('platformName, accessKey and APIKey is required in setApi');
    }
    data.platformName = platformName;
    data.projectId = trim(accessKey);
    data.APIKey = trim(APIKey);
  };

  return {
    setApi,
    initialize,
    pageView,
    click,
  };
};

export default ReactVA;
