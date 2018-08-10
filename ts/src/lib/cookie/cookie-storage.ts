
import { Cookie } from './cookie';
import { CookieSerializer } from './cookie-serializer';

export class CookieStorage {
	public static getCookie(cookieKey: string): Cookie | undefined {
          const cookies: Cookie[] = CookieStorage.getCookies();
          for (const cookie of cookies) {
              if (cookie.key === cookieKey) {
                  return cookie;
              }
          }
		return undefined;
  }
  public static getCookies():Cookie[] {
		return CookieSerializer.deserializeCookieArray(document.cookie);
   }
  public static addCookie(cookie: Cookie): void {
		document.cookie = CookieSerializer.serializeCookie(cookie);
  }
   public static addCookies(cookies: Cookie[]): void {
          for (const cookie of cookies) {
              CookieStorage.addCookie(cookie);
          }
   }
	public static removeCookie(cookieKey: string | Cookie): void {
		if (cookieKey.constructor === Cookie) {
			return CookieStorage.removeCookie((cookieKey as Cookie).key);
		}
		document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

   public static hasCookie(cookieKey: string | Cookie): boolean {
      if (cookieKey.constructor === Cookie) {
                return CookieStorage.hasCookie((cookieKey as Cookie).key);
      }
	     for (const cookie of CookieStorage.getCookies()) {
				if (cookie.key === cookieKey) {
					return true;
				}
	}
	     return false;
   }
}
