import { useState } from "react"
import { Heart, MessageSquare, Share2, Bookmark, UserPlus, TrendingUp, Star, Music2, Users, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const POSTS = [
  {
    id: 1,
    category: "공연 후기",
    categoryVariant: "purple",
    author: "파티피플🎧",
    authorImg: "https://api.dicebear.com/7.x/personas/svg?seed=party",
    time: "2시간 전",
    title: "FISHER @ OCTAGON 후기 (ft. 내 인생 최고의 밤)",
    content: "어제 오타곤에서 FISHER 보고 왔는데... 진짜 평생 잊지 못할 것 같아요. 'Losing It' 드롭할 때 장내 분위기 대폭발 ㅠㅠ 음향 진짜 쩐다. 다들 꼭 가보세요!!",
    likes: 342,
    comments: 56,
    bookmarks: 28,
    tags: ["FISHER", "OCTAGON", "TechHouse"],
    liked: false,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=octagon1",
  },
  {
    id: 2,
    category: "DJ 추천",
    categoryVariant: "cyan",
    author: "테크노홀릭",
    authorImg: "https://api.dicebear.com/7.x/personas/svg?seed=techno",
    time: "5시간 전",
    title: "국내에서 잘 알려지지 않은 테크노 DJ 추천 5인",
    content: "Charlotte de Witte, Amelie Lens는 이제 다들 알죠? 아직 덜 알려진 보석 같은 아티스트들을 소개해드립니다. SPFDJ, Trym, Rebekah... 이분들 꼭 들어보세요.",
    likes: 189,
    comments: 34,
    bookmarks: 91,
    tags: ["테크노", "DJ추천", "언더그라운드"],
    liked: false,
    img: null,
  },
  {
    id: 3,
    category: "클럽 리뷰",
    categoryVariant: "green",
    author: "나이트라이프탐방",
    authorImg: "https://api.dicebear.com/7.x/personas/svg?seed=nightlife",
    time: "1일 전",
    title: "2025 서울 클럽 TOP 5 솔직 후기",
    content: "OCTAGON, Cakeshop, Club Ellui, PCTV, Volume... 올해 상반기 다 다녀봤습니다. 각 클럽의 장단점, 입장 팁, 드레스코드까지 정리했어요.",
    likes: 567,
    comments: 112,
    bookmarks: 203,
    tags: ["클럽리뷰", "서울나이트라이프", "클럽투어"],
    liked: false,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=clubreview",
  },
  {
    id: 4,
    category: "이벤트",
    categoryVariant: "hot",
    author: "BEATZONE팀",
    authorImg: "https://api.dicebear.com/7.x/personas/svg?seed=beatzone",
    time: "2일 전",
    title: "[공식] Charlotte de Witte DJ Q&A 이벤트 모집",
    content: "이번 Paradise City Festival 전날, Charlotte de Witte와 함께하는 특별 DJ Q&A 세션을 개최합니다. 참가 신청 선착순 50명! 지금 바로 신청하세요.",
    likes: 891,
    comments: 234,
    bookmarks: 445,
    tags: ["공식이벤트", "CharlotteDW", "QnA"],
    liked: false,
    img: null,
    official: true,
  },
]

const EVENTS_BOARD = [
  { title: "DJ Q&A – Charlotte de Witte", date: "2025.09.05", slots: "50명 선착순", remaining: 12 },
  { title: "클럽 투어: 서울 언더그라운드 3곳", date: "2025.07.26", slots: "20명 선착순", remaining: 5 },
  { title: "ULTRA 사진 공모전", date: "~2025.08.01", slots: "전원 참여 가능", remaining: null },
]

const POPULAR_USERS = [
  { name: "파티피플🎧", posts: 234, followers: "12.4K", img: "https://api.dicebear.com/7.x/personas/svg?seed=party" },
  { name: "테크노홀릭", posts: 156, followers: "8.9K", img: "https://api.dicebear.com/7.x/personas/svg?seed=techno" },
  { name: "나이트라이프탐방", posts: 89, followers: "21.2K", img: "https://api.dicebear.com/7.x/personas/svg?seed=nightlife" },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(POSTS)
  const [followed, setFollowed] = useState({})
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("전체")

  const TABS = ["전체", "공연 후기", "DJ 추천", "클럽 리뷰", "이벤트"]

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const filtered = posts.filter(p => {
    const matchTab = activeTab === "전체" || p.category === activeTab
    const matchSearch = !search || p.title.includes(search) || p.content.includes(search)
    return matchTab && matchSearch
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/40 via-black to-teal-950/30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="green" className="mb-3">
            <Users className="w-3 h-3 mr-1" />커뮤니티
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            파티 피플과 <span className="gradient-text">함께하다</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            공연 후기, DJ 추천, 클럽 리뷰를 공유하고 글로벌 클러버들과 연결되세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Search + Write */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="게시글 검색..."
                  className="pl-9"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button variant="neon">글쓰기</Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === t
                      ? "bg-green-600 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filtered.map(post => (
                <Card key={post.id} className="hover:border-white/10 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-9 h-9 shrink-0">
                        <AvatarImage src={post.authorImg} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-white">{post.author}</span>
                          {post.official && <Badge variant="purple" className="text-[10px]">공식</Badge>}
                          <Badge variant={post.categoryVariant} className="text-[10px]">{post.category}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-white mb-2 hover:text-purple-400 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    {post.img && (
                      <div className="h-32 rounded-xl overflow-hidden bg-muted mb-3">
                        <img src={post.img} alt="" className="w-full h-full object-cover opacity-60" />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map(t => (
                        <span key={t} className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer">#{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2 border-t border-border">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          post.liked ? "text-pink-400" : "text-muted-foreground hover:text-pink-400"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />{post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-yellow-400 transition-colors">
                        <Bookmark className="w-4 h-4" />{post.bookmarks}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors ml-auto">
                        <Share2 className="w-4 h-4" />공유
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Events */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold text-white text-sm">진행 중 이벤트</h3>
                </div>
                <div className="space-y-3">
                  {EVENTS_BOARD.map((ev, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/50 border border-border hover:border-purple-500/30 transition-colors cursor-pointer">
                      <div className="font-medium text-white text-xs mb-1">{ev.title}</div>
                      <div className="text-[11px] text-muted-foreground">{ev.date}</div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[11px] text-muted-foreground">{ev.slots}</span>
                        {ev.remaining !== null && (
                          <Badge variant="hot" className="text-[10px]">잔여 {ev.remaining}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Users */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <h3 className="font-bold text-white text-sm">인기 유저</h3>
                </div>
                <div className="space-y-3">
                  {POPULAR_USERS.map(user => (
                    <div key={user.name} className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 shrink-0">
                        <AvatarImage src={user.img} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{user.name}</div>
                        <div className="text-xs text-muted-foreground">팔로워 {user.followers}</div>
                      </div>
                      <button
                        onClick={() => setFollowed(p => ({ ...p, [user.name]: !p[user.name] }))}
                        className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                          followed[user.name]
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-muted text-muted-foreground hover:text-white"
                        }`}
                      >
                        {followed[user.name] ? "팔로잉" : "팔로우"}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Music2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-white text-sm">인기 태그</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["#ULTRAKOREA", "#OCTAGON", "#FISHER", "#테크노", "#TechHouse", "#파티후기", "#DJ추천"].map(tag => (
                    <span key={tag} className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
