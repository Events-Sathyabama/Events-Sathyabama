import Header from './header'
import Poster from './poster'
import Tabs from './tabs'
import Venues from './venue'

export default function details() {
  return (
    <div className='flex flex-col w-full h-auto items-center justify-center'>
      <div className='flex flex-col w-11/12 h-auto'>
        <Header></Header>
        <div className='flex flex-col sm:flex-row w-full h-auto mt-2 items-center gap-3 sm:items-start justify-center'>
          <Poster></Poster>
          <div className='flex flex-col w-full justify-center items-center'>
            <Venues></Venues>
            <Tabs></Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
