import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4315

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`

const ScrollSpacer = styled.div`
  width: 1px;
  visibility: hidden;
  pointer-events: none;
  height: ${({ $scale }) => DESIGN_HEIGHT * $scale}px;
`

const ScalableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  transform-origin: top left;
  transform: scale(${({ $scale }) => $scale});
  border: none;
`

const StyledFrame = styled.div`
  width: 1920px;
  height: ${DESIGN_HEIGHT}px;
  position: relative;
  background: white;
  overflow: hidden;
`

const StyledLeftMarginStrip = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1.5px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1.5px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledTopLine = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledBottomLine = styled.div`
  position: absolute;
  top: ${DESIGN_HEIGHT - 1.5}px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #272B37;
  z-index: 100;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 31px;
  width: 1858px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider = styled.div`
  position: absolute;
  top: 15px;
  left: 548px;
  width: 1.5px;
  height: 3443px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1.5px;
  height: 2145px;
  background: #9C9E9D;
  z-index: 10;
`

const StyledHeaderVLine = styled.div`
  position: absolute;
  width: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.vl-1 { top: 15px; left: 1118px; height: 75px; }
  &.vl-2 { top: 15px; left: 1318px; height: 76px; }
`

const StyledHLine = styled.div`
  position: absolute;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.section-1 { top: 1071px; left: 0; width: 1920px; }
  &.section-2 { top: 2158px; left: 1px; width: 1920px; }
  &.section-3 { top: 3230px; left: 0; width: 1920px; }
  &.section-4 { top: 4206px; left: 0; width: 1920px; }

  &.compressor-1 { top: 565px; left: 550px; width: 880px; }
  &.compressor-2 { top: 630px; left: 845px; width: 585px; }
  &.compressor-3 { top: 700px; left: 1090px; width: 340px; }
  &.compressor-4 { top: 770px; left: 1260px; width: 170px; }
  &.compressor-5 { top: 994px; left: 550px; width: 295px; }
  &.compressor-6 { top: 1070px; left: 550px; width: 295px; }

  &.dryer-1 { top: 1405px; left: 32px; width: 518px; }
  &.filter-1 { top: 2514px; left: 795px; width: 1095px; }
  &.filter-2 { top: 3084px; left: 550px; width: 165px; }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 995px; left: 548px; height: 76px; }
  &.right { top: 995px; left: 844px; height: 76px; }
`

const StyledDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #6f6f6f;
  border-radius: 3px;
  z-index: 150;
`

const StyledHeroImage = styled.img`
  position: absolute;
  top: 1131px;
  left: 0;
  width: 1030px;
  height: 1030px;
  aspect-ratio: 1.38;
  object-fit: cover;
`

const StyledHeroTitle = styled(motion.h1)`
  position: absolute;
  top: 302px;
  left: 592px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #03043c;
  margin: 0;
  line-height: 1.1;
  z-index: 11;
`

const StyledHeroSubtext = styled.p`
  position: absolute;
  top: 392px;
  left: 1163px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #a9a9a9;
  text-align: right;
  line-height: 1.6;
  margin: 0;
  z-index: 11;
`

const StyledCategoryList = styled.div`
  position: absolute;
  top: 554px;
  left: 1440px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 11;
`

const StyledCategoryItem = styled(Link)`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
  text-align: right;
  line-height: 1;
  height: 66px;
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover { color: #03043c; }
  &.active { color: #03043c; border-bottom: 1.5px solid #03043c; padding-bottom: 2px; }
`

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 105px;
  color: #bcbcbc;
  text-align: right;

  &.main  { top: 935px;  left: 884px; }
  &.sub   { top: 1095px; left: 884px; font-size: 70px; }
`

const StyledDescriptionLeft = styled.p`
  position: absolute;
  top: 802px;
  left: 167px;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 20px;
  color: black;
  text-align: right;
  line-height: 1.5;
  margin: 0;
  z-index: 11;
