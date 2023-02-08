import { useEffect, useState } from 'react'
import products from "../../Data"
import './Discription.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Discription(props) {
  
  const [ productDetail, setProductDetail ] = useState([])
  const [ detailURIS, setDetailURIS ] = useState([])

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

  const navigate = useNavigate()

  useEffect(() => {
    DiscriptionApi()
  }, [])

  console.log(productDetail)

  const productId = productDetail.productId

  return (
    <div>

      <div className="decriptionBox">
        <div>
          {/* <img src={productDetail.imgURIs} width="500px" height="400px" alt="DetailImg" /> */}
        </div>
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
          <div className='likeBtn'>
            <div>{productDetail.favoriteCnt}</div>
            <button>하트</button>
          </div>
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
            <span><button>채팅</button></span>
          </div>
          <div>
            <button onClick={() => (navigate(`/live/${productDetail.productId}`, { state : {productId : `${productDetail.productId}`}}))}>라이브참가</button>
            <button>즉시구매</button>
          </div>
        </div>
        {/* <div>
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(props.id) + 1)+ ".jpg"} width="500px" height="400px" alt="" />
          </div>
          <div>
          <h1>{products[props.id].title}</h1>
          <div className="priceBox">
          <p>{products[props.id].price}</p>
          </div>
        </div> */}
      </div>
      <div className='contentBox'>
        {productDetail.content}
      </div>
    </div>
  )
}

export default Discription