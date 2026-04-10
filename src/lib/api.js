const BASE_URL = '/api';

function getToken() {
  const currentRole = localStorage.getItem('currentRole');
  const adminToken = localStorage.getItem('adminToken');
  const reviewerToken = localStorage.getItem('reviewerToken');
  const accessToken = localStorage.getItem('accessToken');
  
  // 优先使用角色对应的 token
  if (currentRole === 'admin') {
    return adminToken || accessToken;
  }
  if (currentRole === 'reviewer') {
    return reviewerToken || accessToken;
  }
  // 如果没有设置角色但有 adminToken，说明是管理员
  if (adminToken) {
    return adminToken;
  }
  // 否则使用通用 token
  return accessToken || reviewerToken;
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
