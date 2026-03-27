import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft, Clock, Sparkles } from 'lucide-react';

const ComingSoon = ({ 
  title = '页面建设中',
  subtitle = '我们正在努力为您打造更好的体验',
  description = '该功能即将上线，敬请期待',
  backLink = '/eco-products',
  backText = '返回生态产品',
  icon: CustomIcon
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full">
        {/* 主卡片 */}
        <div className="bg-white rounded-3xl shadow-lg border border-neutral-100 p-10 md:p-12 text-center">
          {/* 图标区域 */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-purple-50 rounded-full scale-150 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 to-purple-100/50 rounded-full scale-125 animate-pulse"></div>
            
            {/* 主图标 */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7463EC] to-[#5b4cdb] flex items-center justify-center shadow-xl shadow-violet-500/25">
              {CustomIcon ? (
                <CustomIcon className="w-12 h-12 text-white" strokeWidth={1.5} />
              ) : (
                <Construction className="w-12 h-12 text-white" strokeWidth={1.5} />
              )}
            </div>
            
            {/* 装饰小图标 */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={2} />
            </div>
            <div className="absolute -bottom-1 -left-3 w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#7463EC]" strokeWidth={2} />
            </div>
          </div>

          {/* 文字内容 */}
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-3">
            {title}
          </h1>
          <p className="text-neutral-500 mb-2">
            {subtitle}
          </p>
          <p className="text-sm text-neutral-400 mb-8">
            {description}
          </p>

          {/* 进度指示 */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>开发进度</span>
              <span>即将上线</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#7463EC] to-[#5b4cdb] rounded-full"></div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={backLink}
              className="inline-flex items-center justify-center gap-2 bg-[#7463EC] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5b4cdb] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              {backText}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-all duration-300"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-neutral-400 text-sm mt-6">
          如有疑问，请联系大赛工作组获取帮助
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
