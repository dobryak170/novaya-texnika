import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './Header'

const DESIGN_WIDTH = 1920

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background: white;
`

const ScalableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  min-height: 100vh;
  transform-origin: top left;
  transform: scale(${({ $scale }) => $scale});
`

const StyledFrame = styled.div`
  width: ${DESIGN_WIDTH}px;
  min-height: 100vh;
  position: relative;
  background: white;
`

const StyledButtonsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 10;
`

const StyledProductButton = styled(Link)`
  display: block;
  width: 100%;
  max-width: 520px;
  padding: 18px 32px;
  background: white;
  border: 1px solid #9c9e9d;
  color: #272b37;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #272b37;
    color: white;
  }
`

const ProductsPage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const buttons = [
    { text: 'Винтовые воздушные компрессоры', to: '/products/oil-injected' },
    { text: 'Безмасляные воздушные компрессоры', to: '/products/oil-free' },
    { text: 'Портативный воздушный компрессор', to: '/products/portable' },
    { text: 'Оборудование для очистки воздуха', to: '/products/air-treatment' }
  ]

  return (
    <PageWrapper>
      <ScalableContent $scale={scale}>
        <StyledFrame>
          <Header />
          <StyledButtonsWrapper>
            {buttons.map((btn, i) => (
              <StyledProductButton key={i} to={btn.to}>
                {btn.text}
              </StyledProductButton>
            ))}
          </StyledButtonsWrapper>
        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export { ProductsPage as default }
