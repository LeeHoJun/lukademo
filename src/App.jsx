import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HomePage from "@/pages/HomePage"
import DJPage from "@/pages/DJPage"
import ClubPage from "@/pages/ClubPage"
import EventPage from "@/pages/EventPage"
import TicketingPage from "@/pages/TicketingPage"
import CommunityPage from "@/pages/CommunityPage"
import AuthPage from "@/pages/AuthPage"

const ROUTES_WITH_FOOTER = ["/", "/dj", "/club", "/events", "/ticketing", "/community"]

function Layout({ children, showFooter = true }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/dj" element={<Layout><DJPage /></Layout>} />
        <Route path="/club" element={<Layout><ClubPage /></Layout>} />
        <Route path="/events" element={<Layout><EventPage /></Layout>} />
        <Route path="/ticketing" element={<Layout><TicketingPage /></Layout>} />
        <Route path="/community" element={<Layout><CommunityPage /></Layout>} />
        <Route path="/auth" element={<Layout showFooter={false}><AuthPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
