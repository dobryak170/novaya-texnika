import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4319

// ─── Layout Shell ────────────────────────────────────────────────────────────

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

// ─── Grid Lines ───────────────────────────────────────────────────────────────

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
  top: 4199px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 100;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider = styled.div`
  position: absolute;
  top: 15px;
  left: 548px;
  width: 1.5px;
  height: 3445px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1.5px;
  height: 1575px;
  background: #9C9E9D;
  z-index: 10;
`

const StyledVDivider3 = styled.div`
  position: absolute;
  top: 1830px;
  left: 1686px;
  width: 1.5px;
  height: 1391px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledHeaderVLine = styled.div`
  position: absolute;
  width: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.vl-1 { top: 16px; left: 1118px; height: 75px; }
  &.vl-2 { top: 16px; left: 1318px; height: 75px; }
`

const StyledHLine = styled.div`
  position: absolute;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.section-1  { top: 1064px; left: 0;   width: 1920px; }
  &.section-2  { top: 2145px; left: 0;   width: 1920px; }
  &.section-3  { top: 3220px; left: 1px; width: 1920px; }

  &.compressor-1 { top: 565px;  left: 550px;  width: 880px; }
  &.compressor-2 { top: 630px;  left: 845px;  width: 585px; }
  &.compressor-3 { top: 700px;  left: 1090px; width: 340px; }
  &.compressor-4 { top: 770px;  left: 1260px; width: 170px; }
  &.compressor-5 { top: 994px;  left: 550px;  width: 295px; }
  &.compressor-6 { top: 1064px; left: 550px;  width: 295px; }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 995px; left: 548px; height: 70px; }
  &.right { top: 995px; left: 844px; height: 70px; }
`

const StyledDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  background: white;
  border: 1px solid #9c9e9d;
  border-radius: 50%;
  z-index: 150;
`

// ─── Hero ─────────────────────────────────────────────────────────────────────

const StyledHeroTitle = styled(motion.div)`
  position: absolute;
  top: 302px;
  left: 589px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #000f46;
  z-index: 11;
`

const StyledHeroSubtext = styled.p`
  position: absolute;
  top: 392px;
  left: 1213px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #a9a9a9;
  text-align: right;
  line-height: 1.6;
  margin: 0;
  z-index: 11;
`

const StyledDescriptionLeft = styled.p`
  position: absolute;
  top: 802px;
  left: 166px;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 20px;
  color: black;
  text-align: right;
  line-height: 1.5;
  margin: 0;
  z-index: 11;
`

// ─── Category Nav ─────────────────────────────────────────────────────────────

const StyledCategoryList = styled.div`
  position: absolute;
  top: 554px;
  left: 1440px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 11;
`

const StyledCategoryItem = styled.span`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
  text-align: right;
  line-height: 1;
  height: 69px;
  display: flex;
  align-items: flex-start;
  white-space: nowrap;

  &.active { color: #000f46; }
`

// ─── Equipment Labels ─────────────────────────────────────────────────────────

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  color: #bcbcbc;
  text-align: right;

  &.main { top: 1060px; left: 928px; font-size: 110px; }
  &.sub  { top: 983px;  left: 935px; font-size: 55px;  }