`

const StyledContactBox = styled.div`
  position: absolute;
  top: 1010px;
  left: 570px;
  width: 232px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: #030d28;
  text-align: right;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;

  &:hover { color: #575757; }
`

const StyledDryerTitle = styled.h2`
  position: absolute;
  top: 1162px;
  left: 60px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 49px;
  color: #030a3e;
  text-align: center;
  margin: 0;
  line-height: 1.2;
`

const StyledDryerSubtext = styled.p`
  position: absolute;
  top: 1287px;
  left: 175px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #838383;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledDryerImage1 = styled.img`
  position: absolute;
  top: 1287px;
  left: 414px;
  width: 570px;
  height: 570px;
  object-fit: cover;
  z-index:100;
`

const StyledDryerImage2 = styled.img`
  position: absolute;
  top: 1627px;
  left: 984px;
  width: 510px;
  height: 510px;
  object-fit: cover;
`

const StyledDryerCardTitle = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #0f152d;
  text-align: right;
  white-space: nowrap;

  &.bld { top: 1337px; left: 907px; }
  &.blr { top: 1568px; left: 1092px; }
`

const StyledDryerSpecs = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #a5a5a5;
  line-height: 1.6;
  margin: 0;

  &.specs-1 { top: 1411px; left: 946px; }
  &.specs-2 { top: 1650px; left: 1456px; }
`

const StyledFilterImage1 = styled.img`
  position: absolute;
  top: 2218px;
  left: 51px;
  width: 479px;
  height: 482px;
  object-fit: cover;
  z-index:100;
`

const StyledTankImage1 = styled.img`
  position: absolute;
  top: 2247px;
  left: 1266px;
  width: 383px;
  height: 913px;
  
`

const StyledTankImage2 = styled.img`
  position: absolute;
  top: 2075px;
  left: 1650px;
  width: 270px;
  height: 1110px;
`

const StyledTankImage3 = styled.img`
  position: absolute;
  top: 2460px;
  left: 1488px;
  width: 322px;
  height: 770px;
  z-index:100;
`

const StyledFilterTitle = styled.div`
  position: absolute;
  top: 2210px;
  left: 594px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #0f152d;
  text-align: right;
  white-space: nowrap;
`

const StyledFilterDesc = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  color: #a1a1a1;
  line-height: 1.6;
  margin: 0;

  &.desc-1 { top: 2284px; left: 597px; font-size: 24px; }
  &.desc-2 { top: 2499px; left: 594px; font-size: 16px; }
  &.desc-3 { top: 2780px; left: 738px; font-size: 35px; color: #0f152d; text-align: right; white-space: nowrap; }
  &.desc-4 { top: 2854px; left: 738px; font-size: 24px; }
  &.desc-5 { top: 3070px; left: 729px; font-size: 16px; }
`

const StyledFormSection = styled.section`
  position: absolute;
  top: 3230px;
  left: 0;
  width: 1920px;
`

const StyledFormTitle = styled(motion.div)`
  position: absolute;
  top: 217px;
  left: 450px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 60px;
  color: black;
  text-align: center;
  white-space: nowrap;
`

const StyledFormSubtext = styled.p`
  position: absolute;
  top: 310px;
  left: 870px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #b5b6bb;
  line-height: 1.5;
  margin: 0;
`

const StyledFormRow = styled.div`
  position: absolute;
  top: 600px;
  left: 262px;
  width: 1402px;
  height: 59px;
`

const StyledFormFieldWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  &.field-name  { left: 0;      width: 366px; }
  &.field-phone { left: 520px;  width: 366px; }
  &.field-email { left: 1030px; width: 366px; }
`

const StyledFormUnderline = styled.div`
  width: 100%;
  height: 1.5px;
  background: #9C9E9D;
`

const StyledFormInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
  color: black;
  padding: 0;
  height: 27px;
`

const StyledFormLabel = styled.label`
  margin-top: 6px;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
  color: black;
`

const StyledSubmitWrapper = styled.div`
  position: absolute;
  top: 780px;
  left: 807px;
  width: 308px;
  height: 64px;
`

const StyledSubmitDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background: black;
  border-radius: 6px;
  z-index: 2;
  pointer-events: none;
`

const StyledSubmitButton = styled.button`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 302px;
  height: 60px;
  background: white;
  border: 1px solid #868686;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, color 0.25s ease;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #272B37;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: 0;
  }

  &:hover::after { transform: scaleX(1); }
  &:hover span   { color: white; }
  &:disabled     { opacity: 0.7; cursor: not-allowed; }

  span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }
`

const StyledFormStatus = styled.div`
  position: absolute;
  top: 860px;
  left: 807px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: ${({ $error }) => ($error ? '#f44336' : '#4caf50')};
