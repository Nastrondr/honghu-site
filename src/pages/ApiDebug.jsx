import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../lib/api';

const ApiDebug = () => {
  const [status, setStatus] = useState('idle');
  const [httpStatus, setHttpStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [reachedBackend, setReachedBackend] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [rawText, setRawText] = useState(null);
  const [requestUrl, setRequestUrl] = useState(null);

  const token = localStorage.getItem('accessToken');
  const apiPath = '/v1/works/my';
  const fullUrl = '/api' + apiPath;

  const callApi = async () => {
    setStatus('loading');
    setResponse(null);
    setError(null);
    setHttpStatus(null);
    setReachedBackend(false);
    setIsAuthError(false);
    setContentType(null);
    setRawText(null);
    setRequestUrl(fullUrl);

    try {
      const result = await request(apiPath);
      setHttpStatus(result.status);
      setResponse(result.data);
      setContentType(result.contentType);
      setRawText(result.rawText);
      setStatus(result.ok ? 'success' : 'error');
      setReachedBackend(true);

      if (result.status === 401 || result.status === 403) {
        setIsAuthError(true);
      }
    } catch (err) {
      setError(err.message);
      setStatus('error');
      setReachedBackend(false);
    }
  };

  const clearResult = () => {
    setStatus('idle');
    setHttpStatus(null);
    setResponse(null);
    setError(null);
    setReachedBackend(false);
    setIsAuthError(false);
    setContentType(null);
    setRawText(null);
    setRequestUrl(null);
  };

  const getStatusColor = (code) => {
    if (code === 200) return 'text-green-600 bg-green-50 border-green-200';
    if (code === 401 || code === 403) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (code >= 400) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusBgColor = (code) => {
    if (code === 200) return 'bg-green-500';
    if (code === 401 || code === 403) return 'bg-orange-500';
    if (code >= 400) return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">API 联调工具</h1>
          <Link to="/" className="text-primary hover:underline">返回首页</Link>
        </div>

        {/* Token 状态 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Token 状态</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {token ? (
              <div>
                <p className="text-green-600 font-medium mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Token 存在
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium">key:</span> accessToken
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium">前20位:</span> {token.slice(0, 20)}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">状态:</span> {token.length > 0 ? '非空' : '为空'}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-600 font-medium mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Token 不存在
                </p>
                <p className="text-sm text-gray-500">key: accessToken（未找到）</p>
              </div>
            )}
          </div>
        </div>

        {/* 请求信息 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">请求信息</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-mono rounded">GET</span>
              <code className="text-sm font-mono text-gray-800">{fullUrl}</code>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Token:</span> {token ? <span className="text-green-600">已携带</span> : <span className="text-red-600">未携带</span>}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">完整请求地址:</span> {typeof window !== 'undefined' ? window.location.origin : ''}{fullUrl}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Vite 代理:</span> → http://localhost:3001{fullUrl}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={callApi}
            disabled={status === 'loading'}
            className={`px-6 py-3 rounded-lg font-medium ${
              status === 'loading'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {status === 'loading' ? '请求中...' : '发送请求'}
          </button>

          {status !== 'idle' && (
            <button
              onClick={callApi}
              className="px-6 py-3 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600"
            >
              重新请求
            </button>
          )}

          {status !== 'idle' && (
            <button
              onClick={clearResult}
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              清空结果
            </button>
          )}
        </div>

        {/* 请求结果 */}
        {status !== 'idle' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">请求结果</h2>

            {/* 状态概览 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">HTTP 状态</p>
                {httpStatus ? (
                  <div className={`px-3 py-1 rounded font-mono font-bold inline-block ${getStatusColor(httpStatus)}`}>
                    {httpStatus}
                  </div>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">请求结果</p>
                <p className={`font-semibold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status === 'loading' ? '请求中' : status === 'success' ? '成功' : '失败'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">是否到达后端</p>
                <p className={`font-semibold ${reachedBackend ? 'text-green-600' : 'text-red-600'}`}>
                  {reachedBackend ? '✓ 到达' : '✗ 未到达'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-1">鉴权状态</p>
                <p className={`font-semibold ${isAuthError ? 'text-red-600' : status === 'idle' ? 'text-gray-400' : 'text-green-600'}`}>
                  {isAuthError ? '✗ 失败' : status === 'idle' ? '-' : '✓ 正常'}
                </p>
              </div>
            </div>

            {/* Content-Type */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">
                <span className="font-medium">Content-Type:</span> {contentType || '-'}
              </span>
            </div>

            {/* 状态码详情 */}
            {httpStatus && (
              <div className={`mb-6 p-4 rounded-lg border ${getStatusColor(httpStatus)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${getStatusBgColor(httpStatus)}`}></span>
                  <span className="font-semibold">
                    {httpStatus === 200 ? '请求成功' :
                     httpStatus === 401 ? '未授权 - Token 无效或已过期' :
                     httpStatus === 403 ? '禁止访问 - 权限不足' :
                     httpStatus === 404 ? '资源不存在' :
                     httpStatus >= 500 ? '服务器错误' : '请求失败'}
                  </span>
                </div>
                {isAuthError && (
                  <p className="text-sm mt-2">
                    {httpStatus === 401 ? '请重新登录获取新的 Token' : '请联系管理员获取相应权限'}
                  </p>
                )}
              </div>
            )}

            {/* 错误信息 */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                <p className="font-semibold mb-1">请求异常</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* 原始响应文本（非 JSON 时显示） */}
            {rawText && (
              <div className="mb-4">
                <p className="font-medium text-gray-600 mb-2">原始响应文本 (前 300 字符):</p>
                <pre className="bg-red-900 text-red-100 rounded-lg p-4 text-sm overflow-auto max-h-48 font-mono">
                  {rawText.slice(0, 300)}
                </pre>
              </div>
            )}

            {/* 完整响应 */}
            <div>
              <p className="font-medium text-gray-600 mb-2">完整响应 JSON:</p>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-auto max-h-96 font-mono">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDebug;