`

// ─── СВЯЗАТЬСЯ ────────────────────────────────────────────────────────────────

const StyledContactBox = styled.div`
  position: absolute;
  top: 1010px;
  left: 570px;
  width: 232px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: #000f46;
  text-align: right;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;

  &:hover { color: #575757; }
`

// ─── Section 1: Spiral ────────────────────────────────────────────────────────

const StyledSpiralTitle = styled.div`
  position: absolute;
  top: 1220px;
  left: 931px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 37px;
  color: #000f46;
  text-align: right;
`

const StyledSpiralDesc = styled.p`
  position: absolute;
  top: 1280px;
  left: 936px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;
`

const StyledProductLabel1 = styled.div`
  position: absolute;
  top: 1415px;
  left: 363px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

// ─── Section 2: Water Lubricated ──────────────────────────────────────────────

const StyledWaterTitle = styled.p`
  position: absolute;
  top: 2182px;
  left: 595px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 39px;
  color: #000f46;
  text-align: right;
  margin: 0;
`

const StyledWaterDesc = styled.p`
  position: absolute;
  top: 2245px;
  left: 595px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;
`

const StyledProductLabel2 = styled.div`
  position: absolute;
  top: 2260px;
  left: 439px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

// ─── Section 3: Bolaite Brand ─────────────────────────────────────────────────

const StyledBolaiteLabel = styled.div`
  position: absolute;
  top: 2659px;
  left: 275px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

const StyledBolaiteBrand = styled.div`
  position: absolute;
  top: 2679px;
  left: 266px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 80px;
  color: #000f46;
`

const StyledBolaiteDesc = styled.p`
  position: absolute;
  top: 2785px;
  left: 100px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  text-align: right;
  line-height: 1.6;
  margin: 0;
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledProductImg = styled.img`
  position: absolute;
  z-index:100;

  &.spiral    { top: 1330px; left: 788px;  width: 968px; height: 720px; }
  &.oil-free  { top: 1460px; left: 190px;  width: 520px; height: 440px; object-fit: contain; }
  &.image5    { top: 2410px; left: 972px;  width: 574px; height: 459px; }
  &.airend    { top: 2312px; left: 569px;  width: 1100px; height: 818px; }
  &.blw       { top: 2497px; left: 510px;  width: 717px; height: 717px; object-fit: cover; }
`

// ─── Spec Block ───────────────────────────────────────────────────────────────

const StyledSpecBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
`

const StyledSpecLabel = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #a5a5a5;
  white-space: nowrap;
`

const StyledSpecValue = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #d2d2d2;
  white-space: nowrap;
  margin-top: 6px;
`

const StyledSpecGap = styled.div`height: 16px;`

const SpecBlock = ({ top, left }) => (
  <StyledSpecBlock style={{ top, left }}>
    <StyledSpecLabel>Макс рабочее давление:</StyledSpecLabel>
    <StyledSpecValue>8-10 бар</StyledSpecValue>
    <StyledSpecGap />
    <StyledSpecLabel>Мощность FAD*</StyledSpecLabel>
    <StyledSpecValue>0,25-13 м3/мин</StyledSpecValue>
    <StyledSpecGap />
    <StyledSpecLabel>Мощность двигателя*</StyledSpecLabel>
    <StyledSpecValue>7,5-25 кВт</StyledSpecValue>
  </StyledSpecBlock>
)

// ─── Form ─────────────────────────────────────────────────────────────────────

const StyledFormSection = styled.section`
  position: absolute;
  top: 3220px;
  left: 0;
  width: 1920px;
`

const StyledFormTitle = styled(motion.div)`
  position: absolute;
  top: 220px;
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
  top: 313px;
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
  top: 603px;
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
  top: 783px;
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
  overflow: hidden;
  transition: color 0.3s ease;

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
  top: 863px;
  left: 807px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: ${({ $error }) => ($error ? '#f44336' : '#4caf50')};
`

// ─── Footer ──────────────────────────────────────────────────────────────────

const StyledFooter = styled.footer`
  position: absolute;
  top: 4223px;
  left: 0;
  width: 1920px;
  text-align: center;
`

const StyledFooterText = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  color: black;
  line-height: 1.6;
  margin: 0 auto;
`

// ─── Dots ─────────────────────────────────────────────────────────────────────

const DOT_POSITIONS = [
  { top: 11,   left: 28   },
  { top: 86,   left: 28   },
  { top: 11,   left: 545  },
  { top: 86,   left: 545  },
  { top: 12,   left: 840  },
  { top: 86,   left: 840  },
  { top: 12,   left: 1115 },
  { top: 85,   left: 1115 },
  { top: 12,   left: 1315 },
  { top: 86,   left: 1315 },
  { top: 12,   left: 1885 },
  { top: 86,   left: 1885 },
  { top: 562,  left: 545  },
  { top: 627,  left: 841  },
  { top: 697,  left: 1088 },
  { top: 767,  left: 1256 },
  { top: 991,  left: 545  },
  { top: 1060, left: 545  },
  { top: 991,  left: 841  },
  { top: 1060, left: 841  },
]

const IMG = (name) => `/src/frontend/images/frame11/${name}`

// ─── Component ───────────────────────────────────────────────────────────────

const OilFreePage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [formStatus, setFormStatus] = useState(null)
  const { pathname } = useLocation()

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

          {/* ── Grid ── */}
          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledBottomLine />
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="compressor-1" />
          <StyledHLine className="compressor-2" />
          <StyledHLine className="compressor-3" />
          <StyledHLine className="compressor-4" />
          <StyledHLine className="compressor-5" />
          <StyledHLine className="compressor-6" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
          ))}

          {/* ── Header ── */}
          <Header />

          {/* ── Hero ── */}
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

          <StyledDescriptionLeft>
            Компрессорное оборудование<br />
            инвестиция в будущее вашего бизнеса
          </StyledDescriptionLeft>

          {/* ── Category Nav ── */}
          <StyledCategoryList>
            <StyledCategoryItem className={pathname === '/products/oil-injected' ? 'active' : ''}>
              ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/oil-free' ? 'active' : ''}>
              БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/portable' ? 'active' : ''}>
              ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/air-treatment' ? 'active' : ''}>
              ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА
            </StyledCategoryItem>
          </StyledCategoryList>

          <StyledEquipmentLabel className="sub">БЕЗМАСЛЯННЫЕ ВОЗДУШНЫЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="main">КОМПРЕССОРЫ</StyledEquipmentLabel>

          <StyledContactBox>СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── Spiral Section ── */}
          <StyledSpiralTitle>Спиральный безмасляный компрессор</StyledSpiralTitle>
          <StyledSpiralDesc>
            Серия, объединившая обширный опыт и знания Atlas Copco<br />
            в прогрессивном решении
          </StyledSpiralDesc>

          <StyledProductImg className="spiral"   src={IMG('Spiral_Air_OilFreeCompressor 1.png')} alt="Спиральный безмасляный компрессор" />
          <StyledProductImg className="oil-free" src={IMG('oil-free-800-800 1.png')}             alt="Безмасляный компрессор" />
          <StyledProductLabel1>TH PM 10-100 л.с.</StyledProductLabel1>

          <SpecBlock top={1930} left={323} />

          {/* ── Water Lubricated Section ── */}
          <StyledWaterTitle>Безмасляный компрессор с водяной смазкой</StyledWaterTitle>
          <StyledWaterDesc>
            Ассортимент высоконадежных компрессоров,<br />
            обеспечивающих 100% безмасляный чистый воздух
          </StyledWaterDesc>

          <StyledProductImg className="airend" src={IMG('airend-2-800-800 1.png')}     alt="Безмасляный компрессор с водяной смазкой" />
          <StyledProductImg className="image5" src={IMG('image 5.png')}                alt="Компрессор" />
          <StyledProductImg className="blw"    src={IMG('blw-oil-free-800-800 1.png')} alt="BLW безмасляный" />

          <StyledProductLabel2>BLW-50A</StyledProductLabel2>
          <SpecBlock top={2312} left={323} />

          {/* ── Bolaite Brand Section ── */}
          <StyledBolaiteLabel>Безмаслянный компрессор</StyledBolaiteLabel>
          <StyledBolaiteBrand>Bolaite</StyledBolaiteBrand>
          <StyledBolaiteDesc>
            Подходит для крупных производственных площадок<br />
            Герметичный и высокоэффективный<br />
            Разработан Atlas Copco
          </StyledBolaiteDesc>

          {/* ── Form ── */}
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
                  <StyledFormInput id="name-input" type="text"  name="name"  value={formData.name}  onChange={handleChange} aria-label="Имя" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="name-input">ИМЯ</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-phone">
                  <StyledFormInput id="phone-input" type="tel"  name="phone" value={formData.phone} onChange={handleChange} aria-label="Номер телефона" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="phone-input">НОМЕР ТЕЛЕФОНА</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-email">
                  <StyledFormInput id="email-input" type="email" name="email" value={formData.email} onChange={handleChange} aria-label="Электронная почта" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="email-input">ЭЛЕКТРОННАЯ ПОЧТА</StyledFormLabel>
                </StyledFormFieldWrapper>
              </StyledFormRow>

              <StyledSubmitWrapper>
                <StyledSubmitDot />
                <StyledSubmitButton type="submit" disabled={formStatus === 'sending'} aria-label="Отправить заявку">
                  <span>
                    {formStatus === 'sending' ? 'ОТПРАВКА...' : formStatus === 'success' ? 'ОТПРАВЛЕНО' : 'ОТПРАВИТЬ'}
                  </span>
                </StyledSubmitButton>
              </StyledSubmitWrapper>

              {formStatus === 'error' && (
                <StyledFormStatus $error>Ошибка. Попробуйте позже.</StyledFormStatus>
              )}
            </form>
          </StyledFormSection>

          {/* ── Footer ── */}
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

export { OilFreePage as default }