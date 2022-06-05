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


function Test() {
  const [end, setEnd] = useState(1);
  
  const [problems, setProblems] = useState<Dict[]>([])

  const handleChangeEnd = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setEnd(+e.target.value)
    console.log(e.target.value);
  };

  const handleClickGenerate = () => {
    const maxn = end * 40;
    const probs  = dict.slice(0, maxn);
    for (let i = 0 ; i < 40 ; i++){
      const j = getRandomInt(i, maxn)
      console.log('generating',j)
      const tmp = probs[i];
      probs[i] = probs[j];
      probs[j] = tmp;
    }
    setProblems(_ => [...probs.slice(0,40)])
    console.log(probs.slice(0,40))

  }
  
  return (
    <div className="App">
      <div className="noprint">
        Day : 
        <select onChange={handleChangeEnd}>
          { 
            Array(50).fill(0).map( (_,i) =>  <option key={i+1}
            selected={i+1 === end}>{i+1}</option>  )
          }
        </select>
        <input type="button" value="문제 출제!" onClick= {handleClickGenerate}/>
      </div>
      <header className="App-header">
        <div style={{width:'95%'}}>{problems.map(dic=>Problem(dic))}</div>
      </header>
      <header className="App-header">
        <div style={{width:'95%'}}>{problems.map(dic=>Answer(dic))}</div>
      </header>
    </div>
  );
}

export default Test;


function Problem(dic: Dict) {
  if (!dic) return
  // if (!props || !props.no) return
  return <>
      <div style={{float:'left',width:'22%',height:50,textAlign:'left', fontSize:24}} key={dic.no+'_1'}>{(dic['word'])}</div>
      <div style={{float:'left',width:'23%',height:50,textAlign:'left', fontSize:16, color:'#ffcc55'}} key={dic.no+'_2'}>

      </div>
      <div style={{float:'left',width:'5%',height:50,textAlign:'left'}} key={dic.no} />
    </>

}

function Answer(dic: Dict) {
  if (!dic) return
  // if (!props || !props.no) return
  return <>
      <div style={{float:'left',width:'22%',height:50,textAlign:'left', fontSize:24}} key={dic.no+'_3'}>{(dic['word'])}</div>
      <div style={{float:'left',width:'23%',height:50,textAlign:'left', fontSize:12, color:'#ffcc55'}} key={dic.no+'_4'}>
        {dic['meaning']}
      </div>
      <div style={{float:'left',width:'5%',height:50,textAlign:'left'}} key={dic.no} />
    </>

}
