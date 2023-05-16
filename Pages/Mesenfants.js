
import Rectangle from './Rectangle'
import Modifier from './Modifier'
// import photo from './photo.png'
// import pfille from './pfille.png'
// import pgarçon from './pgarçon.png'
import Infosenfant from './Infosenfants';


function Mesenfants() {
  return (
    <div >
      <Rectangle />
      <Modifier />
      <Infosenfant />
      {/* <img src={pfille} alt="" style={{ width: '100px', height: '100px', position: 'absolute', top: '230px', left:'490px' }} />
      <img src={pgarçon} alt="" style={{ width: '100px', height: '100px', position: 'absolute', top: '370px', left:'490px' }} /> */}
    </div>
  );
}

export default Mesenfants;

