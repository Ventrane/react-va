import socketIOClient from 'socket.io-client';
import { customAlphabet } from 'nanoid';

const REACTVA_URL = 'https://termii.com/api/sms/send';
const LOCATION_URL = 'https://extreme-ip-lookup.com/json/';

export const socket = socketIOClient(REACTVA_URL, {
  transports: ['websocket'],
});

const userIdentity = customAlphabet('1234567890abcdef', 3);

const ReactVA = () => {
  const data = {
    platformName: '',
    projectId: '',
    APIKey: '',
  };

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
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
          const device = deviceType();

          //   generate a new userID and save it to local-storage
          localStorage.setItem('VA-online-ID', userIdentity());

          socket.emit('online', {
            platformName: data.platformName,
            country: locate.country,
            device: device(),
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
  };
};

export default ReactVA;
