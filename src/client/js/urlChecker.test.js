import { checkForUrl } from './urlChecker';

test ('Not a valid url', () => {
    expect(checkForUrl('Not a url')).toBeFalsy()
})

test ('Is a valid url', () => {
    expect(checkForUrl('https://www.google.com')).toBeTruthy()
})

