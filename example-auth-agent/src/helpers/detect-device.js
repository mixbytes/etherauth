const userAgent = navigator.userAgent.toLowerCase();

export const IS_IOS = ['ipad', 'iphone', 'ipod'].indexOf((navigator.platform || '').toLowerCase()) >= 0;
export const IS_ANDROID = /(android)/i.test(userAgent);
export const IS_XIAOMI_BROWSER = /(MiuiBrowser)/i.test(userAgent);
export const IS_MOBILE_OS = IS_IOS || IS_ANDROID;