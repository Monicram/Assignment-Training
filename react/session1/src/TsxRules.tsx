function TsxRules() {
  return (
    <div>
      <input type="text"/> 
      {/*Closing tag should be added*/}
      <p className="highlight">Styled paragraph</p>
      {/*class should be written as className in React*/}
      <label htmlFor="email">Email</label>
      {/*for should be written as htmlFor in React*/}
      <input id="email" type="email"/> 
      {/*Closing tag should be added*/}
      <p style={{color: 'red', fontSize: '16px'}}>Red text</p>
      {/*style should be written as an object in React*/}
      {/* This is a comment. The comment line should be like this*/}
    </div>
  )
}

export default TsxRules