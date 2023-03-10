// import Card from "../Components/Card"
// import products from "../Data"
// import Swiper from "../Components/JjimSwiper"
import GoodsListSwiper from "../Components/GoodsListSwiper"
import GoodsList from "../Components/GoodsList"
import axios from "axios"
import { useEffect, useState } from "react"

// import GoodsListCard from "../Components/GoodsListCard"
import { useSelector, useDispatch } from 'react-redux'
import { addUserInfo, addToken, addInfo } from '../redux/store'
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { getCookie } from "../Hooks/Cookies"
=======
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"

>>>>>>> 013b610 (Fix error)
// axios

function Main() {
  const location = useLocation();
  // 이 부분부터 유저 정보 axios 입니다. redux 사용시 대체할 수 있습니다
  const URL = `https://i8d206.p.ssafy.io/api/user`

  const [ lifestyles, setLifestyles ] = useState('')
  const [ addrs, setAddrs ] = useState('')
  const dispatch = useDispatch()

  const cookieValue =  Cookies.get('Authentication');
  dispatch(addToken(cookieValue))

  const getUserInfo = (() => {
    return(
      axios({
        method: "get",
        url: URL,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log("실패")
      })
    )
  })
  
  useEffect(() => {
    getUserInfo()
  },[])

  // if (cookieValue) {
  //   dispatch(addInfo(jwt_decode(cookieValue)))
  // }

  let reduxData = useSelector((state) => {return state})
  // console.log(reduxData.token)

<<<<<<< HEAD
=======
  // useEffect(() => {
  //   dispatch(addInfo(jwt_decode(reduxData.token)))
  // }, [reduxData])

  // if (reduxData.token) {
  //   useEffect(() => {
  //     dispatch(addInfo(jwt_decode(reduxData.token)))
  //   }, [reduxData])
  // }
  
  if (reduxData.token) {
      dispatch(addInfo(jwt_decode(reduxData.token)))
  }

>>>>>>> 71c5997 (profile)

  console.log('리덕스')
  console.log(reduxData.userInfo)
  
  // 이 부분까지 유저 정보 axios 입니다. redux 사용시 대체할 수 있습니다

  return (
    <div>
      <div className='container'>
        <div>
          {/* <div>
            <p>여기서</p>
              <GoodsList />
            <p>액시오스</p>
          </div> */}
          {/* <hr /> */}
          <br />
          <div>
            <br />
            <div className="ListTitle">
              {
                reduxData.token ?
                <p>{addrs.split(' ')[2]}의 <b>HOT</b>한 {lifestyles}라이프 상품</p>
                // <h1 >{addrs.split(' ')[2]}의 <img className="ListTitleLetterPic" src="letter_HOT.png" alt="HOT" /> 한 <img className="ListTitleLetterPic" src={"letter_"+`${lifestyles}`+".png"} alt="lifestyles" /> 상품</h1>
                :
                <p>라스트마켓에서 <b>HOT</b>한 상품</p>
                // <h1 >라스트마켓에서 <img className="ListTitleLetterPic" src="letter_HOT.png" alt="HOT" /> 한 상품</h1>
              }
            </div>
            <br />
            <div>
              <GoodsListSwiper lifestyles={'lifestyle='+lifestyles} addrs={'&location='+addrs} sort="&sort=favoriteCnt,DESC&sort=lastModifiedDateTime,DESC" dealState="&dealState=DEFAULT&dealState=ONBROADCAST&dealState=AFTERBROADCAST" />
            </div>
          </div>
          <br />
          <br />
          <div>
            <div className="ListTitle">
              {
                reduxData.token ?
                <p>{addrs.split(' ')[2]}에서 {lifestyles}라이프 <b>LIVE</b> 중</p>
                // <h1>{addrs.split(' ')[2]}에서 <img className="ListTitleLetterPic" src={"letter_"+`${lifestyles}`+".png"} alt="lifestyles" /> <img className="ListTitleLetterPic" src="letter_LIVE.png" alt="LIVE" />  중</h1>
                :
                <p>라스트마켓에서 <b>LIVE</b> 중</p>
                // <h1>라스트마켓에서 <img className="ListTitleLetterPic" src="letter_LIVE.png" alt="LIVE" />  중</h1>
              }
            </div>
            <br />
            <div>
              <GoodsListSwiper lifestyles={'lifestyle='+lifestyles} addrs={'&location='+addrs} sort="&sort=favoriteCnt,DESC&sort=lastModifiedDateTime,DESC" dealState="&dealState=DEFAULT&dealState=ONBROADCAST" />
            </div>
          </div>
          <hr />
          <br />
        </div>
        <div>
          <div className="ListTitle">
            {
              reduxData.token ?
              <p>{addrs.split(' ')[2]}의 <b>NEW</b> {lifestyles}라이프</p>
              // <h1>{addrs.split(' ')[2]}의 <img className="ListTitleLetterPic" src="letter_NEW.png" alt="NEW" />  <img className="ListTitleLetterPic" src={"letter_"+`${lifestyles}`+".png"} alt="lifestyles" /></h1>
              :
              <p>오늘의 <b>NEW</b> 라스트마켓 상품</p>
              // <h1>오늘의 <img className="ListTitleLetterPic" src="letter_NEW.png" alt="NEW" /> 라스트마켓 상품</h1>
            }
          </div>
          <br />
          <GoodsList lifestyles={'lifestyle='+lifestyles} addrs={'&location='+addrs} sort="&sort=lastModifiedDateTime,DESC&sort=favoriteCnt" dealState="&dealState=DEFAULT&dealState=ONBROADCAST&dealState=AFTERBROADCAST" />
          {/* <div className='row'>
          {
            products.map((product, i) => {
              return (
                <Card key={i} product={product} i={i} />
              )
            })
          }
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Main