`

const StyledFooter = styled.footer`
  position: absolute;
  top: 4230px;
  left: 0;
  width: 1920px;
  text-align: center;
`

const StyledFooterText = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  color: black;
  text-align: center;
  line-height: 1.6;
  margin: 0 auto;
`

const DOT_POSITIONS = [
  { top: 87,   left: 28  },
  { top: 13,   left: 28  },
  { top: 13,   left: 546 },
  { top: 13,   left: 841 },
  { top: 87,   left: 841 },
  { top: 87,   left: 1116 },
  { top: 13,   left: 1116 },
  { top: 13,   left: 1317 },
  { top: 87,   left: 1317 },
  { top: 88,   left: 1886 },
  { top: 12,   left: 1886 },
  { top: 87,   left: 546  },
  { top: 628,  left: 841  },
  { top: 698,  left: 1088 },
  { top: 768,  left: 1256 },
  { top: 1068, left: 546  },
  { top: 1066, left: 841  },
  { top: 992,  left: 842  },
  { top: 1071, left: 29   },
  { top: 2158, left: 29   },
  { top: 3227, left: 29   },
  { top: 4204, left: 29   },
  { top: 1071, left: 1887 },
  { top: 2158, left: 1886 },
  { top: 3227, left: 1887 },
  { top: 4203, left: 1887 },
  { top: 563,  left: 546  },
  { top: 992,  left: 546  },
]

