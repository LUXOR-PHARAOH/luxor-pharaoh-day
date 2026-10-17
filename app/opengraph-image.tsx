import {ImageResponse} from 'next/og';

export const alt='LUXOR PHARAOH DAY — A Day in Luxor with the Pharaohs';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function Image(){
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'#0b0d0f',color:'#f7f2e8',fontFamily:'sans-serif'}}>
      <div style={{fontSize:34,color:'#d8b36a',letterSpacing:4}}>A DAY IN LUXOR WITH THE PHARAOHS</div>
      <div style={{fontSize:82,fontWeight:700,marginTop:24}}>اعرف. اتأكد. اتحرك.</div>
      <div style={{fontSize:28,color:'#b9b1a3',marginTop:24}}>Independent bilingual visitor information & local planning</div>
      <div style={{fontSize:58,color:'#f0d39a',marginTop:42}}>𓂀  LUXOR PHARAOH DAY</div>
    </div>,
    size
  );
}
