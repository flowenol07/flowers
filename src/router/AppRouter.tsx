import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Flowers from "../pages/Flowers";
import FlowerDetails from "../pages/FlowerDetails";


import MessageOfFlowers from "../pages/MessageOfFlowers";
import ArtGallery from "../pages/ArtGallery";
import FloralGems from "../pages/FloralGems";
import FloralJourney from "../pages/FloralJourney";
import FlowerGame from "../pages/FlowerGame";
import Blogs from "../pages/Blogs";


export default function AppRouter() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/flowers" element={<Flowers />} />
<Route path="/flowers/:slug" element={<FlowerDetails />} />


<Route path="/message-of-flowers" element={<MessageOfFlowers />} />
<Route path="/art-gallery" element={<ArtGallery />} />
<Route path="/floral-gems" element={<FloralGems />} />
<Route path="/floral-journey" element={<FloralJourney />} />
<Route path="/flower-game" element={<FlowerGame />} />
<Route path="/blogs" element={<Blogs />} />
</Routes>
</BrowserRouter>
);
}