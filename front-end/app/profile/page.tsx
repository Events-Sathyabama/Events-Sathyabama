import Footer from '../footer'
import Navbar from '../navbar'
import Profile from './profile'
export default function ProfilePage(): JSX.Element {
  return (
    <div>
      <Navbar></Navbar>
      <Profile></Profile>
      <Footer></Footer>
    </div>
  )
}
