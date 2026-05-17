const isNode = typeof window === 'undefined';
// Basic polyfill for localStorage in SSR environment
const windowObj = isNode ? { localStorage: new Map<string, string>() as unknown as Storage } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str: string) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

interface ParamOptions {
	defaultValue?: string;
	removeFromUrl?: boolean;
}

const getAppParamValue = (paramName: string, { defaultValue = undefined, removeFromUrl = false }: ParamOptions = {}) => {
	if (isNode) {
		return defaultValue || null;
	}
	
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	
	if (removeFromUrl && searchParam) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	
	if (defaultValue) {
		// Only set default if nothing exists
		if (!storage.getItem(storageKey)) {
			storage.setItem(storageKey, defaultValue);
		}
		return defaultValue;
	}
	
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	
	return null;
}

const getAppParams = () => {
	// Need to check !isNode before accessing window/location safely
	if (!isNode && getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('base44_access_token');
		storage.removeItem('token');
	}
	
	return {
		appId: getAppParamValue("app_id", { defaultValue: process.env.NEXT_PUBLIC_BASE44_APP_ID }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: !isNode ? window.location.href : undefined }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION }),
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL }),
	}
}

// Warning: In Next.js App Router, using appParams directly in component renders 
// might cause Hydration mismatch because it evaluates differently on Server vs Client.
// Prefer using these within useEffect or client-side event handlers.
export const appParams = getAppParams();
