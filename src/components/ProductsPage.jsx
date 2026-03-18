import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 5388

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
  height: 5112px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1.5px;
  height: 4826px;
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
  height: 4505px;
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
  top: 1690px;
  left: 1748px;
  width: 1.5px;
  height: 1910px;
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

  &.section-1 { top: 1064px; left: 0;   width: 1920px; }
  &.section-2 { top: 2145px; left: 0;   width: 1920px; }
  &.section-3 { top: 3220px; left: 1px; width: 1920px; }
  &.section-4 { top: 4307px; left: 1px; width: 1920px; }
  &.section-5 { top: 5269px; left: 0;   width: 1920px; }

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
  width: 6px;
  height: 6px;
  background: #6f6f6f;
  border-radius: 3px;
  z-index: 150;
`

// ─── Hero Section ─────────────────────────────────────────────────────────────

const StyledHeroTitle = styled(motion.div)`
  position: absolute;
  top: 302px;
  left: 589px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #03043c;
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
  transition: color 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover { color: #03043c; }
  &.active {
    color: #03043c;
    border-bottom: 1.5px solid #03043c;
    padding-bottom: 2px;
  }
`

// ─── СВЯЗАТЬСЯ box ────────────────────────────────────────────────────────────

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

// ─── Section labels ───────────────────────────────────────────────────────────

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  color: #bcbcbc;
  text-align: right;

  &.main { top: 1060px; left: 928px; font-size: 110px; }
  &.sub  { top: 975px;  left: 927px; font-size: 70px;  }
`

// ─── VSD Section (Привод с регулируемой скоростью) ────────────────────────────

const StyledSectionTitle = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  color: #0f152d;
  text-align: right;

  &.vsd-title   { top: 1220px; left: 936px;  font-size: 37px; }
  &.fixed-title { top: 2220px; left: 588px;  font-size: 39px; }
  &.laser-title { top: 3303px; left: 588px;  font-size: 39px; }
  &.low-title   { top: 3909px; left: 1030px; font-size: 35px; white-space: nowrap; }
`

const StyledSectionDesc = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;

  &.vsd-desc   { top: 1280px; left: 936px; }
  &.fixed-desc { top: 2287px; left: 590px; }
  &.laser-desc { top: 3387px; left: 588px; }
  &.low-desc   { top: 3970px; left: 1030px; }
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledProductImg = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: 100;

  &.th-pm      { top: 1340px; left: 130px;  width: 580px; height: 580px; }
  &.blt-s-pm   { top: 1280px; left: 1120px; width: 700px; height: 700px; }
  &.blt-opm    { top: 1330px; left: 600px;  width: 570px; height: 570px; }
  &.th11       { top: 2420px; left: 1280px; width: 520px; height: 520px; }
  &.lbt        { top: 2260px; left: 550px;  width: 840px; height: 840px; }
  &.blt-s      { top: 2330px; left: 0;      width: 660px; height: 660px; }
  &.laser      { top: 3450px; left: 136px;  width: 800px; height: 800px; }
  &.blt-vfc    { top: 3260px; left: 925px;  width: 930px; height: 930px; }
`

// ─── Product Labels ───────────────────────────────────────────────────────────

const StyledProductLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;

  &.label-1 { top: 2440px; left: 348px;  }
  &.label-2 { top: 2440px; left: 908px;  }
  &.label-3 { top: 2440px; left: 1482px; }
`

// ─── Spec Block ───────────────────────────────────────────────────────────────

const StyledSpecBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0;
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

const StyledSpecGap = styled.div`
  height: 16px;
`

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

// ─── Form Section ─────────────────────────────────────────────────────────────

const StyledFormSection = styled.section`
  position: absolute;
  top: 4307px;
  left: 0;
  width: 1920px;
`

const StyledFormTitle = styled(motion.div)`
  position: absolute;
  top: 203px;
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
  top: 296px;
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
  top: 586px;
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
  top: 766px;
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
  top: 846px;
  left: 807px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: ${({ $error }) => ($error ? '#f44336' : '#4caf50')};
`

// ─── Footer ──────────────────────────────────────────────────────────────────

const StyledFooter = styled.footer`
  position: absolute;
  top: 5293px;
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

// ─── Dot positions ────────────────────────────────────────────────────────────

const DOT_POSITIONS = [
  { top: 12,   left: 29   },
  { top: 87,   left: 29   },
  { top: 12,   left: 546  },
  { top: 87,   left: 546  },
  { top: 13,   left: 841  },
  { top: 87,   left: 841  },
  { top: 13,   left: 1116 },
  { top: 86,   left: 1116 },
  { top: 13,   left: 1316 },
  { top: 87,   left: 1316 },
  { top: 13,   left: 1886 },
  { top: 87,   left: 1886 },
  { top: 563,  left: 546  },
  { top: 628,  left: 841  },
  { top: 698,  left: 1088 },
  { top: 768,  left: 1256 },
  { top: 992,  left: 546  },
  { top: 1061, left: 546  },
  { top: 992,  left: 842  },
  { top: 1061, left: 842  },
]

// ─── Image base path ──────────────────────────────────────────────────────────

const IMG = (name) => `/src/frontend/images/frame8/${name}`

// ─── Component ───────────────────────────────────────────────────────────────

const ProductsPage = () => {
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
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="section-4" />
          <StyledHLine className="section-5" />
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
            <StyledCategoryItem to="/products" className={pathname === '/products' ? 'active' : ''}>
              ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem to="/products/oil-free" className={pathname === '/products/oil-free' ? 'active' : ''}>
              БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem to="/products/portable" className={pathname === '/products/portable' ? 'active' : ''}>
              ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem to="/products/air-treatment" className={pathname === '/products/air-treatment' ? 'active' : ''}>
              ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА
            </StyledCategoryItem>
          </StyledCategoryList>

          <StyledEquipmentLabel className="sub">ВИНТОВЫЕ ВОЗДУШНЫЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="main">КОМПРЕССОРЫ</StyledEquipmentLabel>

          <StyledContactBox>СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── VSD Section ── */}
          <StyledSectionTitle className="vsd-title">Привод с регулируемой скоростью</StyledSectionTitle>
          <StyledSectionDesc className="vsd-desc">
            Отрегулируйте скорость двигателя<br />
            в соответствии с вашими потребностями в воздухе
          </StyledSectionDesc>

          <StyledProductImg className="th-pm"    src={IMG('TH-PM-800-800-2.jpg 1.png')}                   alt="TH PM" />
          <StyledProductImg className="blt-s-pm" src={IMG('Bolaite_BLT-150A_S 1.png')}                    alt="Bolaite BLT S PM" />
          <StyledProductImg className="blt-opm"  src={IMG('Bolaite_BLT-150A_-OPM_改-800.jpg (1) 1.png')}  alt="Bolaite BLT OPM" />

          <SpecBlock top={1880} left={340} />
          <SpecBlock top={1880} left={900} />
          <SpecBlock top={1880} left={1199} />

          {/* ── Fixed Speed Section ── */}
          <StyledSectionTitle className="fixed-title">Привод с фиксированной скоростью</StyledSectionTitle>
          <StyledSectionDesc className="fixed-desc">
            Простая и прочная конструкция,<br />
            подходящая для ваших рабочих процессов<br />
            с постоянным потреблением воздуха
          </StyledSectionDesc>

          <StyledProductImg className="th11"   src={IMG('th11-800-800.png 1.png')}       alt="TH11" />
          <StyledProductImg className="lbt"    src={IMG('lbt-350a-800-800.png 1.png')}   alt="LBT 350a" />
          <StyledProductImg className="blt-s"  src={IMG('blt-150a-s-800-800.png 1.png')} alt="BLT 150a S" />

          <StyledProductLabel className="label-1">BLT S 40-475 л.с.</StyledProductLabel>
          <StyledProductLabel className="label-2">BLT S 40-750 л.с.</StyledProductLabel>
          <StyledProductLabel className="label-3">TH S-100 л.с.</StyledProductLabel>

          <SpecBlock top={2930} left={340} />
          <SpecBlock top={2930} left={681} />
          <SpecBlock top={2930} left={1390} />

          {/* ── Laser Section ── */}
          <StyledSectionTitle className="laser-title">Компрессоры для лазерной резки</StyledSectionTitle>
          <StyledSectionDesc className="laser-desc">
            Textxtxttx txtxttx txtxxttx<br />
            textxet txtxet txettx<br />
            txtxt txtxt txttx
          </StyledSectionDesc>

          <StyledProductImg className="laser"   src={IMG('laser-cutting-1-800-800.jpg 1.png')} alt="Laser cutting" />
          <StyledProductImg className="blt-vfc" src={IMG('BLT-250A-L-VFC-800-800 1.png')}     alt="BLT VFC" />

          <SpecBlock top={3310} left={330} />

          {/* ── Low Pressure Section ── */}
          <StyledSectionTitle className="low-title">Компрессоры низкого давления</StyledSectionTitle>
          <StyledSectionDesc className="low-desc">
            Textxtxttx txtxttx txtxxttx<br />
            textxet txtxet txettx<br />
            txtxt txtxt txttx
          </StyledSectionDesc>

          <SpecBlock top={4050} left={1031} />

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

export { ProductsPage as default }