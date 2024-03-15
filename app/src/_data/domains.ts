// export a domain mapping for known domains
// this would be configured for your system
function calculateDomainMapping() {
    return {
        'local.microsoft.com': {
            id: 'microsoft',
            name: 'Microsoft',
            baseUri: 'http://local.microsoft.com:3080',
            meta: {},
        },
        'local.amazon.com': {
            id: 'amazon',
            name: 'Amazon',
            baseUri: 'http://local.amazon.com:3080',
            meta: {},
        },
        'local.google.com': {
            id: 'google',
            name: 'Google',
            baseUri: 'http://local.google.com:3080',
            meta: {},
        }
    };
}

export default calculateDomainMapping();
