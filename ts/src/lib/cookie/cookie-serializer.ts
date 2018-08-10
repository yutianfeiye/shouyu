import { Cookie } from './cookie';
/***
 * Serializer and Deserializer for Cookies
 */
export class CookieSerializer {

/***
 * Serialize a Cookie
 * @param cookie The Cookie
 * @returns The Cookie as a string
 */
	public static serializeCookie(cookie: Cookie): string {
		return cookie.key + '=' + cookie.value + ';';
	}

	/***
	 * Serialize a Cookie[]
	 * @param cookies The Cookie[]
	 * @returns The Cookie[] as a string
	 */
	public static serializeCookieArray(cookies: Cookie[]): string {
		let cookiesString = '';
		for (const cookie of cookies) {
			const i: number = cookies.indexOf(cookie);
			if (i === 0) {
				cookiesString += CookieSerializer.serializeCookie(cookie);
			} else {
				cookiesString += ' ' + CookieSerializer.serializeCookie(cookie);
			}
		}
		return cookiesString;
	}

	/***
	 * Deserialize a Cookie
	 * @param cookie The Cookie as a string
	 * @returns The Cookie
	 */
	public static deserializeCookie(cookie: string): Cookie {
		let cookieString: string = cookie.toString();
		if (cookieString.charAt(0) === ' ') {
			cookieString = cookieString.substring(1, cookieString.length);
		}
		if (cookieString.charAt(cookieString.length - 1) === ';') {
			cookieString = cookieString.substring(0, cookieString.length - 1);
		}
		const cookieKeyValue: string[] = cookieString.split('=');
		const resultCookie: Cookie = new Cookie();
		resultCookie.key = cookieKeyValue[0];
		resultCookie.value = cookieKeyValue[1];
		return resultCookie;
	}
	/***
	 * Deserialize a Cookie[]
	 * @param cookies The Cookie[] as a string
	 * @returns The Cookie[]
	 */
	public static deserializeCookieArray(cookies: string): Cookie[] {
		const cookiesSpliced: string[] = cookies.split(';');
		const cookiesArray: Cookie[] = [];

		for (const cookieString of cookiesSpliced) {
			cookiesArray.push(CookieSerializer.deserializeCookie(cookieString));
		}
		return cookiesArray;
	}
}
