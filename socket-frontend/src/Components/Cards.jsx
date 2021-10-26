import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

export function Card({ id, nome, preco, imagem }) {
  const [currentPrice, setCurrencePrice] = useState(preco);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    socket.on('refreshPrice', (data) => {
      if (id === data._id) setCurrencePrice(data.preco);
    })
  }, [id]);

  const handleClick = () => {
    if (currentPrice > 99) {
      setCurrencePrice(100);
      setIsDisable(true);
    } else {
      socket.emit('increasePrice', { id });
    }
  }

  return(
    <div className="card" style={ { width: "valor "}}>
      <img className="card-img-top" src={ imagem } alt={ nome } />
      <div className="card-body">
        <h5 className="card-title">{ nome }</h5>
        <p className="card-text">{ currentPrice }</p>
        <button className="btn btn-primary" disabled={ isDisable } onClick={ handleClick }>{ isDisable ? 'Produto arrematado' : 'Dar um lance' }</button>
      </div>
    </div>
  );
}