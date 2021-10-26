import React, { useEffect, useState } from 'react';

import { Card } from '../Components/Cards';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/auctions')
      .then(response => response.json())
      .then(data => {
        setAuctions(data);
        setIsLoading(false);
      })
  }, []);

  return(
    <>
    <h1>Leilão de Centavos</h1>

    { isLoading ? <p>Carregando...</p>
      : (
        auctions.map(auction => (
          <Card
            key={auction._id}
            id={auction._id}
            nome={auction.nome}
            imagem={auction.imagem}
            preco={auction.preco}
          />
        ))
      )
    }
    </>
  )
}