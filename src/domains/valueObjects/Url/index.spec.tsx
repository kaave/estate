import { toUrl } from '.';

describe('ValueObjects', () => {
  describe('Url', () => {
    describe('toUrl', () => {
      // http://, https://, //のいずれかではじまるものはOK
      it('正常系', () => {
        ['http://test.com', 'https://test.com', '//test.com'].forEach((url) => {
          expect(toUrl(url)).toBe(url);
        });
      });

      it('異常系', () => {
        ['htt://test.com', 'file://test.com', 'test.com'].forEach((url) => {
          expect(() => toUrl(url)).toThrowError();
        });
      });
    });
  });
});
