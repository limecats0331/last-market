import { useEffect, useState } from 'react'
// import products from "../../Data"
// import DeleteGood from "./DeleteGood"
import './Discription.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"


function Discription(props) {
  let reduxData = useSelector((state) => {return state})

  const [ productDetail, setProductDetail ] = useState([])
  const [ detailURIS, setDetailURIS ] = useState([])
  const [ isBrod, setIsBrod ] = useState(false)
  
  const cookieValue =  Cookies.get('Authentication');
  
  let userDetail 

  if (cookieValue) {
    userDetail = jwt_decode(cookieValue)
  }
  console.log(userDetail)

  function DiscriptionApi() {
    
    const url = `https://i8d206.p.ssafy.io/api/product/${props.id}`

    axios.get(url)
    .then((res) => {
      setProductDetail(res.data)
      setDetailURIS(res.data.imgURIs)
      // console.log(res.data.imgURIs)
      console.log('success')
      
    })
    .catch((res) => {
      console.log('Failed')
    })
  }
  
  useEffect(() => {
    DiscriptionApi()
  }, [])
  
  const navigate = useNavigate()

  function DeleteGood(){

      return(
        axios({
          method: 'delete',
          url: `https://i8d206.p.ssafy.io/api/product/${props.id}`
        })
        .then((res) => {
          console.log('삭제 post 완료')
        })
        .catch((res) => {
          console.log('삭제 post 실패')
        })
      )
  
  }
  
  const favorite = (() => {
    return(
      axios({
        method: 'post',
        url: `https://i8d206.p.ssafy.io/api/favorite/${props.id}`
      })
      .then((res) => {
        console.log(res.data)
      })
    )
  })

  const Delete = (() => {
    return(
      DeleteGood(),
      navigate('/')
    )
  })

  console.log(productDetail)

  return (
    <div>
      <div className="decriptionBox">
        <div className='imagesBox'>
          {
            detailURIS.map((imgURI) => {
              return (
                <img src={imgURI} width="500px" height="400px" alt="DetailImg" />
              )
            })
          }
        </div>
        <div className='detailBox'>
          <h1>{productDetail.title}</h1>
          {
            productDetail.sellerId === userDetail?.id ?
            null
            :
            <div className='likeBtn'>
              {
                `${productDetail.isFavorite}` ?
                <div>찜 완료</div> :
                <div>찜 아님</div>
              }
              <div>{productDetail.favoriteCnt}</div>
              <button onClick={favorite}>하트</button>
            </div>
          }
          <div className="priceBox">
            <div>{ 
              <p>{productDetail.startingPrice}</p> ? 
              <p>{productDetail.startingPrice}</p> : 
              <p>{productDetail.instantPrice}</p>}
            </div>
          </div>
          <div className='profileBox'>
            {
              <img src={productDetail.profile} alt="프로필사진" /> ?
              <img src={productDetail.profile} alt="프로필사진" width="100px" height="100px" /> :
              <img src="profile_icon.png" width="150px" height="150px" alt="" />
            }
            <div>
              <p>{productDetail.sellerNickname}</p>
              <p>{productDetail.location}</p>
            </div>
              <span><button onClick={() => (navigate(`/Chat_onetoone/${productDetail.productId}`, { state : {productId : `${productDetail.productId}` , id : `${userDetail?.id}` , sellerId : `${productDetail.sellerId}`}} ))}>채팅</button></span>
          </div>
          {
            productDetail.sellerId === userDetail?.id ?
            <div>
              <button onClick={() => (navigate(`/live_sell/${productDetail.productId}`, { state : {productId : `${productDetail.productId}` , id : `${userDetail?.id}` , sellerId : `${productDetail.sellerId}`}}))}>라이브 시작</button>
            </div>
            :
            <div>
              <button onClick={() => (navigate(`/live_buy/${productDetail.productId}`, { state : {productId : `${productDetail.productId}` , id : `${userDetail?.id}` , sellerId : `${productDetail.sellerId}`}}))}>라이브 참여</button>
              <button onClick={() => (navigate(`/Chat_onetoone/${productDetail.productId}`, { state : {productId : `${productDetail.productId}` , id : `${userDetail?.id}` , sellerId : `${productDetail.sellerId}`}} ))}>즉시구매</button>
            </div>
          }
        </div>
      </div>
      <br />
      <div className='contentBox'>
        {productDetail.content}
      </div>
    </div>
  )
}

export default Discription