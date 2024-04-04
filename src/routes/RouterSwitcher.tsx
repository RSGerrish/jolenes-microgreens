import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import { NotFound } from '../components/NotFound';
import { HeroContentLeft } from '../components/HeroContentLeft';
import { GetInTouch } from '../components/GetInTouch';
import { HeroAbout } from '../components/HeroAbout';
import { WTBSection } from '../components/WTBSection';
import { RouteLayout } from './RouteLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
        <Route index element={<HeroContentLeft />} />
        <Route path="about" element={<HeroAbout />} />
        <Route path="get-in-touch" element={<GetInTouch />} />
        <Route path="where-to-buy" element={<WTBSection />} />
        <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export function RouterSwitcher() {
  return (
    <RouterProvider router={router} />
  )
}