import { useState } from "react"
import { Calendar, MapPin, Clock, Users, Bookmark, Share2, Play, ChevronRight, Star, Music2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const EVENTS = [
  {
    id: 1,
    title: "ULTRA KOREA 2025",
    subtitle: "Asia's Biggest EDM Festival",
    date: "2025.08.15 – 17",
    time: "14:00 – 03:00",
    venue: "잠실 올림픽 공원",
    city: "서울",
    genre: ["EDM", "House", "Techno"],
    lineup: ["Martin Garrix", "David Guetta", "FISHER", "Peggy Gou", "Charlotte de Witte", "Skrillex"],
    description: "아시아 최대 규모의 EDM 페스티벌 Ultra Korea가 2025년 여름 다시 돌아옵니다. 세계 정상의 아티스트들이 한자리에 모이는 3일간의 초대형 이벤트.",
    ticketPrice: { general: "₩169,000", vip: "₩350,000", premium: "₩750,000" },
    totalSeats: 50000,
    remainingSeats: 8200,
    status: "판매중",
    statusVariant: "green",
    tag: "SOLD OUT SOON",
    tagVariant: "hot",
    gradient: "from-purple-900/80 to-indigo-900/80",
    accentColor: "#a855f7",
    rating: 4.9,
    bookmarks: 42000,
  },
  {
    id: 2,
    title: "PARADISE CITY FESTIVAL",
    subtitle: "Techno Night at Paradise",
    date: "2025.09.06",
    time: "21:00 – 06:00",
    venue: "파라다이스 시티",
    city: "인천",
    genre: ["Techno", "Industrial"],
    lineup: ["Charlotte de Witte", "Amelie Lens", "Trym", "SPFDJ"],
    description: "인천 파라다이스 시티에서 펼쳐지는 세계적 테크노 나이트. 벨기에 다크 테크노 퀸 Charlotte de Witte와 Amelie Lens의 특별한 만남.",
    ticketPrice: { general: "₩99,000", vip: "₩220,000" },
    totalSeats: 8000,
    remainingSeats: 1200,
    status: "VIP 잔여",
    statusVariant: "cyan",
    tag: "LIMITED",
    tagVariant: "cyan",
    gradient: "from-cyan-900/80 to-blue-900/80",
    accentColor: "#06b6d4",
    rating: 4.8,
    bookmarks: 18000,
  },
  {
    id: 3,
    title: "OCTAGON ANNIVERSARY",
    subtitle: "12th Anniversary Special",
    date: "2025.07.19",
    time: "22:00 – 05:00",
    venue: "Club OCTAGON",
    city: "서울",
    genre: ["Tech House", "House"],
    lineup: ["Lee Foss", "Hyunjin", "Cloonee", "Shaded"],
    description: "아시아 최고의 클럽 OCTAGON의 12주년 기념 파티. Lee Foss와 Cloonee의 특별 B2B 세트를 포함한 밤새 이어지는 하우스 뮤직.",
    ticketPrice: { general: "₩50,000", vip: "₩120,000" },
    totalSeats: 2000,
    remainingSeats: 450,
    status: "마감 임박",
    statusVariant: "hot",
    tag: "거의 매진",
    tagVariant: "hot",
    gradient: "from-emerald-900/80 to-teal-900/80",
    accentColor: "#10b981",
    rating: 4.9,
    bookmarks: 12000,
  },
  {
    id: 4,
    title: "FISHER: LOSING IT WORLD TOUR",
    subtitle: "Solo World Tour Seoul",
    date: "2025.09.13",
    time: "23:00 – 05:00",
    venue: "Club OCTAGON",
    city: "서울",
    genre: ["Tech House"],
    lineup: ["FISHER"],
    description: "세계 최고의 테크 하우스 아티스트 FISHER의 단독 월드 투어가 서울에 찾아옵니다. 'Losing It'의 에너지를 직접 느껴보세요.",
    ticketPrice: { general: "₩60,000", vip: "₩150,000" },
    totalSeats: 2000,
    remainingSeats: 2000,
    status: "예매 예정",
    statusVariant: "purple",
    tag: "D-30",
    tagVariant: "purple",
    gradient: "from-orange-900/80 to-yellow-900/80",
    accentColor: "#f97316",
    rating: 4.9,
    bookmarks: 31000,
  },
]

const FILTERS = ["전체", "EDM", "House", "Techno", "Tech House"]

export default function EventPage() {
  const [filter, setFilter] = useState("전체")
  const [selected, setSelected] = useState(EVENTS[0])
  const [bookmarked, setBookmarked] = useState({})

  const filtered = filter === "전체"
    ? EVENTS
    : EVENTS.filter(e => e.genre.some(g => g.toLowerCase().includes(filter.toLowerCase())))

  const soldPct = Math.round(((selected.totalSeats - selected.remainingSeats) / selected.totalSeats) * 100)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/50 via-black to-purple-950/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="pink" className="mb-3">
            <Zap className="w-3 h-3 mr-1" />공연 홍보
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            놓치면 후회할 <span className="gradient-text">공연들</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            전 세계 클럽/페스티벌 라인업, 티켓팅, 관심 공연 저장까지 한 번에.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-900/30"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event List */}
          <div className="lg:col-span-1 space-y-3">
            {filtered.map(ev => (
              <div
                key={ev.id}
                onClick={() => setSelected(ev)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selected?.id === ev.id
                    ? "border-pink-500/60 bg-pink-500/5 shadow-lg shadow-pink-900/10"
                    : "border-border hover:border-border/60 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-white text-sm leading-tight">{ev.title}</h3>
                  <Badge variant={ev.tagVariant} className="text-[10px] shrink-0 ml-2">{ev.tag}</Badge>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{ev.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{ev.venue}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {ev.genre.map(g => <Badge key={g} variant="pink" className="text-[10px]">{g}</Badge>)}
                </div>
              </div>
            ))}
          </div>

          {/* Event Detail */}
          {selected && (
            <div className="lg:col-span-2 space-y-4">
              {/* Header */}
              <Card className="overflow-hidden border-pink-500/20">
                <div className={`relative h-56 bg-gradient-to-br ${selected.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <Music2 className="w-56 h-56" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Video Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm">
                      <Play className="w-7 h-7 text-white ml-1" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <Badge variant={selected.statusVariant} className="mb-2">{selected.status}</Badge>
                      <h2 className="text-2xl font-black text-white">{selected.title}</h2>
                      <p className="text-sm text-gray-300">{selected.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBookmarked(p => ({ ...p, [selected.id]: !p[selected.id] }))}
                        className={`p-2 rounded-lg transition-all ${bookmarked[selected.id] ? "bg-yellow-500/30 text-yellow-400" : "bg-black/30 text-white hover:text-yellow-400"}`}
                      >
                        <Bookmark className={`w-5 h-5 ${bookmarked[selected.id] ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-2 rounded-lg bg-black/30 text-white hover:text-white/80">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "날짜", value: selected.date, icon: Calendar },
                      { label: "시간", value: selected.time, icon: Clock },
                      { label: "장소", value: selected.venue, icon: MapPin },
                      { label: "도시", value: selected.city, icon: Users },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-xl bg-muted/50 text-center">
                        <item.icon className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                        <div className="text-[10px] text-muted-foreground">{item.label}</div>
                        <div className="text-xs font-semibold text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{selected.description}</p>

                  {/* Lineup */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">라인업</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.lineup.map(dj => (
                        <span key={dj} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 text-sm text-purple-300 font-medium">
                          <Music2 className="w-3.5 h-3.5" />{dj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ticket Sales Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-foreground">예매 현황</span>
                      <span className="text-sm text-muted-foreground">
                        잔여 <span className="text-white font-bold">{selected.remainingSeats.toLocaleString()}</span>석 / {selected.totalSeats.toLocaleString()}석
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{soldPct}% 매진</span>
                      <div className="flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{selected.bookmarks.toLocaleString()} 관심</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Types */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">티켓 종류</h4>
                    <div className="grid gap-2">
                      {Object.entries(selected.ticketPrice).map(([type, price]) => (
                        <div key={type} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-pink-500/30 transition-colors">
                          <div>
                            <span className="text-sm font-medium text-white capitalize">
                              {type === "general" ? "일반석" : type === "vip" ? "VIP석" : "프리미엄"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-pink-400">{price}</span>
                            <Button variant="neon" size="sm" asChild>
                              <Link to="/ticketing">예매</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="neon"
                    size="lg"
                    className="w-full"
                    onClick={() => setBookmarked(p => ({ ...p, [selected.id]: !p[selected.id] }))}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked[selected.id] ? "fill-current" : ""}`} />
                    {bookmarked[selected.id] ? "관심 공연 저장됨" : "관심 공연 저장"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
