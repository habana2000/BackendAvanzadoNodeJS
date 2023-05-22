const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['es','en'],
    directory: path.join(__dirname,'..','locales'),
    defaultLocale: 'en',
    autoReload: true,
    syncFiles: true,
    cookie: 'nodepop-locale', 
});

// para utilizar en scripts
i18n.setLocale('en');

module.exports = i18n;