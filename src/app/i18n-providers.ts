import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

const locale = document['locale'] as string;

export function getLocaleProvider(): String {
  return locale;
}

export function getTranslationProviders(): Promise<Object[]> {
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }

  console.log(locale);

  return getTranslationsWithES6Import(locale)
    .then((translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale}
    ])
    .catch(() => [{ provide: LOCALE_ID, useValue: locale}]); // ignore if file not found
}

declare var System: any;

function getTranslationsWithES6Import(locale: string) {
  return System.import('../locale/messages.' + locale + '.xlf');
}
