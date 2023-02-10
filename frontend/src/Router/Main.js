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
import jwt_decode from "jwt-decode"

// axios

function Main() {
  const location = useLocation();
  // 이 부분부터 유저 정보 axios 입니다. redux 사용시 대체할 수 있습니다
  const URL = `https://i8d206.p.ssafy.io/api/user`

  const [ lifestyles, setLifestyles ] = useState('')
  const [ addrs, setAddrs ] = useState('')

  const dispatch = useDispatch()

  const getUserInfo = (() => {
    return(
      axios({
        method: "get",
        url: URL,
      })
      .then((res) => {
        // console.log(res)
        console.log('유저정보 들어옴')
        // console.log(res.data)
        setLifestyles(res.data.lifestyles)
        setAddrs(res.data.addr)
        dispatch(addUserInfo(res))
      })
      .catch((res) => {
        console.log("실패")
      })
    )
  })

  // let reduxData = useSelector((state) => {return state})


  // console.log(1)
  useEffect(() => {
    getUserInfo()
    dispatch(addToken(location.search.substring(7)))
    dispatch(addInfo(jwt_decode(useSelector((state) => {return state}).token)))
  },[])
  
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
            <h1 >{addrs.split(' ')[2]}의 <img className="ListTitleLetterPic" src="letter_HOT.png" alt="HOT" /> 한 {lifestyles}라이프 상품</h1>
            <br />
            <div>
              <GoodsListSwiper lifestyles={'lifestyle='+lifestyles} addrs={'&location='+addrs} sort="&sort=favoriteCnt,DESC&sort=lastModifiedDateTime,DESC" dealState="&dealState=DEFAULT&dealState=ONBROADCAST&dealState=AFTERBROADCAST" />
            </div>
          </div>
          <br />
          <br />
          <div>
            <h1>{addrs.split(' ')[2]}에서 {lifestyles}라이프 <img className="ListTitleLetterPic" src="letter_LIVE.png" alt="LIVE" />  중</h1>
            <br />
            <div>
              <GoodsListSwiper lifestyles={'lifestyle='+lifestyles} addrs={'&location='+addrs} sort="&sort=favoriteCnt,DESC&sort=lastModifiedDateTime,DESC" dealState="&dealState=DEFAULT&dealState=ONBROADCAST" />
            </div>
          </div>
          <hr />
          <br />
        </div>
        <div>
          <h1>{addrs.split(' ')[2]}의 <img className="ListTitleLetterPic" src="letter_NEW.png" alt="NEW" />  {lifestyles}라이프</h1>
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
