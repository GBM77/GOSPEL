import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Father Whisper app:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#2C2724] flex items-center justify-center p-6 font-sans-ui">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E4DBD0] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F3EDE2] text-[#8C6F4B] mx-auto flex items-center justify-center text-xl font-serif-tc font-bold">
              ✝
            </div>
            <h2 className="font-serif-tc text-2xl font-bold text-[#2C2724]">
              天父耳語 · 載入提示
            </h2>
            <p className="text-xs text-[#7A6A55] leading-relaxed">
              頁面載入時發生小狀況，請點擊下方按鈕重新整理即可恢復。
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-xl text-[11px] text-[#8C7A65] font-mono break-all text-left">
              {this.state.error?.message || '未知錯誤'}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('fathers_whispers_custom_pool');
                window.location.reload();
              }}
              className="w-full py-2.5 rounded-xl bg-[#2C2724] text-white text-xs font-semibold hover:bg-[#433B36] transition-colors"
            >
              重新整理並重載
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
