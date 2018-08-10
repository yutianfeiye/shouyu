// libs
import { Action } from '../../../lib/store';

// module
import { CATEGORY } from './models/category';
import { Language } from './models/language';

export const INIT = `[${CATEGORY}] INIT`;
export const USE_LANGUAGE = `[${CATEGORY}] USE_LANGUAGE`;
export const LOAD_LANGUAGE = `[${CATEGORY}] LOAD_LANGUAGE`;
export const USE_LANGUAGE_SUCCESS = `[${CATEGORY}] USE_LANGUAGE success`;
export const USE_LANGUAGE_UNSUPPORTED = `[${CATEGORY}] USE_LANGUAGE unsupported`;

export class Init implements Action {
  readonly type: string;
  constructor(public payload: any) {
    this.type = INIT;
  }
}

export class LoadLanguage implements Action {
  readonly type: string;
  constructor(public payload: string) {
    this.type = LOAD_LANGUAGE;
  }
}

export class UseLanguage implements Action {
  readonly type: string;
  constructor(public payload: string) {
    this.type = USE_LANGUAGE;
  }
}

export class UseLanguageSuccess implements Action {
  readonly type: string;
  constructor(public payload: Language) {
    this.type = USE_LANGUAGE_SUCCESS;
  }
}

export class UseLanguageUnsupported implements Action {
  readonly type: string;
  constructor(public payload: string) {
    this.type = USE_LANGUAGE_UNSUPPORTED;
  }
}

export type Actions =
  | Init
  | UseLanguage
  | LoadLanguage
  | UseLanguageSuccess
  | UseLanguageUnsupported;
