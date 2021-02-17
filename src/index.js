import socketIOClient from 'socket.io-client';
import { customAlphabet } from 'nanoid';

const REACTVA_URL = 'https://termii.com/api/sms/send';
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
      alert('Visit https://termii.com/account/api to get your api key');
    } else {
      fetch(LOCATION_URL)
        .then((res) => res.json())
        .then((locate) => {
          const { country, city, continent } = locate;
          const device = deviceType();

          //   generate a new userID and save it to local-storage
          localStorage.setItem('VA-online-ID', userIdentity());

          data.location = { country, city, continent };

          socket.emit('online', {
            platformName: data.platformName,
            country,
            device: device(),
          });
        })
        .catch((error) => error);
    }
  };

  const pageView = (page) => {
    // if no page use window.location.pathname + window.location.search
    if (data.platformName === '') {
      alert('Visit https://termii.com/account/api to get your api key');
    } else {
      fetch(`${REACTVA_URL}/api/v1/page/visit/${data.projectId}`, {
        method: 'POST',
        body: JSON.stringify({
          page,
          APIKey: data.APIKey,
          device: deviceType(),
          visitorId: IdFromStorage,
          ...data.location,
        }),
        headers: {
          'Content-Type': 'Application/json',
          Accept: 'Application/json',
        },
      })
        .then((res) => res.json())
        .then((locate) => {
          console.log(locate, '>>>>>>>');
          socket.emit('pageView', {
            platformName: data.platformName,
          });
        })
        .catch((error) => error);
    }
  };

  const click = (button) => {
    // if no button use platform name
    if (data.platformName === '') {
      alert('Visit https://termii.com/account/api to get your api key');
    } else {
      fetch(`${REACTVA_URL}/api/v1/button/click/${data.projectId}`, {
        method: 'POST',
        body: JSON.stringify({
          button,
          APIKey: data.APIKey,
          device: deviceType(),
          visitorId: IdFromStorage,
          ...data.location,
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
    }
  };

  const setApi = (platformName, accessKey, APIKey) => {
    data.platformName = platformName;
    data.projectId = accessKey;
    data.APIKey = APIKey;
  };

  return {
    setApi,
    initialize,
    pageView,
    click,
  };
};

export default ReactVA;
