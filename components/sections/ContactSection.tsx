
'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '웹사이트 개발',
    message: '',
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // EmailJS 설정
      const serviceID = 'nyangcode';
      const templateID = 'template_2bdzets';
      const publicKey = 'dstA9m6aqdQklElaY';

      // 템플릿에 전달할 데이터
      const templateParams = {
        name: form.name.trim(),
        email: form.email.trim(),
        service: form.service,
        message: form.message.trim(),
      };

      console.log('EmailJS 전송 시작');
      console.log('Service ID:', serviceID);
      console.log('Template ID:', templateID);

      // 이메일 전송
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        {
          publicKey,
        }
      );

      console.log('이메일 전송 성공:', response);

      setSubmitted(true);

      setForm({
        name: '',
        email: '',
        service: '웹사이트 개발',
        message: '',
      });

    } catch (error: unknown) {
      console.error('이메일 전송 실패:', error);

      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      let errorStatus = '';

      if (
        typeof error === 'object' &&
        error !== null
      ) {
        const emailError = error as {
          status?: number;
          text?: string;
        };

        errorStatus = String(emailError.status ?? '');
        errorMessage =
          emailError.text ??
          (error instanceof Error
            ? error.message
            : errorMessage);
      }

      alert(
        `이메일 전송 실패\n\n상태 코드: ${
          errorStatus || '확인 불가'
        }\n오류 내용: ${errorMessage}`
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-screen h-screen text-white flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 18, 0.85), rgba(13, 13, 18, 0.95)), url('/images/contact.png')`,
      }}
    >
      {/* 배경 타이포그래피 */}
      <h1 className="absolute text-[20vw] lg:text-[14vw] font-black tracking-tighter text-zinc-800/20 leading-none z-0 select-none pointer-events-none">
        contact
      </h1>

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        {/* 상단 타이틀 */}
        <span className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase block mb-2">
          LET'S WORK TOGETHER
        </span>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
          비전을 함께 만들어볼까요?
        </h2>

        <p className="text-sm md:text-base text-zinc-300 font-light mb-8">
          냥코드가 든든한 파트너가 되어드릴게요.
        </p>

        {/* 문의 폼 */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl text-left space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 이름 */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  YOUR NAME
                </label>

                <input
                  type="text"
                  required
                  placeholder="이름 또는 기업명을 입력해주세요"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  EMAIL
                </label>

                <input
                  type="email"
                  required
                  placeholder="답변 받을 이메일을 입력해주세요"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* 문의 유형 */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                INQUIRY TYPE
              </label>

              <select
                value={form.service}
                onChange={(e) =>
                  setForm({
                    ...form,
                    service: e.target.value,
                  })
                }
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="웹사이트 개발">
                  웹사이트 개발
                </option>
                <option value="앱 개발">
                  앱 개발
                </option>
                <option value="업무 자동화">
                  업무 자동화
                </option>
                <option value="유지보수">
                  유지보수
                </option>
                <option value="부분의뢰">
                  부분의뢰
                </option>
                <option value="기타">
                  기타
                </option>                
              </select>
            </div>

            {/* 프로젝트 내용 */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                PROJECT MESSAGE
              </label>

              <textarea
                required
                rows={4}
                placeholder="어떤 프로젝트를 구상하고 계신가요? 편하게 적어주세요."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />

              {loading
                ? '전송 중...'
                : '프로젝트 의뢰하기'}
            </button>
          </form>
        ) : (
          /* 전송 완료 */
          <div className="bg-zinc-900/80 border border-amber-500/40 rounded-2xl p-12 backdrop-blur-md text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />

            <h3 className="text-2xl font-bold text-white">
              문의가 정상적으로 접수되었습니다!
            </h3>

            <p className="text-sm text-zinc-300">
              보내주신 내용은 빠르게 검토 후 입력해주신 이메일로 회신해 드릴게요.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-full border border-zinc-700 text-xs text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
            >
              다시 작성하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
