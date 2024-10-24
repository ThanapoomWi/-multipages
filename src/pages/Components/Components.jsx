import './Components.css'
import Counter from './Components/Counter/Counter'
import Time from './Components/Timer/Timer'
import Add from './Components/Add/Add'
import Temp from './Components/Temperatures/Temperatures'
function Components() {

  return (
    <div className='Main-container'>
      <h1 style={{ fontSize: '50px', fontWeight: 'bold', marginTop: '50px' }} className='badge bg-danger'>REACT COMPONENTS</h1>
      <div className='Components-container'>
        <div className='box-1'>
          <Counter name={'John'} /> {/* props val={10} name={'John'}*/}
          <Time /> {/* props value={59} name={'John'}*/}
        </div>
       
        <div className='box-3'>
          <Add/> {/* props v1={10} v2={20}*/}
        </div>
        <div className='box-4'>
          <Temp/>  {/* props celsius={25} fahren={77} kelvin={298}*/}
        </div>
      </div>
      <h1 className='mb-5 text-white rounded-3 p-3 bg-primary d-flex align-items-center'>66068660 นายธนภูมิ วิธานกรกุล</h1>
    </div>
  )
}

export default Components
