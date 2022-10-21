import React, { useState } from 'react';
import dict from './dict/word-master-2000.json'; 

type Dict = {
  no:string,
  word:string,
  meaning:string
}


function getRandomInt(min: number, max:number) {
  return Math.floor(Math.random() * (max-min))+min;
}

function speech (text:string){
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance)
}


function Test() {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(50);
  
  const [problems, setProblems] = useState<Dict[]>([])

  const handleChangeStart = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const day = +e.target.value
    setStart(day)
    if (day > end) setEnd(day)
  }

  const handleChangeEnd = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const day = +e.target.value
    setEnd(day)
    if (day < start) setStart(day)
  };

  const handleClickGenerate = () => {
    const endNo = end * 40;
    const startNo = (start-1)*40;
    const l = endNo - startNo;

    const probs  = dict.slice(startNo, endNo);
    for (let i = 0; i < 40 ; i++){
      const j = getRandomInt(i, l)
      const tmp = probs[i];
      probs[i] = probs[j];
      probs[j] = tmp;
    }
    setProblems(_ => [...probs.slice(0,40)])
  }
  
  return (
    <>
      <div className="noprint">
        시험 범위 - 
        day<select onChange={handleChangeStart} value={start}>
          { Array(50).fill(0).map( (_,i) =>  <option key={i+1}>{i+1}</option>  ) }
        </select>
        -
        day<select onChange={handleChangeEnd} value={end}>
          { Array(50).fill(0).map( (_,i) =>  <option key={i+1}>{i+1}</option>  ) }
        </select>

        <input type="button" value="문제 출제!" onClick= {handleClickGenerate}/>
        
      </div>
      {problems.length>0 &&
        <>
          <div className="Quiz-page">
            <div>{problems.map(dic=>Problem(dic))}</div>
          </div>
          <div className="pagebreak"></div>
          <div className="Quiz-page">
            <div>{problems.map(dic=>Answer(dic))}</div>
          </div>
        </>
      }
    </>
  );
}

export default Test;


function Problem(dic: Dict) {
  if (!dic) return
  // if (!props || !props.no) return
  return <>
      <div style={{float:'left',width:'22%',height:'4.5vh',textAlign:'left', fontSize:24}} key={dic.no+'_1'}>
        {dic['word']}
        {/* dic['word'].replace(/./g, "*") */}
      </div>
      <div style={{float:'left',width:'23%',height:'4.5vh',textAlign:'left', fontSize:16, color:'#ffcc55', cursor:'pointer'}} key={dic.no+'_2'}>
        <span style={{cursor:'pointer'}} onClick={()=>speech(dic['word'])}>&#128172;</span>
      </div>
      <div style={{float:'left',width:'5%',height:'4.5vh',textAlign:'left'}} key={dic.no} />
    </>

}

function Answer(dic: Dict) {
  if (!dic) return
  // if (!props || !props.no) return
  return <>
      <div style={{float:'left',width:'22%',height:'4.5vh',textAlign:'left', fontSize:24}} key={dic.no+'_3'}>{(dic['word'])}</div>
      <div style={{float:'left',width:'23%',height:'4.5vh',textAlign:'left', fontSize:12, color:'#ffcc55'}} key={dic.no+'_4'}>
        {dic['meaning']}
      </div>
      <div style={{float:'left',width:'5%',height:'4.5vh',textAlign:'left'}} key={dic.no} />
    </>

}
