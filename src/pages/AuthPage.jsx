import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Zap, Check, Music2, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const GENRES = ["EDM", "House", "Techno", "Tech House", "Bass House", "Hip-hop", "R&B", "Drum & Bass", "Trance", "Ambient"]
const SOCIAL_BUTTONS = [
  { id: "kakao", label: "카카오로 계속하기", bg: "bg-yellow-400 hover:bg-yellow-300", text: "text-gray-900", icon: "🟡" },
  { id: "naver", label: "네이버로 계속하기", bg: "bg-green-500 hover:bg-green-400", text: "text-white", icon: "🟢" },
  { id: "google", label: "Google로 계속하기", bg: "bg-white hover:bg-gray-100", text: "text-gray-800", icon: "🔵" },
  { id: "apple", label: "Apple로 계속하기", bg: "bg-white hover:bg-gray-100", text: "text-gray-900", icon: "⚫" },
]

export default function AuthPage() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get("mode") === "register" ? "register" : "login")
  const [showPw, setShowPw] = useState(false)
  const [step, setStep] = useState(1) // register: step 1 = account, step 2 = profile
  const [selectedGenres, setSelectedGenres] = useState([])
  const [form, setForm] = useState({ email: "", password: "", nickname: "" })

  const toggleGenre = (g) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-lg px-12 text-center">
          <Link to="/" className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-900/50">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black gradient-text">BEATZONE</span>
          </Link>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            세계의 비트를 <br />
            <span className="gradient-text">한 손에</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            전 세계 DJ · 클럽 · 페스티벌 티켓을<br />지금 바로 예매하세요.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "등록 DJ", value: "3,200+" },
              { label: "파트너 클럽", value: "850+" },
              { label: "월간 유저", value: "520K+" },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-2xl glass border border-white/5">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-background relative">
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-purple-950/30 via-black to-pink-950/20" />

        <div className="relative w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black gradient-text">BEATZONE</span>
          </div>

          {/* Toggle */}
          <div className="flex rounded-xl bg-muted p-1 mb-8">
            <button
              onClick={() => { setMode("login"); setStep(1) }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "login" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              로그인
            </button>
            <button
              onClick={() => { setMode("register"); setStep(1) }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "register" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              회원가입
            </button>
          </div>

          {/* Login Form */}
          {mode === "login" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-black text-white mb-1">다시 만나서 반가워요!</h1>
                <p className="text-muted-foreground text-sm">계정에 로그인하세요.</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="이메일 주소"
                    type="email"
                    className="pl-9"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="비밀번호"
                    type={showPw ? "text" : "password"}
                    className="pl-9 pr-9"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPw(s => !s)}
                    type="button"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-right">
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">비밀번호를 잊으셨나요?</a>
                </div>
              </div>

              <Button variant="neon" size="lg" className="w-full">로그인</Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="px-3 bg-background text-xs text-muted-foreground">또는 소셜 로그인</span></div>
              </div>

              <div className="space-y-2">
                {SOCIAL_BUTTONS.map(btn => (
                  <button
                    key={btn.id}
                    className={`w-full flex items-center justify-center gap-3 h-11 rounded-lg text-sm font-medium transition-all ${btn.bg} ${btn.text}`}
                  >
                    <span>{btn.icon}</span>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Register Form */}
          {mode === "register" && (
            <div>
              {/* Step Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      s < step ? "bg-green-600 text-white" :
                      s === step ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                    </div>
                    <span className={`text-xs font-medium ${s === step ? "text-purple-400" : "text-muted-foreground"}`}>
                      {s === 1 ? "계정 정보" : "프로필 설정"}
                    </span>
                    {s < 2 && <div className="w-8 h-0.5 bg-muted mx-1" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-black text-white mb-1">BEATZONE 가입하기</h1>
                    <p className="text-muted-foreground text-sm">계정을 생성하고 나이트라이프를 즐기세요.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="이메일 주소" type="email" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="비밀번호 (8자 이상)"
                        type={showPw ? "text" : "password"}
                        className="pl-9 pr-9"
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPw(s => !s)}
                        type="button"
                      >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Input placeholder="비밀번호 확인" type="password" />
                  </div>

                  <Button variant="neon" size="lg" className="w-full" onClick={() => setStep(2)}>
                    다음 단계 →
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center"><span className="px-3 bg-background text-xs text-muted-foreground">또는 소셜 계정으로 가입</span></div>
                  </div>

                  <div className="space-y-2">
                    {SOCIAL_BUTTONS.map(btn => (
                      <button
                        key={btn.id}
                        className={`w-full flex items-center justify-center gap-3 h-11 rounded-lg text-sm font-medium transition-all ${btn.bg} ${btn.text}`}
                      >
                        <span>{btn.icon}</span>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-white mb-1">프로필 설정</h2>
                    <p className="text-muted-foreground text-sm">맞춤형 추천을 위해 취향을 알려주세요.</p>
                  </div>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="닉네임 (예: 파티피플🎧)" className="pl-9" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Headphones className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-semibold text-white">관심 장르</h3>
                      <span className="text-xs text-muted-foreground">(복수 선택 가능)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {GENRES.map(g => (
                        <button
                          key={g}
                          onClick={() => toggleGenre(g)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedGenres.includes(g)
                              ? "bg-purple-600 text-white shadow-md shadow-purple-900/30"
                              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                          }`}
                        >
                          {selectedGenres.includes(g) && <Check className="w-3 h-3 inline mr-1" />}
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Music2 className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-semibold text-white">선호 클럽</h3>
                      <span className="text-xs text-muted-foreground">(선택)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["OCTAGON", "Cakeshop", "Club Ellui", "PCTV", "Volume"].map(club => (
                        <Badge
                          key={club}
                          variant="cyan"
                          className="cursor-pointer hover:bg-cyan-500/30 transition-colors text-sm px-3 py-1"
                        >
                          {club}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>← 이전</Button>
                    <Button variant="neon" className="flex-2" asChild>
                      <Link to="/">가입 완료!</Link>
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    가입 시 <a href="#" className="text-purple-400 hover:underline">이용약관</a> 및{" "}
                    <a href="#" className="text-purple-400 hover:underline">개인정보처리방침</a>에 동의합니다.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
