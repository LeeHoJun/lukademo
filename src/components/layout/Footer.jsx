import { Link } from "react-router-dom"
import { Zap, AtSign, Tv, Share2, Music } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">BEATZONE</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              글로벌 클럽 공연 & 티켓팅 플랫폼.<br />
              최고의 DJ와 클럽을 경험하세요.
            </p>
            <div className="flex gap-3 mt-4">
              {[AtSign, Tv, Share2, Music].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">서비스</h4>
            <ul className="space-y-2">
              {[
                { to: "/dj", label: "DJ 홍보" },
                { to: "/club", label: "클럽 홍보" },
                { to: "/events", label: "공연 정보" },
                { to: "/ticketing", label: "티켓팅" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">커뮤니티</h4>
            <ul className="space-y-2">
              {[
                { to: "/community", label: "공연 후기" },
                { to: "/community", label: "DJ 추천" },
                { to: "/community", label: "클럽 리뷰" },
                { to: "/community", label: "이벤트" },
              ].map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">고객지원</h4>
            <ul className="space-y-2">
              {["자주 묻는 질문", "환불 정책", "이용약관", "개인정보처리방침"].map(t => (
                <li key={t}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 BEATZONE. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            🌍 Available Worldwide · KR · US · JP · EU
          </p>
        </div>
      </div>
    </footer>
  )
}