const CatalogPage = () => {
  const { pathname } = useLocation()
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [formStatus, setFormStatus] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
        setFormStatus('success')
        setFormData({ name: '', phone: '', email: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <PageWrapper>
      <ScrollSpacer $scale={scale} />
      <ScalableContent $scale={scale}>
        <StyledFrame>

          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledBottomLine />
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="section-4" />
          <StyledHLine className="compressor-1" />
          <StyledHLine className="compressor-2" />
          <StyledHLine className="compressor-3" />
          <StyledHLine className="compressor-4" />
          <StyledHLine className="compressor-5" />
          <StyledHLine className="compressor-6" />
          <StyledHLine className="dryer-1" />
          <StyledHLine className="filter-1" />
          <StyledHLine className="filter-2" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
          ))}

          <Header />

          <StyledHeroImage
            src="/src/frontend/images/frame6/blt-s-pm-6-800-550-1 1.png"
            alt="Компрессор Bolaite"
          />

          <StyledHeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Компрессорная продукция Bolaite
          </StyledHeroTitle>

          <StyledHeroSubtext>
            —символ надежности,<br />
            высокого качества<br />
            в превосходной производительности<br />
            в сфере промышленности
          </StyledHeroSubtext>

          <StyledCategoryList>
            <StyledCategoryItem to="/products" className={pathname === '/products' ? 'active' : ''}>ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ</StyledCategoryItem>
            <StyledCategoryItem to="/products/oil-free" className={pathname === '/products/oil-free' ? 'active' : ''}>БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ</StyledCategoryItem>
            <StyledCategoryItem to="/products/portable" className={pathname === '/products/portable' ? 'active' : ''}>ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ</StyledCategoryItem>
            <StyledCategoryItem to="/products/air-treatment" className={pathname === '/products/air-treatment' ? 'active' : ''}>ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА</StyledCategoryItem>
          </StyledCategoryList>

          <StyledEquipmentLabel className="main">ОБОРУДОВАНИЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="sub">ДЛЯ ОЧИСТКИ ВОЗДУХА</StyledEquipmentLabel>

          <StyledDescriptionLeft>
            Компрессорное оборудование<br />
            ивестиция в будущее вашего бизнеса
          </StyledDescriptionLeft>

          <StyledContactBox>СВЯЗАТЬСЯ</StyledContactBox>

          <StyledDryerTitle>
            Рефрижераторные<br />осушители Bolaite
          </StyledDryerTitle>

          <StyledDryerSubtext>
            надежное, экономичное, простое<br />в использовании решение
          </StyledDryerSubtext>

          <StyledDryerImage1
            src="/src/frontend/images/frame6/dryer-800.jpg 1.png"
            alt="Осушитель BLD"
          />

          <StyledDryerImage2
            src="/src/frontend/images/frame6/BOLAITE-AIR-DYER-800.jpg 1.png"
            alt="Осушитель BLR"
          />

          <StyledDryerCardTitle className="bld">
            Рефрижераторные осушители серии BLD
          </StyledDryerCardTitle>

          <StyledDryerCardTitle className="blr">
            Рефрижераторные осушители серии BLR
          </StyledDryerCardTitle>

          <StyledDryerSpecs className="specs-1">
            Точка росы 3-7 *C<br />
            1,5-105 м3/мин<br />
            Экологически чистый хладагент<br />
            Круглосуточная эксплуатация<br />
            Требуется минимальное обслуживание
          </StyledDryerSpecs>

          <StyledDryerSpecs className="specs-2">
            Точка росы 3-7 *C<br />
            1,5-105 м3/мин<br />
            Экологически чистый хладагент<br />
            Круглосуточная эксплуатация<br />
            Требуется минимальное обслуживание
          </StyledDryerSpecs>

          <StyledFilterImage1
            src="/src/frontend/images/frame6/blt-filter.png 1.png"
            alt="Фильтр Bolaite"
          />

          <StyledTankImage1
            src="/src/frontend/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 2.png"
            
            alt="Резервуар сжатого воздуха"
          />

          <StyledTankImage2
            src="/src/frontend/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 3.png"
            alt="Резервуар сжатого воздуха"
          />

          <StyledTankImage3
            src="/src/frontend/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 1.png"
            alt="Резервуар сжатого воздуха"
          />

          <StyledFilterTitle>Фильтрация воздуха</StyledFilterTitle>

          <StyledFilterDesc className="desc-1">
            Фильтры оснащены импортными<br />
            многослойными фильтрующими элементами из стекловолокна,<br />
            которые обеспечивают превосходную фильтрацию<br />и низкие потери давления
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-2">
            Компактный размер<br />
            Высокая эффективность<br />
            Спроектирован для круглосуточной работы<br />
            Требуется минимальное обслуживание
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-3">
            Резервуар для хранения сжатого воздуха
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-4">
            Резервуар для сжатого воздуха — важная часть всей системы.<br />
            Компенсирует колебания давления,<br />
            обеспечивает стабильное давление в системе,<br />
            служит резервуаром и конденсирует воду
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-5">
            Импортный многослойный фильтр из стекловолокна<br />
            Низкий перепад давления<br />
            Превосходный эффект фильтрации<br />
            Стабильная производительность
          </StyledFilterDesc>

          <StyledFormSection aria-label="Оставить заявку">
            <StyledFormTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ОСТАВИТЬ ЗАЯВКУ
            </StyledFormTitle>

            <StyledFormSubtext>
              Поможем подобрать компрессор,<br />
              соответствующий вашим запросам
            </StyledFormSubtext>

            <form onSubmit={handleSubmit} noValidate style={{ position: 'relative' }}>
              <StyledFormRow>
                <StyledFormFieldWrapper className="field-name">
                  <StyledFormInput
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Имя"
                  />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="name-input">ИМЯ</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-phone">
                  <StyledFormInput
                    id="phone-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-label="Номер телефона"
                  />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="phone-input">НОМЕР ТЕЛЕФОНА</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-email">
                  <StyledFormInput
                    id="email-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Электронная почта"
                  />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="email-input">ЭЛЕКТРОННАЯ ПОЧТА</StyledFormLabel>
                </StyledFormFieldWrapper>
              </StyledFormRow>

              <StyledSubmitWrapper>
                <StyledSubmitDot />
                <StyledSubmitButton
                  type="submit"
                  disabled={formStatus === 'sending'}
                  aria-label="Отправить заявку"
                >
                  <span>
                    {formStatus === 'sending'
                      ? 'ОТПРАВКА...'
                      : formStatus === 'success'
                      ? 'ОТПРАВЛЕНО'
                      : 'ОТПРАВИТЬ'}
                  </span>
                </StyledSubmitButton>
              </StyledSubmitWrapper>

              {formStatus === 'error' && (
                <StyledFormStatus $error>Ошибка. Попробуйте позже.</StyledFormStatus>
              )}
            </form>
          </StyledFormSection>

          <StyledFooter>
            <StyledFooterText>
              телефон +7 (999) 999 99 99<br />
              почта: mail@example.com<br />
              адрес: Город город улица улица дом дом
            </StyledFooterText>
          </StyledFooter>

        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export { CatalogPage as default }