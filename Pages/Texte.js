import './style.css'
// import p1 from './p1.png'
// import p2 from './p2.png'
// import p3 from './p3.png'
function Texte (){
    return (
    <div>
        <h1 className='texte'>
                Trouvez la crèche idéale 
                <br />
                pour votre enfant selon
                <br />
                vos critères
            </h1>
            <h2 className='texte2'>
                Simplifiez votre recherche de  
                <br />
                crèche dès maintenant!
            </h2>
            {/* <img src={p1} alt="" style={{ width: '260px', height: '190px', position: 'absolute', top: ' 80px', left:'750px' }} />
            <img src={p2} alt="" style={{ width: '260px', height: '150px', position: 'absolute', top: ' 320px', left:'850px' }} />
            <img src={p3} alt="" style={{ width: '130px', height: '130px', position: 'absolute', top: ' 330px', left:'500px' }} /> */}
    </div>
    );
}
export default Texte;