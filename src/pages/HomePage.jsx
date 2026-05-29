import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Ticket, Play, Star, MapPin, Calendar, TrendingUp,
  ChevronRight, Headphones, Users, Music2, Zap, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const HERO_EVENTS = [
  {
    id: 1,
    title: "ULTRA KOREA 2025",
    subtitle: "Martin Garrix · David Guetta · FISHER",
    date: "2025.08.15 – 17",
    venue: "잠실 올림픽 공원",
    tag: "SOLD OUT SOON",
    tagVariant: "hot",
    gradient: "from-purple-900/80 via-purple-800/60 to-transparent",
    accent: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "PARADISE CITY FESTIVAL",
    subtitle: "Charlotte de Witte · Amelie Lens",
    date: "2025.09.06",
    venue: "파라다이스 시티, 인천",
    tag: "VIP 잔여",
    tagVariant: "cyan",
    gradient: "from-cyan-900/80 via-cyan-800/60 to-transparent",
    accent: "bg-gradient-to-br from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    title: "CLUB OCTAGON ANNIVERSARY",
    subtitle: "Lee Foss · Hyunjin B2B Cloonee",
    date: "2025.07.19",
    venue: "OCTAGON, 서울",
    tag: "신규 공연",
    tagVariant: "green",
    gradient: "from-emerald-900/80 via-emerald-800/60 to-transparent",
    accent: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
]

const TOP_DJS = [
  { name: "DJ Soda", genre: "EDM / Pop", followers: "2.1M", rating: 4.9, img: "https://api.dicebear.com/7.x/personas/svg?seed=soda" },
  { name: "Peggy Gou", genre: "House / Techno", followers: "890K", rating: 4.8, img: "https://api.dicebear.com/7.x/personas/svg?seed=peggy" },
  { name: "FISHER", genre: "Tech House", followers: "1.5M", rating: 4.9, img: "https://api.dicebear.com/7.x/personas/svg?seed=fisher" },
  { name: "Cloonee", genre: "Bass House", followers: "420K", rating: 4.7, img: "https://api.dicebear.com/7.x/personas/svg?seed=cloonee" },
]

const TOP_CLUBS = [
  { name: "OCTAGON", location: "서울, 강남", genre: "House / Techno", rating: 4.9, capacity: "2,000" },
  { name: "Cakeshop", location: "서울, 이태원", genre: "Hip-hop / R&B", rating: 4.7, capacity: "400" },
  { name: "Club Ellui", location: "서울, 강남", genre: "EDM", rating: 4.6, capacity: "1,500" },
  { name: "PCTV", location: "서울, 홍대", genre: "Techno", rating: 4.8, capacity: "600" },
]

const STATS = [
  { label: "등록 DJ", value: "3,200+", icon: Headphones },
  { label: "파트너 클럽", value: "850+", icon: Music2 },
  { label: "월간 이용자", value: "520K+", icon: Users },
  { label: "진출 국가", value: "42", icon: Globe },
]

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0)
  const hero = HERO_EVENTS[activeHero]

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-purple-950/30" />
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${hero.accent} opacity-5 transition-all duration-700`} />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="purple" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  GLOBAL TICKETING PLATFORM
                </Badge>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">FEEL THE</span>
                <br />
                <span className="gradient-text neon-text-purple">BEAT.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                전 세계 최고의 DJ·클럽·페스티벌 티켓을 한 곳에서.
                지금 바로 당신의 다음 파티를 예약하세요.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="neon" size="xl" asChild>
                  <Link to="/ticketing">
                    <Ticket className="w-5 h-5 mr-2" />
                    티켓 구매하기
                  </Link>
                </Button>
                <Button variant="neon_outline" size="xl" asChild>
                  <Link to="/events">
                    <Play className="w-5 h-5 mr-2" />
                    공연 둘러보기
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {STATS.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Event Cards */}
            <div className="relative">
              <div className="space-y-3">
                {HERO_EVENTS.map((e, i) => (
                  <div
                    key={e.id}
                    onClick={() => setActiveHero(i)}
                    className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                      i === activeHero
                        ? "border-purple-500/60 shadow-lg shadow-purple-900/30 scale-[1.02]"
                        : "border-border hover:border-border/80 opacity-70 hover:opacity-90"
                    }`}
                  >
                    <div className={`absolute inset-0 ${i === activeHero ? e.accent : "bg-gradient-to-r from-gray-800 to-gray-900"} opacity-20`} />
                    <div className="relative p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${e.accent} flex items-center justify-center shrink-0`}>
                        <Music2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-sm text-white truncate">{e.title}</h3>
                          <Badge variant={e.tagVariant} className="text-[10px] shrink-0">{e.tag}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{e.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />{e.date}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />{e.venue}
                          </span>
                        </div>
                      </div>
                      <Button variant="neon" size="sm" asChild>
                        <Link to="/ticketing">예매</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured DJs ── */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">인기 DJ</span>
              </div>
              <h2 className="text-3xl font-black text-white">지금 가장 핫한 DJ</h2>
            </div>
            <Button variant="neon_outline" size="sm" asChild>
              <Link to="/dj">전체 보기 <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_DJS.map(dj => (
              <Link key={dj.name} to="/dj">
                <Card className="group hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="relative mb-4">
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                        <img
                          src={dj.img}
                          alt={dj.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="purple" className="text-xs">
                          <Star className="w-3 h-3 mr-0.5 fill-current" />{dj.rating}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{dj.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{dj.genre}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{dj.followers} followers</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Clubs ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Music2 className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">인기 클럽</span>
              </div>
              <h2 className="text-3xl font-black text-white">지금 뜨는 클럽</h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/club">전체 보기 <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_CLUBS.map((club, i) => (
              <Link key={club.name} to="/club">
                <Card className="group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div
                    className="h-32 relative overflow-hidden"
                    style={{
                      background: [
                        "linear-gradient(135deg, #1a0533, #2d1b69)",
                        "linear-gradient(135deg, #0c1a2e, #1e3a5f)",
                        "linear-gradient(135deg, #1a0a2e, #2d1b69)",
                        "linear-gradient(135deg, #0a1628, #1a3050)",
                      ][i % 4],
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Music2 className="w-12 h-12 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute bottom-2 left-3">
                      <Badge variant="cyan" className="text-xs">{club.genre}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{club.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{club.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                        <span className="text-xs text-white">{club.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">수용 {club.capacity}명</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-cyan-900/40" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <Badge variant="purple" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />지금 시작하세요
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            세계 어디서든, 최고의 나이트라이프를<br />
            <span className="gradient-text">BEATZONE</span>에서 경험하세요
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            지금 가입하고 첫 티켓 10% 할인 혜택을 받으세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="xl" asChild>
              <Link to="/auth?mode=register">
                <Ticket className="w-5 h-5 mr-2" />
                무료 회원가입
              </Link>
            </Button>
            <Button variant="neon_outline" size="xl" asChild>
              <Link to="/events">공연 둘러보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
