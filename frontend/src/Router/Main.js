import Card from "../Components/Card"
import products from "../Data"
import Swiper from "../Components/JjimSwiper"
import GoodsList from "../Components/GoodsList"
import GoodsListCard from "../Components/GoodsListCard"


// axios

function Main() {

  
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
          <h1>'진평동'의 미니멀 라이프 운동 상품</h1>
          <br />
          <div>
            <GoodsList />
          </div>
          <br />
          <br />
          <h1>'진평동'에서 미니멀 라이프로 요리 라이브 중</h1>
          <br />
          <div>
            <GoodsList />
          </div>
          <hr />
          <br />
        </div>
        <div>
          {/* <GoodsListCard /> */}
        </div>
        <div>
          <h1>'진평동'에서 NEW</h1>
          <div className='row'>
          {
            products.map((product, i) => {
              return (
                <Card key={i} product={product} i={i} />
              )
            })
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
