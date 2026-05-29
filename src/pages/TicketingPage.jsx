import { useState } from "react"
import {
  Ticket, CreditCard, Smartphone, QrCode, ChevronRight, ChevronLeft,
  Check, MapPin, Calendar, Clock, Users, Shield, RefreshCw, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const EVENT = {
  title: "ULTRA KOREA 2025",
  date: "2025.08.15 – 17",
  venue: "잠실 올림픽 공원",
  time: "14:00 – 03:00",
  poster: null,
}

const TICKET_TYPES = [
  { id: "general", label: "일반석", price: 169000, description: "전 구역 자유 입장", available: 4800, color: "border-border hover:border-purple-500/40" },
  { id: "vip", label: "VIP석", price: 350000, description: "VIP 전용 구역 + 음료 2잔 제공", available: 320, color: "border-border hover:border-yellow-500/40" },
  { id: "premium", label: "프리미엄 패키지", price: 750000, description: "전석 자유 + 백스테이지 투어 + 공식 굿즈", available: 50, color: "border-border hover:border-pink-500/40" },
]

const SEATS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  row: String.fromCharCode(65 + Math.floor(i / 10)),
  col: (i % 10) + 1,
  status: [3, 7, 12, 18, 22, 25, 31, 38, 44, 51].includes(i + 1) ? "taken" : "available",
}))

const PAYMENT_METHODS = [
  { id: "card", label: "신용/체크카드", icon: CreditCard },
  { id: "kakaopay", label: "카카오페이", icon: Smartphone },
  { id: "naverpay", label: "네이버페이", icon: Smartphone },
  { id: "toss", label: "토스페이", icon: Smartphone },
]

const STEPS = ["티켓 선택", "좌석 선택", "결제", "예매 완료"]

