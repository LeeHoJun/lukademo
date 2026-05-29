import { useState } from "react"
import { Heart, Star, Share2, AtSign, Tv, Music, MapPin, Calendar, Users, Play, ChevronRight, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const DJS = [
  {
    id: 1,
    name: "DJ Soda",
    realName: "황소희",
    genre: ["EDM", "Electro Pop"],
    bio: "대한민국 대표 DJ. 아시아를 대표하는 EDM 아티스트로 세계 무대에서 활약 중입니다. Ultra, Tomorrowland 등 세계 최대 페스티벌에 출연했습니다.",
    followers: "2.1M",
    plays: "45M",
    rating: 4.9,
    likes: 128000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=soda&backgroundColor=1a0533",
    upcomingShows: [
      { venue: "OCTAGON", date: "2025.07.19", city: "서울" },
      { venue: "Club M2", date: "2025.08.02", city: "홍콩" },
    ],
    sns: { instagram: "djsoda_official", soundcloud: "djsoda", youtube: "djsoda" },
    nationality: "🇰🇷 한국",
  },
  {
    id: 2,
    name: "Peggy Gou",
    realName: "구지현",
    genre: ["House", "Techno"],
    bio: "베를린 기반의 한국계 DJ/프로듀서. Fabric, Berghain 등 세계적인 클럽에서 레지던트로 활동하며 독자적인 하우스/테크노 사운드를 선보입니다.",
    followers: "890K",
    plays: "22M",
    rating: 4.8,
    likes: 74000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=peggy&backgroundColor=0c1a2e",
    upcomingShows: [
      { venue: "Berghain", date: "2025.07.26", city: "베를린" },
      { venue: "Fabric", date: "2025.08.16", city: "런던" },
    ],
    sns: { instagram: "peggygou", soundcloud: "peggygou" },
    nationality: "🇩🇪 독일/한국",
  },
  {
    id: 3,
    name: "FISHER",
    realName: "Paul Fisher",
    genre: ["Tech House"],
    bio: "호주 출신의 테크 하우스 아이콘. 'Losing It'으로 세계적인 명성을 얻었으며, 그의 DJ 세트는 에너지 넘치는 퍼포먼스로 유명합니다.",
    followers: "1.5M",
    plays: "38M",
    rating: 4.9,
    likes: 196000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=fisher&backgroundColor=1a0a2e",
    upcomingShows: [
      { venue: "Marquee NYC", date: "2025.07.05", city: "뉴욕" },
      { venue: "OCTAGON", date: "2025.09.13", city: "서울" },
    ],
    sns: { instagram: "fisher", soundcloud: "fisher" },
    nationality: "🇦🇺 호주",
  },
  {
    id: 4,
    name: "Cloonee",
    realName: "Conor Lee",
    genre: ["Bass House", "Tech House"],
    bio: "아일랜드 출신의 베이스 하우스 신예. FISHER와의 콜라보레이션으로 주목받으며 전 세계 클럽 씬에서 빠르게 성장 중입니다.",
    followers: "420K",
    plays: "12M",
    rating: 4.7,
    likes: 42000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=cloonee&backgroundColor=0a1628",
    upcomingShows: [
      { venue: "Cakeshop", date: "2025.07.12", city: "서울" },
    ],
    sns: { instagram: "cloonee" },
    nationality: "🇮🇪 아일랜드",
  },
  {
    id: 5,
    name: "Charlotte de Witte",
    realName: "Charlotte de Witte",
    genre: ["Techno"],
    bio: "벨기에 출신의 다크 테크노 여왕. 강렬한 사운드와 독특한 스테이지로 세계 테크노 씬을 이끌고 있습니다.",
    followers: "1.2M",
    plays: "29M",
    rating: 4.9,
    likes: 155000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=charlotte&backgroundColor=120a22",
    upcomingShows: [
      { venue: "Paradise City", date: "2025.09.06", city: "인천" },
    ],
    sns: { instagram: "charlottedewitte" },
    nationality: "🇧🇪 벨기에",
  },
  {
    id: 6,
    name: "Lee Foss",
    realName: "Lee Foss",
    genre: ["House", "Deep House"],
    bio: "시카고 출신의 딥 하우스 전설. Hot Natured 멤버로 활동하며 감성적이고 그루비한 사운드로 전 세계 팬들을 사로잡고 있습니다.",
    followers: "320K",
    plays: "8M",
    rating: 4.6,
    likes: 28000,
    img: "https://api.dicebear.com/7.x/personas/svg?seed=leefoss&backgroundColor=0d1a10",
    upcomingShows: [
      { venue: "Club Octagon", date: "2025.07.19", city: "서울" },
    ],
    sns: { instagram: "leefoss", soundcloud: "lee-foss" },
    nationality: "🇺🇸 미국",
  },
]

const GENRES = ["전체", "EDM", "House", "Techno", "Tech House", "Bass House"]

export default function DJPage() {
  const [selectedGenre, setSelectedGenre] = useState("전체")
  const [liked, setLiked] = useState({})
  const [selectedDJ, setSelectedDJ] = useState(DJS[0])

  const filtered = selectedGenre === "전체"
    ? DJS
    : DJS.filter(dj => dj.genre.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase())))

  const toggleLike = (id, e) => {
    e.stopPropagation()
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black to-pink-950/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="purple" className="mb-3">
            <Music className="w-3 h-3 mr-1" />DJ 홍보
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            세계의 DJ를 <span className="gradient-text">만나다</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            글로벌 DJ 프로필, 공연 일정, SNS 연동까지. 당신이 좋아하는 DJ를 팔로우하세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedGenre === g
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* DJ List */}
          <div className="lg:col-span-1 space-y-3">
            {filtered.map(dj => (
              <div
                key={dj.id}
                onClick={() => setSelectedDJ(dj)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedDJ?.id === dj.id
                    ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-900/20"
                    : "border-border hover:border-border/60 hover:bg-white/5"
                }`}
              >
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={dj.img} />
                  <AvatarFallback>{dj.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white truncate">{dj.name}</span>
                    <span className="text-xs">{dj.nationality.split(" ")[0]}</span>
                  </div>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {dj.genre.map(g => (
                      <Badge key={g} variant="purple" className="text-[10px] px-1.5 py-0">{g}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  <span className="text-xs text-white">{dj.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DJ Detail */}
          {selectedDJ && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-purple-500/20">
                {/* Profile Header */}
                <div className="relative h-48 bg-gradient-to-br from-purple-900/60 to-pink-900/40 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Music className="w-48 h-48 text-purple-400" />
                  </div>
                  <div className="absolute bottom-4 left-6 flex items-end gap-4">
                    <Avatar className="w-20 h-20 border-2 border-purple-500 shadow-xl">
                      <AvatarImage src={selectedDJ.img} />
                      <AvatarFallback>{selectedDJ.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-black text-white">{selectedDJ.name}</h2>
                      <p className="text-sm text-purple-300">{selectedDJ.realName} · {selectedDJ.nationality}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => toggleLike(selectedDJ.id, e)}
                      className={`p-2 rounded-lg transition-all ${liked[selectedDJ.id] ? "bg-pink-500/30 text-pink-400" : "bg-black/30 text-muted-foreground hover:text-pink-400"}`}
                    >
                      <Heart className={`w-5 h-5 ${liked[selectedDJ.id] ? "fill-current" : ""}`} />
                    </button>
                    <button className="p-2 rounded-lg bg-black/30 text-muted-foreground hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Tabs defaultValue="profile">
                    <TabsList className="mb-4">
                      <TabsTrigger value="profile">프로필</TabsTrigger>
                      <TabsTrigger value="schedule">공연 일정</TabsTrigger>
                      <TabsTrigger value="sns">SNS 연동</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: "팔로워", value: selectedDJ.followers, icon: Users },
                          { label: "총 재생", value: selectedDJ.plays, icon: Play },
                          { label: "좋아요", value: (liked[selectedDJ.id] ? selectedDJ.likes + 1 : selectedDJ.likes).toLocaleString(), icon: Heart },
                        ].map(s => (
                          <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
                            <s.icon className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">{s.value}</div>
                            <div className="text-xs text-muted-foreground">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">장르</h4>
                        <div className="flex gap-2 flex-wrap">
                          {selectedDJ.genre.map(g => (
                            <Badge key={g} variant="purple">{g}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">소개</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedDJ.bio}</p>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          variant={liked[selectedDJ.id] ? "secondary" : "neon"}
                          className="flex-1"
                          onClick={(e) => toggleLike(selectedDJ.id, e)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${liked[selectedDJ.id] ? "fill-current text-pink-400" : ""}`} />
                          {liked[selectedDJ.id] ? "팔로잉" : "팔로우"}
                        </Button>
                        <Button variant="neon_outline" className="flex-1" asChild>
                          <a href="#"><Ticket className="w-4 h-4 mr-2" />공연 예매</a>
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="schedule">
                      <div className="space-y-3">
                        {selectedDJ.upcomingShows.length === 0 ? (
                          <p className="text-muted-foreground text-sm">예정된 공연이 없습니다.</p>
                        ) : selectedDJ.upcomingShows.map((show, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-purple-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                              <Calendar className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-sm">{show.venue}</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-muted-foreground">{show.date}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3" />{show.city}
                                </span>
                              </div>
                            </div>
                            <Button variant="neon" size="sm">예매 <ChevronRight className="w-3 h-3 ml-1" /></Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="sns">
                      <div className="space-y-3">
                        {selectedDJ.sns.instagram && (
                          <a href={`https://instagram.com/${selectedDJ.sns.instagram}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center">
                              <AtSign className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white group-hover:text-pink-400 transition-colors text-sm">Instagram</div>
                              <div className="text-xs text-muted-foreground">@{selectedDJ.sns.instagram}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-pink-400 transition-colors" />
                          </a>
                        )}
                        {selectedDJ.sns.soundcloud && (
                          <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                              <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">SoundCloud</div>
                              <div className="text-xs text-muted-foreground">{selectedDJ.sns.soundcloud}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 transition-colors" />
                          </a>
                        )}
                        {selectedDJ.sns.youtube && (
                          <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-red-500/30 hover:bg-red-500/5 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                              <Tv className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white group-hover:text-red-400 transition-colors text-sm">YouTube</div>
                              <div className="text-xs text-muted-foreground">{selectedDJ.sns.youtube}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-red-400 transition-colors" />
                          </a>
                        )}
                      </div>
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

