import './Header.css'
import Searchcourse from './Searchcourse'
import axios from 'axios'
const Header = ({ setSearchopen, searchopen }) => {
  const menu = [
    { title: '관심강좌', link: '/events' },
    { title: '장바구니', link: '/events' },
    { title: '수강신청', link: '/events' },
    { title: '수강신청내역', link: '/events' },
  ]
  return (
    <div className="headerbox">
      <div className="headerup">
        <div>
          <a href="/">
            <img src={'/img_logo_main.png'} alt={'logo'} className="logo" />
            <span className="logoname">2022-겨울학기</span>
          </a>
          <div className="searchbar">
            <select>
              <option>Search</option>
            </select>
            <input
              type="text"
              placeholder="전체 강좌 검색은 돋보기 버튼을 클릭하세요"
            />
            <div>
              <img src={'/search.png'} alt={'search'} className="searchicon" />
            </div>
            <div
              className="search_list"
              onClick={() => {
                setSearchopen(searchopen ? false : true)
              }}
            >
              <img
                src={'/search_list.png'}
                alt={'searchlist'}
                className="listicon"
              />
            </div>
          </div>
        </div>
        <div className="accountinfo">
          <div>홍길동</div>
          <div>학번 0000-00000</div>
        </div>
      </div>
      <div className="headerdown">
        <div>
          {menu.map((item) => (
            <div key={item.title}>
              <a href={item.link}>{item.title}</a>
            </div>
          ))}
        </div>
        <div className="mypage">
          <a> 마이페이지</a>
        </div>
      </div>
    </div>
  )
}
export default Header
