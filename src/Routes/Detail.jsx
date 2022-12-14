import DetailCard from "../Components/DetailCard";
import { ThemeContext } from '../providers/ThemeContext'
import { useContext } from 'react';

const Detail = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
    <div className={theme === 'light' ? 'light' : 'dark'} style={{height: '75vh'}}>
      <DetailCard />
    </div>
    </>
  )
}

export default Detail
