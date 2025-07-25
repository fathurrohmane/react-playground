const BASE_URL = 'https://api.malubertanya.com';

// Optional: You can store token in localStorage or pass it dynamically
function getAuthToken() {
    return localStorage.getItem('token');
}

async function handleResponse(response: Response) {
    const contentType = response.headers.get('Content-Type') || '';

    if (!response.ok) {
        const errorData = contentType.includes('application/json')
            ? await response.json()
            : { message: await response.text() };
        throw new Error(errorData.message || 'API Error');
    }

    if (response.status === 204) {
        return null; // No Content
    }
    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response.text(); // fallback if not JSON
}

const api = {
    get: async (url: string, options: any = {}) => {
        const token = getAuthToken();
        return fetch(BASE_URL + url, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            },
            ...options
        }).then(handleResponse);
    },

    post: async (url: string, data: any, options: any = {}) => {
        const token = getAuthToken();
        return fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        }).then(handleResponse);
    },

    put: async (url: string, data: any, options: any = {}) => {
        const token = getAuthToken();
        return fetch(BASE_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        }).then(handleResponse);
    },

    delete: async (url: string, options: any = {}) => {
        const token = getAuthToken();
        return fetch(BASE_URL + url, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            },
            ...options
        }).then(handleResponse);
    }
};

export default api;