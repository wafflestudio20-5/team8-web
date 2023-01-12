import styled from 'styled-components'
const Star_rating = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  margin: 0 auto;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
`
const Star_ratings_fill = styled.div`
  width: ${({ rating }) => rating * 10}%;
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
`
const Star_rating_base = styled.div`
  z-index: 0;
  padding: 0;
`
const Starrating = ({ rating }) => {
  const dummy = [1, 2, 3, 4, 5]
  return (
    <Star_rating>
      <Star_ratings_fill rating={rating}>
        {dummy.map((item) => (
          <span key={item}>★</span>
        ))}
      </Star_ratings_fill>
      <Star_rating_base>
        {dummy.map((item) => (
          <span key={item}>★</span>
        ))}
      </Star_rating_base>
    </Star_rating>
  )
}
export default Starrating