export default function TicketingPage() {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const selectedTicket = TICKET_TYPES.find(t => t.id === selectedType)
  const total = selectedTicket ? selectedTicket.price * quantity : 0

  const toggleSeat = (id) => {
    if (SEATS.find(s => s.id === id)?.status === "taken") return
    setSelectedSeats(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : prev.length < quantity ? [...prev, id] : prev
    )
  }

  const canNext = () => {
    if (step === 0) return !!selectedType
    if (step === 1) return selectedSeats.length === quantity
    if (step === 2) return !!paymentMethod && agreed
    return false
  }

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-black to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="purple" className="mb-3">
            <Ticket className="w-3 h-3 mr-1" />티켓팅
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            <span className="gradient-text">{EVENT.title}</span>
          </h1>
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { icon: Calendar, text: EVENT.date },
              { icon: MapPin, text: EVENT.venue },
              { icon: Clock, text: EVENT.time },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-purple-400" />{text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i < step ? "bg-green-600 text-white" :
                  i === step ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium text-center ${i === step ? "text-purple-400" : "text-muted-foreground"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${i < step ? "bg-green-600" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 0: Ticket Selection */}
            {step === 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-4">티켓 종류 선택</h2>
                  <div className="space-y-3 mb-6">
                    {TICKET_TYPES.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          selectedType === t.id
                            ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-900/20"
                            : t.color
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedType === t.id ? "border-purple-500 bg-purple-500" : "border-muted-foreground"
                            }`}>
                              {selectedType === t.id && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{t.label}</div>
                              <div className="text-xs text-muted-foreground">{t.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">₩{t.price.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">잔여 {t.available.toLocaleString()}석</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedType && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">수량 선택</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-white hover:bg-muted/80 transition-colors font-bold"
                        >–</button>
                        <span className="text-xl font-bold text-white w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(q => Math.min(4, q + 1))}
                          className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-white hover:bg-muted/80 transition-colors font-bold"
                        >+</button>
                        <span className="text-xs text-muted-foreground ml-2">최대 4매</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 1: Seat Selection */}
            {step === 1 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-2">좌석 선택</h2>
                  <p className="text-sm text-muted-foreground mb-4">{quantity}석을 선택해주세요. (선택: {selectedSeats.length}/{quantity})</p>

                  {/* Stage */}
                  <div className="text-center py-3 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 mb-6">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">STAGE</span>
                  </div>

                  {/* Seat Grid */}
                  <div className="space-y-2 mb-4">
                    {["A", "B", "C", "D", "E", "F"].map(row => (
                      <div key={row} className="flex items-center gap-2">
                        <span className="w-4 text-xs text-muted-foreground text-center">{row}</span>
                        <div className="flex gap-1 flex-wrap">
                          {SEATS.filter(s => s.row === row).map(seat => (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(seat.id)}
                              className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                                seat.status === "taken"
                                  ? "bg-muted/40 text-muted-foreground/30 cursor-not-allowed"
                                  : selectedSeats.includes(seat.id)
                                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                                    : "bg-muted text-muted-foreground hover:bg-purple-900/50 hover:text-purple-300"
                              }`}
                            >
                              {seat.col}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-muted inline-block" />선택 가능</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-600 inline-block" />선택됨</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-muted/40 inline-block" />매진</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-lg font-bold text-white">결제 수단 선택</h2>

                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map(pm => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === pm.id
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-border hover:border-purple-500/30"
                        }`}
                      >
                        <pm.icon className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-medium text-white">{pm.label}</span>
                        {paymentMethod === pm.id && <Check className="w-4 h-4 text-purple-400 ml-auto" />}
                      </div>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">카드 정보</h3>
                      <Input placeholder="카드 번호 (예: 1234 5678 9012 3456)" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="유효기간 (MM/YY)" />
                        <Input placeholder="CVC" />
                      </div>
                    </div>
                  )}

                  {/* Refund Policy */}
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-semibold text-white">환불 정책</h4>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 공연 7일 전: 100% 환불</li>
                      <li>• 공연 3~6일 전: 70% 환불</li>
                      <li>• 공연 1~2일 전: 50% 환불</li>
                      <li>• 공연 당일 및 이후: 환불 불가</li>
                    </ul>
                  </div>

                  <div
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setAgreed(a => !a)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      agreed ? "border-purple-500 bg-purple-500" : "border-muted-foreground"
                    }`}>
                      {agreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      이용약관, 개인정보 처리방침 및 환불 정책에 동의합니다.
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Complete */}
            {step === 3 && (
              <Card className="border-green-500/30">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2">예매 완료!</h2>
                  <p className="text-muted-foreground mb-6">예매 정보가 이메일로 발송되었습니다.</p>

                  <div className="p-6 rounded-2xl bg-muted/50 border border-border mb-6 text-left">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <QrCode className="w-16 h-16 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-white text-center mb-4">QR 티켓</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">공연</span><span className="text-white font-medium">{EVENT.title}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">일시</span><span className="text-white">{EVENT.date}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">장소</span><span className="text-white">{EVENT.venue}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">티켓</span><span className="text-white">{TICKET_TYPES.find(t => t.id === selectedType)?.label} × {quantity}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">좌석</span><span className="text-white">{selectedSeats.map(id => { const s = SEATS.find(s => s.id === id); return `${s.row}${s.col}` }).join(", ")}</span></div>
                      <div className="flex justify-between border-t border-border pt-2 mt-2">
                        <span className="font-semibold text-white">합계</span>
                        <span className="font-bold text-purple-400">₩{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="neon_outline" className="flex-1" onClick={() => setShowHistory(true)}>
                      예매 내역 확인
                    </Button>
                    <Button variant="neon" className="flex-1" onClick={() => { setStep(0); setSelectedType(null); setSelectedSeats([]); setPaymentMethod(null); setAgreed(false); }}>
                      다른 공연 예매
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div className="flex justify-between mt-4">
                <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
                  <ChevronLeft className="w-4 h-4 mr-1" />이전
                </Button>
                <Button variant="neon" onClick={handleNext} disabled={!canNext()}>
                  {step === 2 ? "결제하기" : "다음"}<ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <h3 className="font-bold text-white mb-4">예매 요약</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <div className="font-semibold text-white text-sm">{EVENT.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{EVENT.date} · {EVENT.venue}</div>
                  </div>
                  {selectedTicket && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selectedTicket.label} × {quantity}</span>
                      <span className="text-white">₩{(selectedTicket.price * quantity).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedSeats.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      좌석: {selectedSeats.map(id => { const s = SEATS.find(s => s.id === id); return `${s.row}${s.col}` }).join(", ")}
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-bold">
                    <span className="text-white">합계</span>
                    <span className="text-purple-400 text-lg">₩{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-300">안전한 결제 시스템으로 보호됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
