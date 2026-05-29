import { useState } from "react"
import { MapPin, Star, Clock, Users, Ticket, ChevronRight, Music2, Phone, Globe, Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const CLUBS = [
  {
    id: 1,
    name: "OCTAGON",
    tagline: "아시아 최대 테크 하우스 클럽",
    location: "서울 강남구 논현동",
    city: "서울",
    genre: ["House", "Techno", "Tech House"],
    vibe: "다이나믹 · 하이에너지",
    capacity: 2000,
    rating: 4.9,
    reviews: 3420,
    openHours: "Fri-Sat 22:00 – 05:00",
    dressCode: "스마트 캐주얼",
    minAge: 19,
    resident_djs: ["Lee Foss", "Hyunjin", "Cloonee"],
    upcoming: [
      { title: "OCTAGON ANNIVERSARY", date: "2025.07.19", lineup: "Lee Foss · Cloonee", price: "₩50,000~" },
      { title: "FRIDAY MADNESS", date: "2025.07.25", lineup: "Hyunjin B2B", price: "₩30,000~" },
    ],
    reviews_list: [
      { user: "파티피플", rating: 5, comment: "음향이 정말 미쳤습니다. 서울에서 이 정도 레벨의 클럽은 오타곤뿐!", date: "2025.06.15" },
      { user: "DJ팬", rating: 5, comment: "FISHER 공연 다녀왔는데 평생 잊지 못할 것 같아요.", date: "2025.06.02" },
    ],
    gradient: "from-purple-900 to-indigo-900",
    accentColor: "purple",
  },
  {
    id: 2,
    name: "Cakeshop",
    tagline: "이태원 힙합/R&B 성지",
    location: "서울 용산구 이태원동",
    city: "서울",
    genre: ["Hip-hop", "R&B", "Soul"],
    vibe: "언더그라운드 · 힙한",
    capacity: 400,
    rating: 4.7,
    reviews: 1890,
    openHours: "Fri-Sat 22:00 – 06:00",
    dressCode: "캐주얼",
    minAge: 20,
    resident_djs: ["DJ Nuwisha", "Dee Kwon"],
    upcoming: [
      { title: "WEEKEND VIBES", date: "2025.07.12", lineup: "Cloonee · Guest", price: "₩20,000~" },
    ],
    reviews_list: [
      { user: "힙합러버", rating: 5, comment: "이태원 힙합 씬의 심장! 분위기 최고예요.", date: "2025.06.20" },
      { user: "언더그라운드팬", rating: 4, comment: "좁지만 에너지는 어마어마해요.", date: "2025.06.10" },
    ],
    gradient: "from-orange-900 to-red-900",
    accentColor: "hot",
  },
  {
    id: 3,
    name: "Club Ellui",
    tagline: "강남 EDM의 중심",
    location: "서울 강남구 역삼동",
    city: "서울",
    genre: ["EDM", "Pop"],
    vibe: "화려함 · 오픈마인드",
    capacity: 1500,
    rating: 4.6,
    reviews: 2230,
    openHours: "Thu-Sat 21:00 – 05:00",
    dressCode: "세미 포멀",
    minAge: 19,
    resident_djs: ["DJ Soda", "DJ Swan"],
    upcoming: [
      { title: "ELLUI SUMMER BLAST", date: "2025.08.09", lineup: "DJ Soda", price: "₩40,000~" },
    ],
    reviews_list: [
      { user: "EDM매니아", rating: 5, comment: "DJ Soda 공연 최고! 무대 퍼포먼스가 남달라요.", date: "2025.06.25" },
      { user: "강남클러버", rating: 4, comment: "음향 시스템이 업그레이드됐네요. 좋아졌어요.", date: "2025.06.18" },
    ],
    gradient: "from-pink-900 to-purple-900",
    accentColor: "pink",
  },
  {
    id: 4,
    name: "PCTV",
    tagline: "홍대 테크노 언더그라운드",
    location: "서울 마포구 서교동",
    city: "서울",
    genre: ["Techno", "Industrial"],
    vibe: "다크 · 실험적",
    capacity: 600,
    rating: 4.8,
    reviews: 1340,
    openHours: "Fri-Sat 23:00 – 07:00",
    dressCode: "올블랙",
    minAge: 20,
    resident_djs: ["Pessimist", "Trym"],
    upcoming: [
      { title: "PCTV PRESENTS: DARK ROOM", date: "2025.07.26", lineup: "Charlotte de Witte", price: "₩35,000~" },
    ],
    reviews_list: [
      { user: "테크노홀릭", rating: 5, comment: "베를린 온 것 같은 느낌. 사운드 시스템 완벽.", date: "2025.06.28" },
      { user: "다크레이버", rating: 5, comment: "Charlotte de Witte 공연 정말 환상적이었습니다.", date: "2025.06.15" },
    ],
    gradient: "from-gray-900 to-black",
    accentColor: "secondary",
  },
]

const CITIES = ["전체", "서울", "부산", "인천", "제주"]

export default function ClubPage() {
  const [selectedCity, setSelectedCity] = useState("전체")
  const [selectedClub, setSelectedClub] = useState(CLUBS[0])
  const [liked, setLiked] = useState({})

  const filtered = selectedCity === "전체" ? CLUBS : CLUBS.filter(c => c.city === selectedCity)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-black to-blue-950/30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="cyan" className="mb-3">
            <Music2 className="w-3 h-3 mr-1" />CLUB 홍보
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            최고의 클럽을 <span className="gradient-text">찾다</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            공연 일정, 리뷰, 실시간 티켓까지. 당신의 파티를 완성할 클럽을 지금 바로 찾아보세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* City Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCity === c
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/30"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Club List */}
          <div className="lg:col-span-1 space-y-3">
            {filtered.map(club => (
              <div
                key={club.id}
                onClick={() => setSelectedClub(club)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedClub?.id === club.id
                    ? "border-cyan-500/60 bg-cyan-500/5 shadow-lg shadow-cyan-900/10"
                    : "border-border hover:border-border/60 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{club.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{club.tagline}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    <span className="text-xs text-white">{club.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">{club.location}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {club.genre.slice(0, 2).map(g => (
                    <Badge key={g} variant="cyan" className="text-[10px]">{g}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Club Detail */}
          {selectedClub && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-cyan-500/20">
                {/* Club Header */}
                <div className={`relative h-52 bg-gradient-to-br ${selectedClub.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                    <Music2 className="w-48 h-48 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <h2 className="text-3xl font-black text-white">{selectedClub.name}</h2>
                      <p className="text-sm text-gray-300 mt-1">{selectedClub.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLiked(p => ({ ...p, [selectedClub.id]: !p[selectedClub.id] }))}
                        className={`p-2 rounded-lg transition-all ${liked[selectedClub.id] ? "bg-pink-500/30 text-pink-400" : "bg-black/30 text-white hover:text-pink-400"}`}
                      >
                        <Heart className={`w-5 h-5 ${liked[selectedClub.id] ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Tabs defaultValue="info">
                    <TabsList className="mb-4">
                      <TabsTrigger value="info">클럽 정보</TabsTrigger>
                      <TabsTrigger value="schedule">공연 일정</TabsTrigger>
                      <TabsTrigger value="reviews">리뷰</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                          { label: "위치", value: selectedClub.location, icon: MapPin },
                          { label: "수용 인원", value: `${selectedClub.capacity.toLocaleString()}명`, icon: Users },
                          { label: "운영 시간", value: selectedClub.openHours, icon: Clock },
                          { label: "입장 연령", value: `${selectedClub.minAge}세 이상`, icon: Globe },
                        ].map(item => (
                          <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                            <item.icon className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs text-muted-foreground">{item.label}</div>
                              <div className="text-sm font-medium text-white">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">장르</h4>
                        <div className="flex gap-2 flex-wrap">
                          {selectedClub.genre.map(g => <Badge key={g} variant="cyan">{g}</Badge>)}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">레지던트 DJ</h4>
                        <div className="flex gap-2 flex-wrap">
                          {selectedClub.resident_djs.map(dj => (
                            <span key={dj} className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors cursor-pointer">{dj}</span>
                          ))}
                        </div>
                      </div>

                      <Button variant="neon" className="w-full" size="lg">
                        <Ticket className="w-4 h-4 mr-2" />티켓 바로 구매
                      </Button>
                    </TabsContent>

                    <TabsContent value="schedule">
                      <div className="space-y-3">
                        {selectedClub.upcoming.map((show, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-cyan-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                              <Music2 className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-sm">{show.title}</div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-xs text-muted-foreground">{show.date}</span>
                                <span className="text-xs text-muted-foreground">{show.lineup}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs text-cyan-400 font-semibold">{show.price}</div>
                              <Button variant="cyan" size="sm" className="mt-1">예매</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-muted/50">
                        <div className="text-center">
                          <div className="text-4xl font-black text-white">{selectedClub.rating}</div>
                          <div className="flex gap-0.5 justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedClub.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} />
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{selectedClub.reviews.toLocaleString()}개 리뷰</div>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map(n => (
                            <div key={n} className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground w-3">{n}</span>
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${n === 5 ? 70 : n === 4 ? 20 : n === 3 ? 7 : n === 2 ? 2 : 1}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {selectedClub.reviews_list.map((r, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                  <span className="text-xs font-bold text-white">{r.user[0]}</span>
                                </div>
                                <span className="text-sm font-medium text-white">{r.user}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star key={j} className={`w-3 h-3 ${j < r.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{r.comment}</p>
                            <p className="text-xs text-muted-foreground/60 mt-2">{r.date}</p>
                          </div>
                        ))}
                      </div>

                      <Button variant="neon_outline" className="w-full mt-4" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />리뷰 작성하기
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

