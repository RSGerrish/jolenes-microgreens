import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { HeroContentLeft } from '../pages/HeroContentLeft';
import { GetInTouch } from '../pages/GetInTouch';
import { HeroAbout } from '../pages/HeroAbout';
import { WTBSection } from '../pages/WTBSection';
import { MailList } from '../pages/MailList';
import { JoinMailList } from '../pages/JoinMailList';
import { AddItem } from '../pages/AddItem';
import { RouteLayout } from './RouteLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
        <Route index element={<HeroContentLeft />} />
        <Route path="about" element={<HeroAbout />} />
        <Route path="get-in-touch" element={<GetInTouch />} />
        <Route path="where-to-buy" element={<WTBSection />} />
        <Route path="mail-list" element={<MailList />} />
        <Route path="join-mail-list" element={<JoinMailList />} />
        <Route path="add-item" element={<AddItem />} />
        <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export function RouterSwitcher() {
  return (
    <RouterProvider router={router} />
  )
}