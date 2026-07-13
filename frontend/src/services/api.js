const API_URL = 'https://todoenuno.onrender.com/api';

const authHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const parseResponse = async (res) => {
    let data = null;
    try {
        data = await res.json();
    } catch (_) {
        data = null;
    }
    return { ok: res.ok, status: res.status, data };
};

export const apiGet = async (resource) => {
    const res = await fetch(`${API_URL}${resource}`);
    return parseResponse(res);
};

export const apiPost = async (resource, body, token) => {
    const res = await fetch(`${API_URL}${resource}`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(body),
    });
    return parseResponse(res);
};

export const apiPut = async (resource, body, token) => {
    const res = await fetch(`${API_URL}${resource}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(body),
    });
    return parseResponse(res);
};

export const apiDelete = async (resource, token) => {
    const res = await fetch(`${API_URL}${resource}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });
    return parseResponse(res);
};