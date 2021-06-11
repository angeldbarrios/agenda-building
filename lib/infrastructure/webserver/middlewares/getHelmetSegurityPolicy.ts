import helmet from 'helmet';

export default helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'google.com'],
    baseUri: ["'self'"],
    blockAllMixedContent: [],
    fontSrc: ["'self'", 'https: data:'],
    frameAncestors: ["'self'", 'google.com'],
    frameSrc: ["'self'", 'google.com', "https: 'unsafe-inline'"],
    imgSrc: ["'self'", 'data:'],
    objectSrc: ["'none'"],
    scriptSrc: ["'self'", 'google.com', "https: 'unsafe-inline'"],
    scriptSrcAttr: ['google.com'],
    styleSrc: ["'self'", "https: 'unsafe-inline'"],
    upgradeInsecureRequests: [],
  },
});
