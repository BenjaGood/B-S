import { useState } from 'react'
import InvitePosterHero from './components/InvitePosterHero/InvitePosterHero.jsx'
import TearIntro from './components/TearIntro/TearIntro.jsx'
import LetterSection from './components/LetterSection/LetterSection.jsx'
import ItineraryPage from './components/ItineraryPage/ItineraryPage.jsx'
import LocationsPage from './components/LocationsPage/LocationsPage.jsx'
import GiftPage from './components/GiftPage/GiftPage.jsx'
import RsvpPage from './components/RsvpPage/RsvpPage.jsx'
import KidsMessage from './components/KidsMessage/KidsMessage.jsx'
import DressPage from './components/DressPage/DressPage.jsx'
import HotelPage from './components/HotelPage/HotelPage.jsx'
import CreditsPage from './components/CreditsPage/CreditsPage.jsx'
import FinalPage from './components/FinalPage/FinalPage.jsx'
import PhotosPage from './components/PhotosPage/PhotosPage.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  const slides = ['/SB02.jpg', '/SB05.jpg']

  return (
    <>
      {!introDone && <TearIntro onDone={() => setIntroDone(true)} />}
      <InvitePosterHero slides={slides} intervalMs={3000} />
      <LetterSection />
      <LocationsPage />
      <HotelPage />
      <DressPage />
      <ItineraryPage />
      <GiftPage />
      <KidsMessage />
      <RsvpPage />
      <FinalPage />
      <PhotosPage />
      <CreditsPage />
    </>
  )
}