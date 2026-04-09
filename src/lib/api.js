const BASE_URL = '/api';

function getToken() {
  return localStorage.getItem('accessToken');
}

async function request(url, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  let data;
  let rawText;

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    rawText = await response.text();
    data = { _rawText: rawText, _notJson: true };
  }

  return {
    status: response.status,
    ok: response.ok,
    data,
    contentType,
    rawText,
  };
}

export { request };
